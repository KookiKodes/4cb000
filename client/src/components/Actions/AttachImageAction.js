import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";

// helpers
import getDataUrl from "./utils/getDataUrl";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const getDataUrls = (files) => Promise.all(Array.from(files).map(getDataUrl));

const AttachImageAction = ({ onChange, children, ...props }) => {
  const classes = useStyles();

  const handleChange = async ({ target }) => {
    const urls = await getDataUrls(target.files);
    if (onChange) onChange(urls);
  };

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
        name={props.name || "images"}
      />
      <label htmlFor="contained-button-file">
        <IconButton
          variant="contained"
          color="inherit"
          component="span"
          {...props}
        >
          {children}
        </IconButton>
      </label>
    </>
  );
};

export default AttachImageAction;
