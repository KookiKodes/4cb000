import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { AccessLayout, AccessForm, AccessButton } from "./components/Access";

const Login = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AccessLayout
      href="/login"
      linkText="Login"
      flavorText="Already have an account?"
    >
      <AccessForm header="Create an account." onSubmit={handleRegister}>
        <TextField
          aria-label="username"
          label="Username"
          name="username"
          type="text"
          fullWidth
          required
        />
        <TextField
          label="E-mail address"
          aria-label="e-mail address"
          type="email"
          name="email"
          fullWidth
          required
        />
        <TextField
          aria-label="password"
          label="Password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="password"
          error={formErrorMessage.confirmPassword}
          helperText={formErrorMessage.confirmPassword}
          fullWidth
          required
        />
        <TextField
          label="Confirm Password"
          aria-label="confirm password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="confirmPassword"
          error={formErrorMessage.confirmPassword}
          helperText={formErrorMessage.confirmPassword}
          fullWidth
          required
        />
        <AccessButton
          type="submit"
          variant="contained"
          size="large"
          color="primary"
        >
          Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
