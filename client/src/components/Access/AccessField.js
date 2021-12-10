import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "& .MuiInput-underline:before": {
      borderBottomColor: "#D5DFEE",
    },
  },
});

const AccessField = (props) => {
  const { root } = useStyles();
  return (
    <TextField
      classes={{ root }}
      autoComplete="off"
      autofill="off"
      fullWidth
      {...props}
    />
  );
};

export default AccessField;
