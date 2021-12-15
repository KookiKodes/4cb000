import React, { useState } from "react";
import { FormControl, FilledInput, IconButton } from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
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
              <AttachAction onChange={handleChange} />
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
