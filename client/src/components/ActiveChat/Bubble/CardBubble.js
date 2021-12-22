import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  withStyles,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  date: {
    fontSize: 11,
    color: theme.palette.text.other,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    height: 125,
  },
}));

const BubbleCard = withStyles((theme) => ({
  root: {
    maxWidth: 150,
    borderRadius: theme.spacing(1.5, 1.5, 0, 1.5),
    boxShadow: "none",
  },
}))(Card);

const CardBubble = ({ time, attachment, BubbleContent, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.date}>{time}</Typography>
      <BubbleCard className={classes.card} {...props}>
        <CardMedia image={attachment} className={classes.image} />
        {BubbleContent}
      </BubbleCard>
    </>
  );
};

export default CardBubble;
