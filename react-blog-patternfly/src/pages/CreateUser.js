import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  GridItem,
  Form,
  FormGroup,
  TextInput,
  Alert,
} from "@patternfly/react-core";
import { FetchData, AppendData } from "../utils/DataUtils";
import { AlertSuccessModal } from "../utils/AlertModalUtils";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = FetchData("users");
    if (existingUsers.find((item) => item.username === username)) {
      setError("用户名已存在");
    } else {
      const newUser = {
        id: Date.now(),
        username: username,
        password: password,
      };
      AppendData("users", newUser);
      setError("");
      setIsModalOpen(true); // 模拟成功后弹出成功消息
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className="inner">
        <Grid>
          <GridItem span={4}>
            <Form onSubmit={handleSubmit}>
              <FormGroup label="用户名">
                <TextInput
                  isRequired
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="密码">
                <TextInput
                  isRequired
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              {error && <Alert variant="danger" title={error} />}
              <Button type="submit">创建</Button>
            </Form>
          </GridItem>
        </Grid>
        {/* 提交成功后的Modal */}
        <AlertSuccessModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="用户新建成功！请登录！"
        />
      </div>
    </>
  );
};
export default CreateUser;
