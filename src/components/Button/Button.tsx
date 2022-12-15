import React, { FC, ReactNode } from "react";
import "./Button.scss";
import { Button } from "reactstrap";
export interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: any;
}

const ButtonComp: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  );
};

export default ButtonComp;
