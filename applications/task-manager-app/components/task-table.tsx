'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/table';
import { Task } from '../types/task';
import { DateTime } from 'luxon';

enum TaskStatus {
  NOT_URGENT = 'Not urgent',
  DUE_SOON = 'Due soon',
  OVERDUE = 'Overdue',
}

interface TaskTableRow extends Task {
  status: TaskStatus;
}

export interface TaskTableColumn {
  key: keyof TaskTableRow;
  label: string;
}

function mapTaskToRow(task: Task): TaskTableRow {
  const createdAt = DateTime.fromISO(task.dueAt);
  const dueAt = DateTime.fromISO(task.dueAt);
  let status = TaskStatus.NOT_URGENT;
  if (dueAt.startOf('day') > DateTime.now().startOf('day')) status = TaskStatus.OVERDUE;
  else if (dueAt.diffNow('day').days <= 7) status = TaskStatus.DUE_SOON;

  return {
    ...task,
    createdAt: createdAt.toLocaleString(DateTime.DATE_MED),
    dueAt: dueAt.toLocaleString(DateTime.DATE_MED),
    status,
  };
}

export default function TaskTable(props: { tasks: Task[] }) {
  const columns: TaskTableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'dueAt', label: 'Due date' },
    { key: 'createdAt', label: 'Creation date' },
    { key: 'status', label: 'Status' },
  ];
  const rows = props.tasks.map(mapTaskToRow);

  return (
    <Table aria-label="task-table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent="No tasks found">
        {rows.map((task) => (
          <TableRow key={task.id}>{(columnKey) => <TableCell>{getKeyValue(task, columnKey)}</TableCell>}</TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
