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

const DefaultBubble = ({
  time,
  attachments,
  BubbleContent,
  inverse,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.date}>{time}</Typography>
      <Attachments attachments={attachments} />
      <Box {...props}>{BubbleContent}</Box>
    </>
  );
};

export default DefaultBubble;
