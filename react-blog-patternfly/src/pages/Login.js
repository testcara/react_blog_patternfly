import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GridItem, Grid, Button } from "@patternfly/react-core";
import { FetchData } from "../utils/DataUtils";
import { AlertSuccessModal } from "../utils/AlertModalUtils";
import AuthForm from "../utils/AuthForm";

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
          <AuthForm
            usernameValue={username}
            setUsernameValue={setUsername}
            passwordValue={password}
            setPasswordValue={setPassword}
            onSubmit={handleSubmit}
            errorMessage={error}
            submitButtonText="登陆"
          />
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
