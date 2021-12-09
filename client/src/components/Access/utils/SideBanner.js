import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { ReactComponent as ChatBubble } from "../../../assets/svgs/bubble.svg";
import bannerImg from "../../../assets/images/bg-img.png";
import { theme } from "../../../themes/theme";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    background: `top / cover no-repeat url(${bannerImg})`,
    height: "100vh",
    minWidth: "100%",
    [theme.breakpoints.up("md")]: {
      minWidth: "40%",
      maxWidth: "40%",
    },
    left: 0,
  },
  backgroundGradient: {
    background: "linear-gradient(180deg, #3A8DFFD9 0%, #86B9FFD9 100%)",
    height: "100%",
    position: "relative",
  },
  bubbleContainer: {
    display: "none",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    height: "80%",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  header: {
    color: "#FFF",
  },
});

const SideBanner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box px={9} className={classes.backgroundGradient}>
        <Box className={classes.bubbleContainer}>
          <ChatBubble />
          <Typography variant="h5" align="center" className={classes.header}>
            Converse with anyone with any language
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBanner;
