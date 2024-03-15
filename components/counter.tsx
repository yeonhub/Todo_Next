"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";

export const Counter = ({initCount, children} : {initCount : number, children : React.ReactNode}) => {
	const [count, setCount] = useState(initCount);

	return (
		<>
		<Button radius="full" onPress={() => setCount(count + 1)}>
			Count is {count}
		</Button>
		{children}
		</>
	);
};
