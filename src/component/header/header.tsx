import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const StaticGamingHeader = () => {
  return (
    <div className="gaming-header-container">
      <Title level={2} className="gaming-title">
        MINESWEEPER
      </Title>
    </div>
  );
};

export default StaticGamingHeader;
