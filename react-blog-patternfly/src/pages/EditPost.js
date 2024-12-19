import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchTargetData, SaveData } from "../utils/DataUtils.js";
import PostForm from "../utils/PostForm.js";
import currentDate from "../utils/DateUtils.js";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPost, setCurrentPost] = useState(null);
  const updatedAt = currentDate();

  useEffect(() => {
    const savedPost = FetchTargetData("posts", parseInt(id));
    setCurrentPost(savedPost);
  }, [id]);

  const handleSubmit = (formData) => {
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = existingPosts.map((post) => {
      if (post.id === parseInt(id)) {
        post.updatedAt = updatedAt;
        post = { ...post, ...formData };
      }
      return post;
    });
    SaveData("posts", updatedPosts);
  };

  const handleSuccess = () => {
    navigate(`/post/${currentPost.id}`);
  };

  return currentPost ? (
    <PostForm
      post={currentPost}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      title="编辑博客"
      successMessage="博客更新成功！"
      cancelMessage="放弃更新！"
    />
  ) : (
    <div>加载中...</div>
  );
};

export default EditPost;
