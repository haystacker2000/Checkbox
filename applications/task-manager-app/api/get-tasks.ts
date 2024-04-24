import { Task } from '../types/task';

export async function getTasks(userId: number): Promise<Task[]> {
  const res = await fetch(`http://localhost:4000/user/${userId}/task`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return (await res.json()).data || [];
}
