import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    overflow: "hidden",
    width: "min-content",
    height: "min-content",
  },
  image: {
    objectFit: "cover",
    objectPosition: "center",
    width: 150,
    borderRadius: theme.spacing(1.5),
  },
}));

const Attachments = ({ attachments }) => {
  const classes = useStyles();
  const many = attachments.length > 1;
  return (
    <Grid container justifyContent="flex-end">
      {attachments.map((attachment, index) => (
        <Grid item className={classes.item} key={index}>
          <img
            key={index}
            height={many ? 100 : 150}
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
