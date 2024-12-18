import React from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";

export const Header = () => {
  return (
    <div className="header">
      <Nav variant="horizontal-subnav" aria-label="Horizontal subnav local">
        <NavList>
          <NavItem to="/">首页</NavItem>
          <NavItem to="/create">新建博客</NavItem>
          <NavItem to="/myposts">我的博客</NavItem>
          <NavItem to="/mylikes">我的收藏</NavItem>
        </NavList>
      </Nav>
    </div>
  );
};

export default Header;
