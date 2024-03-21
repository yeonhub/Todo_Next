"use client"

import React, { useState } from "react";
import {Button,ModalHeader, ModalBody, ModalFooter, Input, Switch, CircularProgress} from "@nextui-org/react";
import 'react-toastify/dist/ReactToastify.css';
import { CustomModalType, Todo } from "@/types";

const CustomModal = ({focusedTodo, modalType, onClose,onEdit,onDelete}: {
    focusedTodo : Todo,
    modalType : CustomModalType,
    onClose: () => void,
    onEdit : (id : string, title : string , isDone : boolean)=>void
    onDelete : (id : string)=>void
    })=>{

        const [isDone, setIsDone] = useState(focusedTodo.isDone)
        const [isLoading, setIsLoading] = useState(false)
        const [editedTotoInput, setEditedTotoInput] = useState<string>(focusedTodo.title)
        const formattedDate = new Date(focusedTodo.createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false 
          });

        const detailModal = ()=>{
            return <>
            <ModalHeader className="flex flex-col gap-1">Detail</ModalHeader>
            <ModalBody>
            <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
            <p><span className="font-bold">Title : </span>{focusedTodo.title}</p>
            <p><span className="font-bold">Done : </span>
            {focusedTodo.isDone ? "✔️" : "❌"}</p>
            <p><span className="font-bold">Date : </span>{formattedDate}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
            </>
        }
        const editModal = ()=>{
          return (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
              <ModalBody>
                <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
                <Input
                  autoFocus
                  label="Title"
                  // defaultValue={focusedTodo.title}
                  placeholder={focusedTodo.title}
                  variant="bordered"
                  value={editedTotoInput}
                  onValueChange={setEditedTotoInput}
                />
                <div className="flex px-1 py-1 space-x-4">
                  <span>Done</span>
                  <Switch
                    color="secondary"
                    defaultSelected={focusedTodo.isDone}
                    aria-label="Automatic updates"
                    onValueChange={setIsDone}
                  />
                </div>
                <div className="flex px-1 py-1 space-x-4">
                  <span>Date</span>
                  <p>
                    {`${formattedDate}`}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  isDisabled={!editedTotoInput.trim()}
                  onPress={() => {
                    setIsLoading(true);
                    onEdit(focusedTodo.id, editedTotoInput, isDone);
                  }}
                >
                  {(isLoading) ? <CircularProgress color="secondary" size="sm" aria-label="Loading..." /> : 'Edit'}
                </Button>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          );
        };
        const deleteModal = ()=>{
            return <>
            <ModalHeader className="flex flex-col gap-1">Detail</ModalHeader>
            <ModalBody>
            <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
            <p><span className="font-bold">Title : </span>{focusedTodo.title}</p>
            <p><span className="font-bold">Done : </span>
            {focusedTodo.isDone ? "✔️" : "❌"}</p>
            <p><span className="font-bold">Date : </span>{formattedDate}</p>
            </ModalBody>
            <ModalFooter>
                      <Button color="danger" variant="flat" onPress={()=>{
                        setIsLoading(true)
                        onDelete(focusedTodo.id)
                      }}>
                        {(isLoading) ? <CircularProgress color="secondary" size="sm" aria-label="Loading..." /> : 'Delete'}
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
            </>
        }
    
        const getModal = (type : CustomModalType)=>{
            switch (type){
                case 'detail' : 
                    return detailModal()
                case 'edit' : 
                    return editModal()
                case 'delete' :
                    return deleteModal()
            }
        }

    return <>
    {getModal(modalType)}
    </>
}

export default CustomModal;