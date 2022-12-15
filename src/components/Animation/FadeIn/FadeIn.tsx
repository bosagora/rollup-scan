import React, { ReactNode } from "react";
import { Fade } from "reactstrap";
// import "./FadeIn.scss";

export interface AnimationProps {
  children?: ReactNode;
}

const FadeIn: React.FC<AnimationProps> = ({ children }) => {
  // return <div className="fadeIn">{children}</div>;
  return <Fade in={true}>{children}</Fade>;
};

export default FadeIn;
