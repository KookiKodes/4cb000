import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";

const RemoveAction = ({ onClick, iconProps, ...props }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <IconButton onClick={handleClick} {...props}>
      <CancelIcon {...iconProps} />
    </IconButton>
  );
};

export default RemoveAction;
