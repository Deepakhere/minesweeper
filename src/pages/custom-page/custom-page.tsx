import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Slider, Typography } from "antd";

import useCustomPageController from "./custom-page-controller";
import MinesweeperRules from "../../component/rules-component";
import { HomeOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CustomPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    boardSize,
    minesCount,
    onBack,
    setBoardSize,
    handleStartGame,
    setMinesCount,
    handleChangeDifficulty,
  } = useCustomPageController();
  return (
    <div className="minesweeper-custom-page">
      <div className="minesweeper-custom-page-card">
        <div className="minesweeper-custom-page-difficulty">
          <div className="mines-header">
            <Button
              icon={
                <HomeOutlined style={{ color: "#999", fontSize: "18px" }} />
              }
              onClick={onBack}
              type="text"
            />
            <Title
              level={2}
              style={{
                margin: 0,
                textAlign: "center",
                flexGrow: 1,
                color: "#999",
              }}
              className="mines-title"
            >
              {t("minesweeper")}
            </Title>
            <MinesweeperRules />
          </div>

          <div className="control-section">
            <h3>{t("difficulty")}</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                block
                type="primary"
                size="large"
                className="difficulty-change-button"
                onClick={handleChangeDifficulty}
              >
                {t("change_difficulty")}
              </Button>
            </div>
          </div>

          <div className="control-section">
            <h3>{t("board_size")}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Slider
                style={{
                  flex: 1,
                }}
                min={0}
                max={20}
                trackStyle={{
                  background: "#2d951b",
                  height: "4px",
                }}
                railStyle={{
                  background: "#333",
                  height: "4px",
                }}
                value={boardSize}
                onChange={setBoardSize}
              />
              <span className="slider-value">
                {boardSize} x {boardSize}
              </span>
            </div>
          </div>

          <div className="control-section">
            <h3>{t("common.labels.mines_count")}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Slider
                style={{
                  flex: 1,
                }}
                min={0}
                max={100}
                trackStyle={{
                  background: "#2d951b",
                  height: "4px",
                }}
                railStyle={{
                  background: "#333",
                  color: "#fff",
                  height: "4px",
                }}
                handleStyle={{
                  background: "#2d951b",
                  color: "#fff",
                  height: "4px",
                }}
                value={minesCount}
                onChange={setMinesCount}
              />
              <span className="slider-value">{minesCount}</span>
            </div>
          </div>

          <div className="button-section">
            <Button
              block
              size="large"
              type="primary"
              className="play-button"
              onClick={handleStartGame}
              style={{
                background: "#2d951b",
                color: "#fffff",
                fontWeight: 600,
              }}
            >
              {t("play")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPage;
