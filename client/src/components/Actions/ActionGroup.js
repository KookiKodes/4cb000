import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    opacity: 0.5,
    height: "min-content",
    color: theme.palette.text.secondary,
  },
}));

const ActionGroup = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...props}>
      {children}
    </Box>
  );
};

export default ActionGroup;
