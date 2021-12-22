import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

// components
import { Bubble } from "./Bubble/index";
import useBubbleVariant from "./utils/useBubbleVariant";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
  },
  bubble: {
    backgroundImage: theme.palette.background.chatBubble,
    borderRadius: theme.spacing(0, 1.5, 1.5, 1.5),
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.palette.text.contrast,
    letterSpacing: -0.2,
    padding: 8,
  },
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, attachments, otherUser, children } = props;
  const variant = useBubbleVariant(text, attachments);

  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      ></Avatar>
      <Box className={classes.container}>
        <Bubble
          attachments={attachments}
          time={`${otherUser.username} ${time}`}
          BubbleContent={
            children || <Typography className={classes.text}>{text}</Typography>
          }
          variant={variant}
          className={classes.bubble}
          inverse
        />
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
