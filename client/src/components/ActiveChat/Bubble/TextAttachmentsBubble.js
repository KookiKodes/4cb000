import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { Attachments } from "./index";

const useStyles = makeStyles((theme) => ({
  date: {
    fontSize: 11,
    color: theme.palette.text.other,
    fontWeight: "bold",
    marginBottom: 5,
  },
}));

const TextAttachmentsBubble = ({
  time,
  attachments,
  BubbleContent,
  inverse,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <Box {...props}>{BubbleContent}</Box>
      <Attachments attachments={attachments} inverse={inverse} />
      <Typography className={classes.date}>{time}</Typography>
    </>
  );
};

export default TextAttachmentsBubble;
