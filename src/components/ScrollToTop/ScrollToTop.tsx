import * as React from "react";
import { useDispatch } from "react-redux";
import { pageChange } from "store/pagination/thunks";
import { FC } from "react";

const ScrollToTopOnMount: FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(pageChange(1));
    window.scrollTo(0, 0);
  }, [dispatch]);

  return null;
};

export default ScrollToTopOnMount;
