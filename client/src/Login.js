import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, FormControl, TextField, withStyles } from "@material-ui/core";
import { FormButton } from "./components/utils";
import { login } from "./store/utils/thunkCreators";
import { AccessLayout } from "./components/Access";

const useStyles = withStyles({});

const Login = (props) => {
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
    <AccessLayout
      href="/register"
      linkText="Create account"
      flavorText="Don't have an account?"
    >
      <form onSubmit={handleLogin}>
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
      </form>
    </AccessLayout>
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
