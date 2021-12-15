import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

// helpers
import getDataUrl from "./utils/getDataUrl";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const AttachAction = ({ onChange }) => {
  const classes = useStyles();

  const handleChange = async ({ target }) => {
    for (const file of target.files) {
      const data = await getDataUrl(file);
    }
    // if (onChange) {

    // }
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
        name="images"
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
