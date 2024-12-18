import React from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";

export const Footer = () => {
  return (
    <div className="footer">
      <Nav variant="horizontal-subnav" aria-label="Horizontal subnav local">
        <NavList>
          <NavItem to="/contact">联系我们</NavItem>
          <NavItem to="/about">关于我们</NavItem>
        </NavList>
      </Nav>
    </div>
  );
};

export default Footer;
