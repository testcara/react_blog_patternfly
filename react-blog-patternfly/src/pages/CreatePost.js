import React from "react";
import { useNavigate } from "react-router-dom";
import { AppendData } from "../utils/DataUtils.js";
import PostForm from "../utils/PostForm.js";
import currentDate from "../utils/DateUtils.js";

const CreatePost = ({ user }) => {
  const createdAt = currentDate();
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    const newPost = {
      id: Date.now(),
      createdAt: createdAt,
      author: user.username,
      ...formData,
    };
    AppendData("posts", newPost);
  };

  const handleSuccess = () => {
    navigate("/myposts");
  };

  return (
    <PostForm
      post={null}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      title="新建博客"
      successMessage="博客新建成功！"
      cancelMessage="放弃新建！"
    />
  );
};

export default CreatePost;
