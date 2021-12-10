import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormControl, Link as MuiLink, makeStyles } from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import {
  AccessLayout,
  AccessField,
  AccessForm,
  AccessButton,
  AccessFieldGroup,
} from "./components/Access";

const useStyles = makeStyles({
  adornment: {
    fontSize: ".75rem",
    fontWeight: 600,
  },
});

const Login = (props) => {
  const { user, login } = props;
  const classes = useStyles();

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
      <AccessForm onSubmit={handleLogin} header="Welcome back!">
        <AccessFieldGroup>
          <FormControl fullWidth required>
            <AccessField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
            />
          </FormControl>
          <FormControl fullWidth required>
            <AccessField
              label="Password"
              aria-label="password"
              type="password"
              name="password"
              InputProps={{
                endAdornment: (
                  <MuiLink
                    component={Link}
                    classes={{ root: classes.adornment }}
                    to="/login"
                  >
                    Forgot?
                  </MuiLink>
                ),
              }}
            />
          </FormControl>
        </AccessFieldGroup>
        <AccessButton
          type="submit"
          variant="contained"
          size="large"
          color="primary"
        >
          Login
        </AccessButton>
      </AccessForm>
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
