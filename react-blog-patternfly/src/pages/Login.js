import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GridItem,
  Grid,
  Form,
  FormGroup,
  TextInput,
  Button,
  Alert,
} from "@patternfly/react-core";
import { FetchData } from "../utils/DataUtils";
import { AlertSuccessModal } from "../utils/AlertModalUtils";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // get users
    const users = FetchData("users");
    const targetUser = users.find((item) => item.username === username);
    console.log(`targetUser--${JSON.stringify(targetUser)}`);
    if (targetUser?.password) {
      if (targetUser?.password === password) {
        onLogin(targetUser);
        setError("");
        setIsModalOpen(true);
      } else {
        setError("用户名和密码不匹配");
      }
    } else {
      setError("用户名不存在，请检查用户名或注册新用户");
    }
  };
  // 关闭 Modal
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  return (
    <div className="inner">
      <Link to="/createuser">
        <Button type="button">注册</Button>
      </Link>
      <Grid>
        <GridItem span={4}>
          <Form onSubmit={handleSubmit}>
            <FormGroup label="用户名">
              <TextInput
                isRequired
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
              ></TextInput>
            </FormGroup>
            <FormGroup label="密码">
              <TextInput
                isRequired
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
              ></TextInput>
            </FormGroup>
            {error && <Alert variant="danger" title={error} />}
            <Button type="submit">登陆</Button>
          </Form>
        </GridItem>
      </Grid>
      {/* 提交成功后的Modal */}
      <AlertSuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="登陆成功！"
      />
    </div>
  );
};
export default Login;
