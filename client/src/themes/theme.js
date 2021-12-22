import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: 4,
          height: 4,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(156, 173, 200, .5)",
          borderRadius: 20,
          border: "6px solid transparent",
          backgroundClick: "content-box",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#3A8DFF",
        },
      },
    },
    MuiInput: {
      input: {
        fontWeight: "bold",
      },
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
    text: {
      secondary: "#9CADC8",
      contrast: "#FFF",
      other: "#BECCE2",
    },
    background: {
      chatBubble: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
      secondary: "#F4F6FA",
    },
  },
});
