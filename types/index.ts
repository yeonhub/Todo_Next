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