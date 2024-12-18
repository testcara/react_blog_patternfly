import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchTargetData } from "../utils/DataUtils";
import { Card, CardTitle, CardFooter, CardBody } from "@patternfly/react-core";
import BlogCardFooter from "../components/BlogCardFooter";

const Post = () => {
  const id = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    console.log(id);
    const targetPost = FetchTargetData("posts", id.id);
    console.log(targetPost);
    setPost(targetPost);
  }, [id]);
  if (!post) return <div>loading---</div>;
  return (
    <div className="inner">
      <Card className="pf-u-mb-md">
        <CardTitle>{post.title}</CardTitle>
        <CardBody className="blog-card-body">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardBody>
        <CardFooter>
          <BlogCardFooter post={post} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
