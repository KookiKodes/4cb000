import React from "react";
import { Button, Grid, Box } from "@material-ui/core";

const AccessButton = (props) => {
  return (
    <Grid component={Box} container justifyContent="center" py={2}>
      <Grid item>
        <Button {...props} />
      </Grid>
    </Grid>
  );
};

export default AccessButton;
