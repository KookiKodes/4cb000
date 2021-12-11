import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const AttachAction = () => {
  const classes = useStyles();
  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <IconButton variant="contained" color="inherit" component="span">
          <FileCopyOutlinedIcon />
        </IconButton>
      </label>
    </>
  );
};

export default AttachAction;
