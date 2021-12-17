import React from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflowY: "hidden",
  },
  item: {
    width: "min-content",
    height: "min-content",
  },
  image: {
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: theme.spacing(1, 1, 0, 1),
  },
}));

const Attachments = ({ attachments }) => {
  const classes = useStyles();
  const many = attachments.length > 1;
  return (
    <Grid
      container
      spacing={1}
      className={classes.root}
      direction="row-reverse"
    >
      {attachments.map((attachment, index) => (
        <Grid item className={classes.item} key={index}>
          <img
            height={many ? 75 : 150}
            width={many ? 100 : 150}
            src={attachment}
            alt=""
            className={classes.image}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Attachments;
