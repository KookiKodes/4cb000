import React, { useState } from "react";
import { FormControl, FilledInput, IconButton } from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, addToCache } from "../../store/utils/thunkCreators";

// components
import { ActionGroup, AttachImageAction } from "../Actions/index";
import { ImagePreview } from "./index";

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
    background: theme.palette.background.secondary,
    "&:hover": {
      background: theme.palette.background.secondary,
    },
    "& .MuiFilledInput-input::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
    padding: 0,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, addToCache, otherUser, conversationId, user, cache } =
    props;

  const handleChange = ({ target }) => setText(target.value);

  const addImage = (id, currentUrls) => (urls) =>
    addToCache(id, { images: [...currentUrls, ...urls] });

  const removeImage = (id, currentUrls) => (index) =>
    addToCache(id, {
      images: currentUrls.slice(0, index).concat(currentUrls.slice(index + 1)),
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
    };
    await postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <ImagePreview
        images={cache?.images || []}
        removeImage={removeImage(conversationId, cache.images)}
      />
      <FormControl fullWidth hiddenLabel>
        <FilledInput
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
                onChange={addImage(conversationId, cache.images)}
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
