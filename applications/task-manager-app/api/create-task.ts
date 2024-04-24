import { CreateTask } from '../types/task';

export async function createTask(data: { userId: number; task: CreateTask }): Promise<void> {
  const res = await fetch(`http://localhost:4000/user/${data.userId}/task`, {
    body: JSON.stringify({ tasks: [data.task] }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to create task');
  }
  return;
}
