import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  withStyles,
  Box,
} from "@material-ui/core";
import SideBanner from "./components/SideBanner";
import { PageContainer, FormButton } from "./components/Utils";
import { login } from "./store/utils/thunkCreators";

const useStyles = withStyles({});

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

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
        >
          <Typography color="textSecondary">Don't have an account?</Typography>
          <FormButton
            size="large"
            color="primary"
            onClick={() => history.push("/register")}
          >
            Create account
          </FormButton>
        </Grid>
        <Grid component="form" onSubmit={handleLogin}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
            <Grid>
              <FormButton
                type="submit"
                variant="contained"
                size="large"
                color="primary"
              >
                Login
              </FormButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
