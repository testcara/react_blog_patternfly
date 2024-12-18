import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
} from "@patternfly/react-core";
import BlogCardFooter from "./BlogCardFooter";

const BlogCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card className="pf-u-mb-md">
      <Link to={`/post/${post.id}`}>
        <CardTitle>{post.title}</CardTitle>
      </Link>
      <CardBody>
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "unset" : 1, // 控制行数
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.summary}
        </div>
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ padding: 0 }}
        >
          {isExpanded ? "收起" : "展开"}
        </Button>
      </CardBody>
      <CardFooter>
        <BlogCardFooter post={post} />
      </CardFooter>
    </Card>
  );
};
export default BlogCard;
