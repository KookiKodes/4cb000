import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

const AccessForm = ({ children, header, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <Box justifyContent="center">
        <Typography variant="h5" className={classes.header}>
          {header}
        </Typography>
      </Box>
      <Box>
        <form {...props}>{children}</form>
      </Box>
    </>
  );
};

export default AccessForm;
