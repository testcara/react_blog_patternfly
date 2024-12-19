import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@patternfly/react-core";
import { FetchData, AppendData } from "../utils/DataUtils";
import { AlertSuccessModal } from "../utils/AlertModalUtils";
import AuthForm from "../utils/AuthForm";

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
            <AuthForm
              usernameValue={username}
              setUsernameValue={setUsername}
              passwordValue={password}
              setPasswordValue={setPassword}
              errorMessage={error}
              submitButtonText="创建"
              onSubmit={handleSubmit}
            />
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
