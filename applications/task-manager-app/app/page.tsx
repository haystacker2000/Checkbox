import { getTasks } from '../api/get-tasks';
import TaskCreateModal from '../components/task-create-modal';
import TaskTable from '../components/task-table';
import { Task } from '../types/task';

const USER_ID = 51253;

export default async function Home() {
  const tasks: Task[] = await getTasks(USER_ID);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Task manager
      </h1>
      <TaskCreateModal userId={USER_ID} />
      <TaskTable tasks={tasks} />
    </section>
  );
}
