import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Grid,
  GridItem,
  Button,
  FlexItem,
  Flex,
  Pagination,
} from "@patternfly/react-core";
import {
  FetchData,
  DeleteData,
  FetchTargetData,
  SaveData,
} from "../utils/DataUtils";
import {
  AlertDeletionModal,
  AlertSuccessModal,
} from "../utils/AlertModalUtils";
import BlogCard from "./BlogCard";

const PostList = ({ user, author, isLiked }) => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const [isDislikeModalOpen, setIsDislikeModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const navigate = useNavigate();

  useEffect(() => {
    let savedPosts = FetchData("posts");
    if (author) {
      savedPosts = savedPosts.filter((post) => post.author === author);
    }
    if (user && isLiked) {
      console.log(savedPosts);
      savedPosts = savedPosts.filter((post) =>
        post?.liked_by?.includes(user.id)
      );
    }
    setPosts(savedPosts);
  }, [author, user, isLiked]);

  // 打开 Modal
  const openModal = (post) => {
    setPostToDelete(post);
    setIsModalOpen(true);
  };

  // 关闭 Modal
  const closeModal = () => {
    setPostToDelete(null);
    setIsModalOpen(false);
  };

  const closeLikeModal = () => {
    setIsLikeModalOpen(false);
  };

  const closeDislikeModal = () => {
    setIsDislikeModalOpen(false);
  };

  // 确认删除操作
  const confirmDelete = () => {
    if (postToDelete) {
      const updatedPosts = DeleteData("posts", postToDelete.id);
      setPosts(updatedPosts);
    }
    closeModal();
  };
  const handlePageBlur = (e) => {
    // 在输入框失去焦点时更新页码
    const newPage = parseInt(e.target.value, 10);
    if (newPage && newPage !== currentPage) {
      setCurrentPage(newPage); // 更新 currentPage
    }
  };

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLike = (post) => {
    if (user) {
      let targetPost = FetchTargetData("posts", post.id);
      if (targetPost?.liked_by) {
        targetPost.liked_by.push(user.id);
      } else {
        targetPost["liked_by"] = [user.id];
      }
      const existingPosts = FetchData("posts");
      const updatedPosts = existingPosts.map((item) =>
        item.id === post.id
          ? {
              ...item,
              ...targetPost,
            } // 更新数据
          : item
      );
      SaveData("posts", updatedPosts);
      setIsLikeModalOpen(true);
    }
  };

  const handleDislike = (post) => {
    let targetPost = FetchTargetData("posts", post.id);
    targetPost.liked_by.pop(user.id);
    const existingPosts = FetchData("posts");
    const updatedPosts = existingPosts.map((item) =>
      item.id === post.id
        ? {
            ...item,
            ...targetPost,
          } // 更新数据
        : item
    );
    SaveData("posts", updatedPosts);
    setIsDislikeModalOpen(true);
  };

  return (
    <>
      <div className="inner pf-u-mb-lg ">
        <Pagination
          itemCount={posts.length}
          perPage={pageSize}
          page={currentPage}
          onPageInput={(e, pageNumber) => handlePageChange(e, pageNumber)}
          onSetPage={(e, pageNumber) => handlePageChange(e, pageNumber)}
          onBlur={handlePageBlur}
        ></Pagination>
        <Grid hasGutter={false} order={2}>
          {currentPosts?.map((post) => {
            isLiked = isLiked || post?.liked_by?.includes(user?.id);

            return (
              <GridItem key={post.id} rowSpan="1">
                <Card className="pf-u-p-md">
                  <Flex direction={{ default: "column" }}>
                    {/* 博客内容 */}
                    <FlexItem>
                      <BlogCard post={post} />
                    </FlexItem>
                    {/* 操作按钮放在一排，居右 */}
                    <Flex
                      justifyContent={{ default: "justifyContentFlexEnd" }}
                      spaceItems={{ default: "spaceItemsMd" }}
                    >
                      <FlexItem>
                        <Button
                          style={{
                            display:
                              post.author === user?.username || author
                                ? "inline-block"
                                : "none",
                          }}
                          onClick={() => openModal(post)}
                        >
                          删除
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button
                          style={{
                            display:
                              post.author === user?.username || author
                                ? "inline-block"
                                : "none",
                          }}
                          onClick={() => navigate(`/edit/${post.id}`)}
                        >
                          更改
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button
                          style={{
                            display: !isLiked ? "inline-block" : "none",
                          }}
                          onClick={() => {
                            handleLike(post);
                          }}
                        >
                          收藏
                        </Button>
                        <Button
                          style={{
                            display: isLiked ? "inline-block" : "none",
                          }}
                          onClick={() => {
                            handleDislike(post);
                          }}
                        >
                          取消收藏
                        </Button>
                      </FlexItem>
                    </Flex>
                  </Flex>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
        {/* 使用 AlertModal */}
        <AlertDeletionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          title="确认删除"
          message="确定删除这篇博客吗？"
          confirmButtonLabel="删除"
          cancelButtonLabel="取消"
        />
        <AlertSuccessModal
          isOpen={isLikeModalOpen}
          onClose={closeLikeModal}
          title="收藏成功"
        />
        <AlertSuccessModal
          isOpen={isDislikeModalOpen}
          onClose={closeDislikeModal}
          title="取消收藏成功"
        />
      </div>
    </>
  );
};

export default PostList;
