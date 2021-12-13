import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.contrastText,
    maxWidth: "1280px",
    width: "100%",
    marginBottom: "20px",
    paddingTop: theme.spacing(11),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2, 2, 2),
      borderRadius: theme.spacing(0, 0, 1, 1),
    },
  },
  header: {
    fontWeight: 600,
    margin: 0,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontSize: 24,
    },
  },
  form: {
    gap: theme.spacing(4),
  },
}));

const AccessForm = ({ children, header, ...props }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      className={classes.root}
      direction="column"
    >
      <Grid
        component="form"
        container
        item
        md={8}
        xs={12}
        className={classes.form}
        {...props}
      >
        <Typography variant="h5" className={classes.header}>
          {header}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default AccessForm;
