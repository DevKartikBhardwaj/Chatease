import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/chatLogics";
import { chatState } from "../context/chatprovider";
import { Avatar, Tooltip } from "@chakra-ui/react";
const ScrollableChats = ({ messages }) => {
  const { user } = chatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m.id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                maxWidth: "75%",
                padding: "5px 15px",
                borderRadius: "20px",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m,i,user._id) ? 3 : 10,
              }}
            >{m.content}</span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChats;
