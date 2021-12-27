import React, { useMemo, useRef } from "react";
import { FormControl, FilledInput, IconButton } from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, addToCache } from "../../store/utils/thunkCreators";

// components
import { ActionGroup, AttachImageAction } from "../Actions/index";
import { ImagePreview } from "./index";

// hooks
import useTyping from "./utils/useTyping";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    "& .Mui-focused": {
      background: theme.palette.background.secondary,
    },
    overflowX: "hidden",
    background: theme.palette.background.secondary,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(3, 0, 4, 0),
    padding: theme.spacing(1, 0.5),
  },
  input: {
    height: 70,
    borderRadius: theme.spacing(1),
    fontWeight: "600",
    fontSize: 14,
    background: theme.palette.background.secondary,
    "&:hover": {
      background: theme.palette.background.secondary,
    },
    "& .MuiFilledInput-input::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const ref = useRef(null);
  const { postMessage, addToCache, otherUser, conversationId, user } = props;
  const [text, { updateTyping, resetTyping }] = useTyping(
    conversationId,
    otherUser.online
  );
  const cache = useMemo(
    () => props.cache || { images: [], typing: false },
    [props.cache]
  );

  const addImage = (id, currentUrls) => (urls) => {
    addToCache(id, { images: [...currentUrls, ...urls] });
    ref.current.focus();
  };

  const removeImage = (id, currentUrls) => (index) =>
    addToCache(id, {
      images: [...currentUrls.slice(0, index), ...currentUrls.slice(index + 1)],
    });

  const handleChange = (event) => {
    updateTyping(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: cache.images || [],
    };
    if (text || cache.images.length) {
      await postMessage(reqBody);
      addToCache(conversationId || otherUser.id, { images: [] });
      resetTyping(true);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <ImagePreview
        images={cache?.images}
        removeImage={removeImage(conversationId || otherUser.id, cache.images)}
      />
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          inputProps={{ ref }}
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <ActionGroup>
              <IconButton color="inherit">
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
              <AttachImageAction
                onChange={addImage(
                  conversationId || otherUser.id,
                  cache.images
                )}
              >
                <FileCopyOutlinedIcon />
              </AttachImageAction>
            </ActionGroup>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    addToCache: (id, data) => {
      dispatch(addToCache(id, data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
