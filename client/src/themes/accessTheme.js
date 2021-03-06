import { createTheme, responsiveFontSizes } from "@material-ui/core";
import bannerImg from "../assets/images/bg-img.png";

export const accessTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: 14,
      button: {
        textTransform: "none",
        letterSpacing: 0,
        fontWeight: "bold",
      },
      h5: {
        fontSize: 28,
        fontWeight: "normal",
        margin: 0,
        lineHeight: 1.5,
      },
    },
    overrides: {
      MuiInputLabel: {
        shrink: {
          transform: "translate(0, -5px) scale(.75)",
        },
      },
      MuiInput: {
        input: {
          fontWeight: "bold",
          fontSize: 14,
        },
        underline: {
          "&$error:after": {
            borderBottomColor: `#D5DFEE`,
          },
          "&:before": {
            borderBottom: `1px solid #D5DFEE`,
          },
        },
      },
      MuiButton: {
        containedSizeLarge: {
          fontSize: 16,
          fontWeight: 700,
          padding: "1rem 1.5rem",
          boxShadow: "0px 2px 12px rgba(74, 106, 149, 0.2)",
        },
        root: {
          minWidth: "10rem",
          boxSizing: "border-box",
        },
      },
      MuiLink: {
        root: {
          display: "flex",
          justifyContent: "center",
          padding: "1rem 2rem",
          fontWeight: "600",
          fontSize: 14,
          minWidth: "8rem",
          boxSizing: "border-box",
        },
      },
    },
    palette: {
      primary: {
        main: "#3A8DFF",
      },
      secondary: { main: "#FFF", contrastText: "#3A8DFF" },
      text: {
        secondary: "#B0B0B0",
      },
      sideBanner: {
        gradient: "linear-gradient(180deg, #3A8DFFD9 0%, #86B9FFD9 100%)",
        text: "#FFF",
        image: `top / cover no-repeat url(${bannerImg})`,
      },
      mobile: {
        background: "#FFF",
      },
    },
  })
);
