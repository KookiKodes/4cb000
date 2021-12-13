import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      background: theme.palette.sideBanner.image,
    },
  },
  backgroundGradient: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      background: theme.palette.sideBanner.gradient,
      alignItems: "center",
      padding: theme.spacing(2),
    },
  },
}));

const PageContainer = ({ children }) => {
  const { root, backgroundGradient } = useStyle();
  return (
    <Box className={root}>
      <Box className={backgroundGradient}>{children}</Box>
    </Box>
  );
};

export default PageContainer;
