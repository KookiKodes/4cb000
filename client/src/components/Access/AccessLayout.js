import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  makeStyles,
  Link as MuiLink,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import { PageContainer, SideBanner } from "./utils";
import { accessTheme } from "../../themes/accessTheme";

const useStyles = makeStyles((theme) => ({
  flavorContainer: {
    background: accessTheme.palette.mobile.background,
    padding: theme.spacing(4, 5, 0, 0),
    flexWrap: "nowrap",
    maxWidth: "1280px",
    height: "min-content",
    gap: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
      borderRadius: theme.spacing(1, 1, 0, 0),
    },
  },
  mobileText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      padding: 0,
    },
  },
  children: {
    maxWidth: "100%",
    width: "100%",
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={accessTheme}>
      <PageContainer>
        <Grid container>
          <Grid item md={5}>
            <SideBanner />
          </Grid>
          <Grid container item md={7} xs={12} direction="column">
            <Grid
              container
              item
              xs={1}
              justifyContent="flex-end"
              alignItems="center"
              className={classes.flavorContainer}
            >
              <Grid item>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.mobileText}
                >
                  {props.flavorText}
                </Typography>
              </Grid>
              <Grid item>
                <MuiLink
                  component={Link}
                  to={props.href}
                  alt={`Go to ${props.linkText}`}
                  className={classes.mobileText}
                >
                  {props.linkText}
                </MuiLink>
              </Grid>
            </Grid>
            <Grid item xs={9} className={classes.children}>
              {props.children}
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    </ThemeProvider>
  );
};

export default Layout;
