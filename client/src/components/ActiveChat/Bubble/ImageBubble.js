import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Attachments } from "./index";

const useStyles = makeStyles((theme) => ({
  date: {
    fontSize: 11,
    color: theme.palette.text.other,
    fontWeight: "bold",
    marginBottom: 5,
  },
}));

const ImageBubble = ({ attachments, time, inverse }) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.date}>{time}</Typography>
      <Attachments attachments={attachments} inverse={inverse} />
    </>
  );
};

export default ImageBubble;
