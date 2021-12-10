import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  makeStyles,
  Link as MuiLink,
  Box,
} from "@material-ui/core";
import { PageContainer, SideBanner } from "./utils";
import { theme } from "../../themes/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    padding: "1.875rem 2.625rem",
    position: "relative",
    right: 0,
    width: "calc(60% - 5.25rem)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
      gap: 0,
      padding: "1rem 2rem",
    },
  },
  link: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem 2rem",
    fontWeight: "600",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
      fontSize: ".75rem",
    },
  },
  flavorText: {
    fontWeight: "normal",
    fontSize: ".875rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".625rem",
    },
  },
  flavorContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    gap: "2rem",
    background: "#FFF",
    [theme.breakpoints.down("sm")]: {
      borderTopLeftRadius: ".5rem",
      borderTopRightRadius: ".5rem",
    },
    [theme.breakpoints.down("xs")]: {
      gap: ".5rem",
    },
  },
  childrenContainer: {
    display: "flex",
    flexDirection: "column",
    background: "#FFF",
    height: "70%",
    paddingLeft: "3rem",
    paddingRight: "5rem",
    gap: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      borderBottomLeftRadius: ".5rem",
      borderBottomRightRadius: ".5rem",
      height: "min-content",
      padding: "1rem 3rem",
    },
  },
});

const Layout = (props) => {
  const classes = useStyles();
  return (
    <PageContainer>
      <SideBanner />
      <Box className={classes.root}>
        <Box className={classes.flavorContainer}>
          <Typography className={classes.flavorText} color="textSecondary">
            {props.flavorText}
          </Typography>
          <MuiLink component={Link} to={props.href} className={classes.link}>
            {props.linkText}
          </MuiLink>
        </Box>
        <Box className={classes.childrenContainer}>{props.children}</Box>
      </Box>
    </PageContainer>
  );
};

export default Layout;
