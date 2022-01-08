import { Typography, Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  date: {
    fontSize: 11,
    color: theme.palette.text.other,
    fontWeight: "bold",
    marginBottom: 5,
  },
}));

const TypingBubble = ({ time, BubbleContent, text, attachments, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.date}>{time}</Typography>
      <Box {...props}>{BubbleContent}</Box>
    </>
  );
};

export default TypingBubble;
