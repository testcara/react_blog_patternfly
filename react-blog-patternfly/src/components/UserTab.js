import React from "react";
import { Button } from "@patternfly/react-core";
const UserTab = ({ user, outLog }) => {
  return (
    <div className="usertab">
      你好，{`${user?.username}!  `}
      <Button onClick={outLog} variant="danger">
        退出登陆
      </Button>
    </div>
  );
};
export default UserTab;
