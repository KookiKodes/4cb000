import React, { useCallback, useState } from "react";
import { FormControl, FilledInput, IconButton } from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

// components
import { ActionGroup, AttachImageAction } from "../Actions/index";
import { ImagePreview } from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    "& .Mui-focused": {
      background: theme.palette.background.secondary,
    },
  },
  input: {
    height: 70,
    borderRadius: theme.spacing(1),
    marginBottom: 20,
    fontWeight: "600",
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
  const [data, setData] = useState({ text: "", images: [] });
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (name, value) =>
    setData((data) => ({ ...data, [name]: value }));

  const addImage = useCallback(
    (newImages) => handleChange("images", [...data.images, ...newImages]),
    [data]
  );

  const removeImage = useCallback(
    (index) =>
      handleChange("images", [
        ...data.images.slice(0, index),
        ...data.images.slice(index + 1),
      ]),
    [data]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: data.text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
    };
    await postMessage(reqBody);
    setData({ text: "", images: [] });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <ImagePreview images={data.images} removeImage={removeImage} />
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={data.text}
          name="text"
          onChange={({ target }) => handleChange(target.name, target.value)}
          endAdornment={
            <ActionGroup>
              <IconButton color="inherit">
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
              <AttachImageAction onChange={addImage}>
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
  };
};

export default connect(null, mapDispatchToProps)(Input);
