import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import TodosTable from "@/components/todosTable"

async function fetchTodosApiCall() {
	console.log("fetchTodosApiCall called");
	const response = await fetch(`${process.env.BASE_URL}/api/todos/`, {cache : 'no-store'})

	return response.json();
}

export default async function Home() {

	const response = await fetchTodosApiCall();

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
			<div className="flex flex-col space-y-8">
			<h1 className={title()}>Todos</h1>
			<TodosTable todos={response.data ?? []}></TodosTable>
			{/* <TodosTable todos={[]}></TodosTable> */}
		</div>
			</div>
			<div className="flex gap-3">
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>
		</section>
	);
}
