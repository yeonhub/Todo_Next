"use client"

import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Input,Button,Popover, PopoverTrigger, PopoverContent, } from "@nextui-org/react";
import { Todo } from "@/types";

export default function TodosTable({todos} : {todos : Todo[]}) {  

  const [todoAddEnable, setTodoAddEnable] = useState(false)
  const [newTodoInput, setNewTodoInput] = useState("")

  return (
    <>

    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="text" label="New Todo" value={newTodoInput} onValueChange={(changedInput)=>{setNewTodoInput(changedInput), setTodoAddEnable(changedInput.length>0)}}/>
    {
      todoAddEnable ?
    <Button color="secondary" className="h-14 ">
      ➕
    </Button>
    :
         <Popover placement="top" showArrow={true}>
         <PopoverTrigger>
         <Button color="default" className="h-14 ">
      ✖️
    </Button>
         </PopoverTrigger>
         <PopoverContent >
           <div className="px-1 py-2">
             <div className="text-small font-bold">⚠️ Todo를 입력해 주세요!</div>
           </div>
         </PopoverContent>
       </Popover>
    }


    </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>TODO</TableColumn>
          <TableColumn>DONE</TableColumn>
          <TableColumn>DATE</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"할일 목록이 없습니다."}>
          {
            todos && todos.map((aTodo : Todo)=>(
              <TableRow key={aTodo.id}>
            <TableCell>{aTodo.id.slice(0,4)}</TableCell>
            <TableCell>{aTodo.title}</TableCell>
            <TableCell>{aTodo.isDone ? "✔️" : "❌"}</TableCell>
            <TableCell>{`${aTodo.createdAt}`}</TableCell>
          </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </>
  );
}
