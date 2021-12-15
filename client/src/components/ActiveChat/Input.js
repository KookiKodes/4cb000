import React, { useState } from "react";
import {
  FormControl,
  FilledInput,
  IconButton,
  Divider,
  Avatar,
} from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

// components
import { ActionGroup, AttachAction } from "../Actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    "& .Mui-focused": {
      background: theme.palette.background.input,
    },
  },
  image: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  input: {
    height: 70,
    borderRadius: 8,
    marginBottom: 20,
    fontWeight: "600",
    background: theme.palette.background.input,
    "&:hover": {
      background: theme.palette.background.input,
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

  const handleChange = (name, value) => {
    console.log(value);
    setData((data) => ({ ...data, [name]: value }));
  };

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
    setData({ text: "" });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        {data.images.length > 0 &&
          data.images.map((url, index) => {
            return (
              <Avatar
                key={index}
                src={url}
                alt="selected from input"
                className={classes.image}
                variant="rounded"
              />
            );
          })}
        <Divider />
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
              <AttachAction onChange={handleChange}>
                <FileCopyOutlinedIcon />
              </AttachAction>
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
