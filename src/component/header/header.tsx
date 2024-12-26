import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

const AnimatedMinesHeader = () => {
  return (
    <div className="header-container">
      <Title level={1} className="animated-title">
        {["M", "I", "N", "E", "S", "W", "E", "E", "P", "E", "R"].map(
          (letter, index) => (
            <span key={index} data-text={letter}>
              {letter}
            </span>
          )
        )}
      </Title>

      <style>
        {`
          .header-container {
            text-align: center;
            padding-bottom: 20px;
          }

          .animated-title {
            display: inline-block;
          }

          .animated-title span {
            display: inline-block;
            margin: 0 2px;
            position: relative;
            animation: hollow-fill 3s infinite;
          }

          .animated-title span::before {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 0%;
            color: #4CAF50;
            overflow: hidden;
            animation: fill-up 3s infinite;
          }

          .animated-title span {
            color: transparent;
            -webkit-text-stroke: 2px #4CAF50;
          }

          @keyframes hollow-fill {
            0%, 100% {
              -webkit-text-stroke: 2px #4CAF50;
            }
            50% {
              -webkit-text-stroke: 2px #4CAF50;
            }
          }

          @keyframes fill-up {
            0%, 100% {
              height: 0;
            }
            50% {
              height: 100%;
            }
          }

          .ant-typography {
            margin: 0 !important;
            font-size: 48px !important;
            font-weight: bold !important;
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedMinesHeader;
