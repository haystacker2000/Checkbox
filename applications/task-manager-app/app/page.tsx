// import { Link } from "@nextui-org/link";
// import { Snippet } from "@nextui-org/snippet";
// import { Code } from "@nextui-org/code"
// import { button as buttonStyles } from "@nextui-org/theme";
// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
import TaskTable from '../components/task-table';
import { Task } from '../types/task';

const USER_ID = 51253;

async function getTasks(userId: number): Promise<Task[]> {
  const res = await fetch(`http://localhost:4000/user/${userId}/task`);
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return (await res.json()).data || [];
}

export default async function Home() {
	const tasks: Task[] = await getTasks(USER_ID);
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Task manager</h1>
			<TaskTable tasks={tasks}></TaskTable>
		</section>
	);
}
