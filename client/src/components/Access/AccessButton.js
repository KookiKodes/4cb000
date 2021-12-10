import React from "react";
import { Button, makeStyles, Box } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  btn: {
    padding: "1rem 1.5rem",
    fontSize: "1rem",
    minWidth: "160px",
  },
});

const AccessButton = (props) => {
  const { root, btn } = useStyle();
  return (
    <Box classes={{ root }} py={6}>
      <Button className={btn} {...props} />
    </Box>
  );
};

export default AccessButton;
