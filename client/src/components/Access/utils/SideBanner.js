import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { ReactComponent as ChatBubble } from "../../../assets/svgs/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    background: theme.palette.sideBanner.image,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  gradient: {
    background: theme.palette.sideBanner.gradient,
  },
  container: {
    paddingTop: theme.spacing(25),
  },
  header: {
    color: theme.palette.sideBanner.text,
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

const SideBanner = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.gradient}>
        <Grid
          container
          justifyContent="center"
          className={classes.container}
          spacing={2}
        >
          <Grid item xs={8} className={classes.center}>
            <ChatBubble />
          </Grid>
          <Grid item xs={8} className={classes.center}>
            <Typography variant="h5" align="center" className={classes.header}>
              Converse with anyone with any language
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideBanner;
