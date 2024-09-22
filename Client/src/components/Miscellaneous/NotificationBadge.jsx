import { background } from "@chakra-ui/react";
import React from "react";

const NotificationBadge = ({ count }) => {
  return (
    <span
      style={{
        position: "absolute",
    fontSize: "small",
    top: "13px",
    right: "106px",
    backgroundColor: "red",
    padding: "0px 5px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    color: "white",
      }}
    >
      {count}
    </span>
  );
};

export default NotificationBadge;
