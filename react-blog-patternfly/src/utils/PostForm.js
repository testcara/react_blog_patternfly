import React, { useState, useEffect } from "react";
import {
  Grid,
  Form,
  GridItem,
  FormGroup,
  TextInput,
  TextArea,
  Button,
  Alert,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import { AlertSuccessModal } from "./AlertModalUtils";

const PostForm = ({
  post,
  onSubmit,
  title,
  onSuccess,
  successMessage,
  cancelMessage,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [formError, setFormError] = useState("");

  // 初始化表单数据（编辑模式传入 post 数据）
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        summary: post.summary || "",
        content: post.content || "",
      });
    }
  }, [post]);

  // 处理输入变化
  const handleInputChange = (field, value) => {
    setFormData((preData) => ({
      ...preData, // 展开原有对象
      [field]: value, // 更新对应的字段
    }));
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, summary, content } = formData;
    if (!title || !summary || !content) {
      setFormError("所有字段都是必填的");
      return;
    }
    setFormError("");
    onSubmit(formData); // 调用父组件传入的提交逻辑
    setIsSuccessModalOpen(true);
  };

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };
  // 关闭 Modal
  const closeModal = () => {
    setIsSuccessModalOpen(false);
    setIsCancelModalOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="inner">
      <Grid hasGutter={false}>
        <GridItem span={12}>
          <h1>{title}</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup label="标题" fieldId="title" isRequired>
              <TextInput
                isRequired
                id="title"
                value={formData.title}
                onChange={(_, value) => handleInputChange("title", value)}
                placeholder="请输入博客标题"
              />
            </FormGroup>

            <FormGroup label="摘要" fieldId="summary" isRequired>
              <TextArea
                isRequired
                id="summary"
                value={formData.summary}
                onChange={(_, value) => handleInputChange("summary", value)}
                placeholder="请输入博客摘要"
                rows={3}
              />
            </FormGroup>

            <FormGroup label="正文" fieldId="content" isRequired>
              <TextArea
                className="post-form-textarea"
                isRequired
                id="content"
                value={formData.content}
                onChange={(_, value) => handleInputChange("content", value)}
                placeholder="请输入博客正文"
                rows={20}
              />
            </FormGroup>
            {formError && (
              <Alert
                variant="danger"
                title={formError}
                aria-live="assertive"
                icon={<ExclamationCircleIcon />}
              />
            )}
            <Flex
              justifyContent={{ default: "justifyContentFlexEnd" }}
              spaceItems={{ default: "spaceItemsMd" }}
            >
              <FlexItem>
                <Button type="submit" variant="primary">
                  提交
                </Button>
              </FlexItem>
              <FlexItem>
                <Button onClick={handleCancel}>取消</Button>
              </FlexItem>
            </Flex>
          </Form>
        </GridItem>
      </Grid>
      {/* 提交成功后的Modal */}
      <AlertSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeModal}
        title={successMessage}
      />
      <AlertSuccessModal
        isOpen={isCancelModalOpen}
        onClose={closeModal}
        title={cancelMessage}
      />
    </div>
  );
};

export default PostForm;
