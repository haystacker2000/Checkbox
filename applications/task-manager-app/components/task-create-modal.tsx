'use client';
import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  DateInput,
  Chip,
} from '@nextui-org/react';
import { createTask } from '../api/create-task';
import { CalendarDateTime } from '@internationalized/date';
import { useRouter } from 'next/navigation';

export default function TaskCreateModal(props: { userId: number }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [error, setError] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [dueAt, setDueAt] = useState(new CalendarDateTime(2025, 1, 1));

  const onSubmit = async () => {
    try {
      await createTask({
        userId: props.userId,
        task: {
          name: name!,
          description: description!,
          dueAt: dueAt.toDate('Australia/Sydney'),
        },
      });
      router.refresh();
      onClose();
    } catch (e) {
      console.error(e);
      setError('Failed to create task');
    }
  };

  const customClose = () => {
    setError(undefined);
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        + New task
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form action={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">Create task</ModalHeader>
                <ModalBody>
                  <div>{error && <Chip color="danger">{error}</Chip>}</div>
                  <Input
                    isRequired
                    autoFocus
                    label="Name"
                    placeholder="Task name"
                    variant="bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <DateInput isRequired label="Due date" className="max-w-sm" value={dueAt} onChange={setDueAt} />
                  <Textarea
                    isRequired
                    label="Description"
                    placeholder="Describe your task"
                    variant="bordered"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={customClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
