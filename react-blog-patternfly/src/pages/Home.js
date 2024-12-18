import React from "react";
import PostList from "../components/PostList";
const Home = ({ user }) => {
  return <PostList author={null} user={user} />;
};

export default Home;
