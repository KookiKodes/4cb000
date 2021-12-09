import React from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    minHeight: "100vh",
    minWidth: "100vw",
    height: "min-content",
    fontSize: ".875rem",
    position: "relative",
    padding: 0,
  },
});

const PageContainer = ({ children, ...props }) => {
  const { root } = useStyle();
  return (
    <Container classes={{ root }} spacing={0} {...props}>
      {children}
    </Container>
  );
};

export default PageContainer;
