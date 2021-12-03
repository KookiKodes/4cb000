import React from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";
import { WhiteTypography } from "./Utils";
import { ReactComponent as ChatBubble } from "../assets/svgs/bubble.svg";
import bannerImg from "../assets/images/bg-img.png";

const useStyles = makeStyles({
  root: {
    background: `top / cover no-repeat url(${bannerImg})`,
  },
  bubbleContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg, #3A8DFFD9 0%, #86B9FFD9 100%)",
    gap: "2rem",
  },
});

const SideBanner = (props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} xs={5} justify="center">
      <Box container px={9} className={classes.bubbleContainer}>
        <ChatBubble />
        <WhiteTypography variant="h5" align="center">
          Converse with anyone with any language
        </WhiteTypography>
      </Box>
    </Grid>
  );
};

export default SideBanner;
