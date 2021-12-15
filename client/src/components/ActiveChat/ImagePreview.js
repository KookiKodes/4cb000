import React from "react";
import { Avatar, Grid, Paper, Badge, makeStyles } from "@material-ui/core";

// components
import { RemoveAction } from "../Actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
    width: "100%",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.text.secondary}`,
    boxSizing: "border-box",
  },
  image: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  cancel: {
    color: theme.palette.error.main,
    background: theme.palette.background.secondary,
    padding: 0,
    "&:hover": {
      background: theme.palette.background.secondary,
    },
  },
}));

const ImagePreview = ({ images, removeImage }) => {
  const classes = useStyles();
  if (images && !images.length) return null;

  const handleClick = (index) => () => {
    if (removeImage) {
      removeImage(index);
    }
  };

  return (
    <Grid container className={classes.root}>
      {images.map((url, index) => {
        return (
          <Grid item key={index}>
            <Paper>
              <Badge
                badgeContent={
                  <RemoveAction
                    className={classes.cancel}
                    onClick={handleClick(index)}
                  />
                }
              >
                <Avatar
                  src={url}
                  alt="selected from input"
                  className={classes.image}
                  variant="rounded"
                />
              </Badge>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ImagePreview;
