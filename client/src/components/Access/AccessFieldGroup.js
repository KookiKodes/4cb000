import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

const AccessFieldGroup = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} {...props}>
      {children}
    </Box>
  );
};

export default AccessFieldGroup;
