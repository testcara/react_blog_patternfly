const BlogCardFooter = ({ post }) => {
  return (
    <>
      <span className="blog-card-span">作者: {post.author}</span>
      <span className="blog-card-span">创建时间: {post?.createdAt}</span>
      <span className="blog-card-span">更新时间: {post?.updatedAt}</span>
    </>
  );
};
export default BlogCardFooter;
