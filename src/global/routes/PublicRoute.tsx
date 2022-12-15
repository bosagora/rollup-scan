import * as React from "react";
import { Route } from "react-router-dom";
import ScrollToTopOnMount from "../../components/ScrollToTop/ScrollToTop";
import FadeIn from "../../components/Animation/FadeIn/FadeIn";

const PublicRoute: React.FC<any> = ({
  component: Component,
  title,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: any) => (
      <FadeIn>
        <ScrollToTopOnMount />
        <Component {...props} title={title} />
      </FadeIn>
    )}
  />
);

export default PublicRoute;
