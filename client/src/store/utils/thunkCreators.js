import axios from "axios";
import socket from "../../socket";
import moment from "moment";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  addDataToCache,
} from "../conversations";
import { gotUser, setFetchingStatus } from "../user";

// Needed to edit in order to send request to cloudinary api.
axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("messenger-token");
  if (config.url.startsWith("/api") || config.url.startsWith("/auth")) {
    config.headers["x-access-token"] = token;
  }

  return config;
});

// CONSTANTS
const cloudinaryApiKey = process.env.REACT_APP_CLOUDINARY_API_KEY || "";
const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL || "";
const cloudinaryPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "";

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(gotUser(data));
    if (data.id) {
      socket.emit("go-online", data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    await localStorage.removeItem("messenger-token");
    dispatch(gotUser({}));
    socket.emit("logout", id);
  } catch (error) {
    console.error(error);
  }
};

// Helper functions for sorting all conversations
const createdAt = (a, b) =>
  moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf();

const sortConversation = (conversation) => {
  conversation.messages = conversation.messages.sort(createdAt);

  // Used for caching images to a specific conversation
  conversation.cache = { images: [], typing: false };
  return conversation;
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    data.forEach(sortConversation);
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post("/api/messages", body);
  return data;
};

const sendMessage = (data, body) => {
  socket.emit("new-message", {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
  });
};

export const alertTyping = (id, typing = false) => {
  socket.emit("alert-typing", {
    convoId: id,
    cache: { typing },
  });
};

// helpers for transforming images
const transformImage = async (image) => {
  const res = await axios.post(cloudinaryUrl, {
    file: image,
    api_key: cloudinaryApiKey,
    upload_preset: cloudinaryPreset,
  });
  return res.data.url;
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    if (body.attachments.length) {
      body.attachments = await Promise.all(
        body.attachments.map(transformImage)
      );
    }
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }

    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

export const addToCache = (id, data) => (dispatch) => {
  if (id) {
    dispatch(addDataToCache(id, data));
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};
