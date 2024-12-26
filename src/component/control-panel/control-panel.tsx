import React, { useRef, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Alert, Button, Modal, Typography, Row, Col, Statistic } from "antd";
import {
  FlagOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const ControlPanel = ({
  t,
  minesCount,
  flagCount,
  gameStatus,
  timer,
  isPaused,
  isModalVisible,
  handleStartOverClick,
  handlePauseResume,
  handleModalClose,
}: {
  t: (key: string) => string;
  minesCount: number;
  flagCount: number;
  gameStatus: string;
  timer: string;
  isPaused: boolean;
  isModalVisible: boolean;
  handleStartOverClick: () => void;
  handlePauseResume: () => void;
  handleModalClose: () => void;
}) => {
  const navigate = useNavigate();
  const isWon = gameStatus === "win";
  const confettiRef = useRef<HTMLDivElement>(null);
  const [modalDimensions, setModalDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (isModalVisible && confettiRef.current) {
      const { offsetWidth: width, offsetHeight: height } = confettiRef.current;
      setModalDimensions({ width, height });
    }
  }, [isModalVisible, gameStatus]);

  const onDifficultyChange = () => {
    navigate("../");
  };

  return (
    <div>
      <div className="control-panel">
        <div className="top-panel">
          <FlagOutlined className="flag-icon" />
          <Text className="panel-text">
            {flagCount}/{minesCount}
          </Text>
        </div>

        <div className="footer-panel">
          <ClockCircleOutlined className="clock-icon" />
          <Text className="panel-text">{timer}</Text>
        </div>

        <Button
          type="default"
          icon={<ReloadOutlined />}
          style={{ marginBottom: "10px", background: "#333", color: "#fff" }}
          block
          onClick={handleStartOverClick}
        >
          {t("common.labels.start_over")}
        </Button>

        <Button
          type="default"
          style={{ marginBottom: "10px", background: "#333", color: "#fff" }}
          block
          onClick={onDifficultyChange}
        >
          {t("common.labels.change_difficulty")}
        </Button>

        <Button
          block
          type="default"
          icon={isPaused ? <PlayCircleOutlined /> : <PauseOutlined />}
          style={{ background: "#333", color: "#fff" }}
          onClick={handlePauseResume}
        >
          {isPaused ? t("common.labels.resume") : t("common.labels.pause")}
        </Button>
      </div>

      <Modal
        title="Game Status"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
      >
        <div
          ref={confettiRef}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {isWon && (
            <Confetti
              width={modalDimensions.width}
              height={modalDimensions.height}
              numberOfPieces={200}
              recycle={false}
            />
          )}
          <Alert
            message={isWon ? "You Won! 🎉" : "Game Over! 💥"}
            type={isWon ? "success" : "error"}
            showIcon
            className="mb-4"
          />

          <Row gutter={[16, 16]} justify="space-around" className="text-center">
            <Col span={8}>
              <Statistic title="Mines" value={minesCount} prefix={"💥"} />
            </Col>

            <Col span={8}>
              <Statistic
                title="Flags"
                value={flagCount}
                prefix={<FlagOutlined />}
              />
            </Col>

            <Col span={8}>
              <Statistic
                title="Time"
                value={timer}
                prefix={<ClockCircleOutlined />}
              />
            </Col>
          </Row>

          {!isWon && (
            <Button
              type="default"
              icon={<ReloadOutlined />}
              style={{
                marginTop: "16px",
                background: "#333",
                color: "#fff",
                width: "100%",
              }}
              onClick={handleStartOverClick}
            >
              {t("common.labels.start_over")}
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ControlPanel;
