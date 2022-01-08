import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "./index";
import MoreHorizTwoToneIcon from "@material-ui/icons/MoreHorizTwoTone";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  text: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.contrast,
    opacity: 0.4,
    padding: theme.spacing(0, 1),
  },
}));

const Messages = (props) => {
  const { messages, otherUser, userId, cache } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            attachments={message.attachments}
            time={time}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            attachments={message.attachments}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
      {cache?.typing && (
        <OtherUserBubble time="" otherUser={otherUser}>
          <Box className={classes.text}>
            <MoreHorizTwoToneIcon style={{ fontSize: 32 }} />
          </Box>
        </OtherUserBubble>
      )}
    </Box>
  );
};

export default Messages;
