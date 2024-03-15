import { title } from "@/components/primitives";
import { Counter } from "@/components/counter";

async function getInitCount() {
	console.log("getInitCount called");
	await new Promise(f=>setTimeout(f,1000))
	return 10
}

export default async function CounterPage() {

	const fetchedInitCount =  await getInitCount()

	return (
		<div>
			<h1 className={title()}>Counter</h1>
			<Counter initCount={fetchedInitCount}>
				<h2>server components</h2>
			</Counter>
		</div>
	);
}
