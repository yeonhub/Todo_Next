"use client"

import React, { Suspense, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Input,Button,Popover, PopoverTrigger, PopoverContent, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { CustomModalType, FocusedTodoType, Todo } from "@/types";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VerticalDotsIcon } from "./icons";
import CustomModal from "./customModal";
// import todosLoading from "@/components/todosLoading"

export default function TodosTable({todos} : {todos : Todo[]}) {  

  const [todoAddEnable, setTodoAddEnable] = useState(false)
  const [newTodoInput, setNewTodoInput] = useState("")
  const [isLoading, setIsloading]=useState<boolean>(false)
  const [currentModalType, setCurrentModalType]=useState<FocusedTodoType>({
    focusedTodo : null,
    modalType : 'detail' as CustomModalType
  })
  const formattedDate = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    };
    const formatted = date.toLocaleString('ko-KR', options);
    return formatted.replace(/\./g, '. ').replace(',', ' ');
  };

  const isDoneUI = (isDone: boolean): string => {
    return isDone ? "line-through text-white/50" : "";
  };

  const router = useRouter()

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const notifySuccessEvent = (msg : string) => toast.success(msg);

  const addATodoHandler= async(title : string)=>{
    setIsloading(true)
    setTodoAddEnable(false)
    await new Promise(resolve => setTimeout(resolve, 500));
    if(newTodoInput.length>0){
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
        method : 'post',
        body : JSON.stringify({
          title : title
        }),
        cache : 'no-store'
      });
      router.refresh();
      setIsloading(false)
      setNewTodoInput('')
      notifySuccessEvent(`${title} 추가 완료`)
      console.log(`add todo 성공 : ${newTodoInput}`);
    } else {
      console.log('none input');
      return
    }
  }

  const editATodoHandler= async(id : string, editedTitle : string,  editedIsDone : boolean)=>{

    setIsloading(true)

    await new Promise(resolve => setTimeout(resolve, 500));

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
        method : 'post',
        body : JSON.stringify({
          title : editedTitle,
          isDone : editedIsDone
        }),
        cache : 'no-store'
      });

      router.refresh();
      setIsloading(false)
      notifySuccessEvent(`${editedTitle} 수정 완료`)
      console.log(`edit todo 성공 : ${newTodoInput}`);
  }
  const deleteATodoHandler= async(id : string)=>{

    setIsloading(true)

    await new Promise(resolve => setTimeout(resolve, 500));

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
        method : 'delete',
        cache : 'no-store'
      });

      router.refresh();
      setIsloading(false)
      notifySuccessEvent(`삭제 완료`)
      console.log(`delete todo 성공 : ${newTodoInput}`);
  }

  const modalComponent=()=>{
    return <Modal 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      >
      <ModalContent>
        {(onClose) => (
          (currentModalType.focusedTodo && <CustomModal 
            focusedTodo={currentModalType.focusedTodo}
            modalType={currentModalType.modalType}
            onClose={onClose}
            onEdit={async (id, title, isDone)=>{
              console.log(id, title, isDone);
              await editATodoHandler(id, title, isDone)
              onClose()
            }}
            onDelete={async (id)=>{
              console.log(id);
              await deleteATodoHandler(id)
              onClose()
            }}
          />)

        )}
      </ModalContent>
    </Modal>
  }

  return (
    <div className="flex flex-col space-y-2">
      {modalComponent()}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="text" label="New Todo" value={newTodoInput} onValueChange={(changedInput)=>{setNewTodoInput(changedInput), setTodoAddEnable(changedInput.length>0)}}/>
    {
      todoAddEnable ?
    <Button color="secondary" className="h-14 " onPress={async()=>{await addATodoHandler(newTodoInput)}}>
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
    <div className="h-8">
    {
      isLoading && <Spinner size="md" color="secondary" labelColor="secondary" />
    }
    </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>TODO</TableColumn>
          <TableColumn>DONE</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"할일 목록이 없습니다."}>
          {
            todos && todos.map((aTodo : Todo)=>(
              <TableRow key={aTodo.id}>
            <TableCell className={isDoneUI(aTodo.isDone)}>{aTodo.id.slice(0,4)}</TableCell>
            <TableCell className={isDoneUI(aTodo.isDone)}>{aTodo.title}</TableCell>
            <TableCell>{aTodo.isDone ? "✔️" : "❌"}</TableCell>
            <TableCell className={isDoneUI(aTodo.isDone)}>{formattedDate(new Date(aTodo.createdAt))}</TableCell>

            <TableCell>
            <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(key)=>{
                console.log(`aTodo.id : ${aTodo.id} / key : ${key}`);
                setCurrentModalType({focusedTodo : aTodo, modalType : key as CustomModalType})
                  onOpen()
                }}>
                <DropdownItem key="detail" >Detail</DropdownItem>
                <DropdownItem key="edit" >Edit</DropdownItem>
                <DropdownItem key="delete" >Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
            </TableCell>
          </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}