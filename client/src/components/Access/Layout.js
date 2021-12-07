import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  makeStyles,
  Link as MuiLink,
  Box,
} from "@material-ui/core";
import { PageContainer, SideBanner } from ".";

const useStyles = makeStyles({
  link: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem 2rem",
    fontWeight: "600",
  },
});

const Layout = (props) => {
  const classes = useStyles();
  return (
    <PageContainer container justifyContent="center">
      <SideBanner />
      <Grid
        component={Box}
        container
        xs={7}
        justifyContent="center"
        alignItems="flex-start"
        py={3.75}
        px={5.25}
      >
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="flex-end"
          spacing={4}
        >
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {props.flavorText}
            </Typography>
          </Grid>
          <Grid item>
            <MuiLink component={Link} to={props.href} className={classes.link}>
              {props.linkText}
            </MuiLink>
          </Grid>
        </Grid>
        <Grid>{props.children}</Grid>
      </Grid>
    </PageContainer>
  );
};

export default Layout;
