'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/table';

const USER_ID = 51253;

interface Task {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  description: string;
  dueAt: Date;
  completed: boolean;
}

interface TaskTableColumn {
  key: keyof Task | 'status';
  label: string;
}

// async function getTasks(userId: number): Promise<Task[]> {
//   const res = await fetch(`http://localhost:4000/user/${userId}/task`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch tasks');
//   }
//   return (await res.json()).data || [];
// }

export default function Home() {
  const columns: TaskTableColumn [] = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'dueAt', label: 'Due date' },
    { key: 'createdAt', label: 'Creation date' },
    { key: 'status', label: 'Status' },
  ];
  const tasks: Task[] = [] // await getTasks(USER_ID);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table aria-label="task-table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              {(columnKey) => <TableCell>{getKeyValue(task, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
