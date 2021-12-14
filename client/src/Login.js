import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link as MuiLink, makeStyles, TextField } from "@material-ui/core";
import { AccessLayout, AccessForm, AccessButton } from "./components/Access";
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  adornment: {
    fontSize: ".75rem",
    fontWeight: 600,
    padding: theme.spacing(0, 2),
    minWidth: 0,
  },
}));

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
        <TextField
          aria-label="username"
          label="Username"
          name="username"
          type="text"
          fullWidth
          required
        />
        <TextField
          label="Password"
          aria-label="password"
          type="password"
          name="password"
          fullWidth
          required
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
