import React from "react";
import {} from "@patternfly/react-core";
import PostList from "../components/PostList";
const MyPosts = ({ user }) => {
  return <PostList author={user.username} />;
};
export default MyPosts;
