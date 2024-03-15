import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo = {
  id : string,
  title : string,
  isDone : boolean,
  createdAt : Date
}

export type CustomModalType = "detail" | "edit" | "delete"

export type FocusedTodoType={
  focusedTodo : Todo | null,
  modalType : CustomModalType
}