import React from "react";
import {
  Avatar,
  Grid,
  Paper,
  Badge,
  Divider,
  Box,
  makeStyles,
} from "@material-ui/core";

// components
import { RemoveAction } from "../Actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
    width: "100%",
    gap: theme.spacing(2),
    padding: theme.spacing(2, 0),
    boxSizing: "border-box",
    overflowY: "hidden",
    flexWrap: "nowrap",
    maxWidth: "100%",
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
  divider: {
    background: theme.palette.text.secondary,
    padding: theme.spacing(0, 2),
    opacity: 0.5,
    height: theme.spacing(0.1),
  },
}));

const ImagePreview = ({ images, removeImage }) => {
  const classes = useStyles();
  if (!images || !images.length) return null;

  const handleClick = (index) => () => {
    if (removeImage) {
      removeImage(index);
    }
  };

  return (
    <Box px={2}>
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
      <Divider classes={{ root: classes.divider }} />
    </Box>
  );
};

export default ImagePreview;
