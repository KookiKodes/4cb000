import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { sort, pipeInto } from "../../helpers";

const sortMessagesBy = (sortBy) => {
  switch (sortBy) {
    case "createdAt":
      return sort((a, b) => {
        const x = moment(a.createdAt).valueOf(),
          y = moment(b.createdAt).valueOf();
        return x - y;
      });
    default:
      return (arr) => arr;
  }
};

const Messages = (props) => {
  const { messages, otherUser, userId, sortBy } = props;
  const sortedMessages = React.useMemo(
    () => pipeInto(messages, sortMessagesBy(sortBy)),
    [messages, sortBy]
  );

  return (
    <Box>
      {sortedMessages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
