import React from "react";
import {} from "@patternfly/react-core";
import PostList from "../components/PostList";
const MyLikedPosts = ({ user }) => {
  return <PostList user={user} isLiked={true} />;
};
export default MyLikedPosts;
