import React, { useMemo } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";

// components
import { Bubble } from "./Bubble/index";
import useBubbleVariant from "./utils/useBubbleVariant";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  text: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: theme.palette.background.secondary,
    borderRadius: theme.spacing(1.5, 1.5, 0, 1.5),
    margin: theme.spacing(1.5, 0),
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;
  const variant = useBubbleVariant(text, attachments);

  return (
    <Box className={classes.root}>
      <Bubble
        attachments={attachments}
        time={time}
        BubbleContent={<Typography className={classes.text}>{text}</Typography>}
        variant={variant}
        className={classes.bubble}
      />
    </Box>
  );
};

export default SenderBubble;
