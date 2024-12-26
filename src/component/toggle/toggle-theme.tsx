import React from "react";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const ToggleSwitch = ({ isDarkMode, toggleDarkMode }: any) => {
  return (
    <div className="toggle-container">
      <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      <Switch
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
};

export default ToggleSwitch;
