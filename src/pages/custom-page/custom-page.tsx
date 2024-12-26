import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Slider } from "antd";

import useCustomPageController from "./custom-page-controller";
import MinesweeperRules from "../../component/rules-component";

const CustomPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    boardSize,
    minesCount,
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
            <div className="minesweeper-custom-page-title">
              {t("common.labels.minesweeper")}
            </div>
            <MinesweeperRules />
          </div>

          <div>
            <h3>{t("difficulty")}</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="primary"
                onClick={handleChangeDifficulty}
                size="large"
                block
                style={{
                  background: "#333",
                  color: "#fff",
                  fontWeight: 400,
                }}
              >
                {t("change_difficulty")}
              </Button>
            </div>
          </div>

          <div>
            <h3
              style={{
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {t("board_size")}
            </h3>
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
              <span
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: 400,
                }}
              >
                {boardSize} x {boardSize}
              </span>
            </div>
          </div>

          <div>
            <h3
              style={{
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {t("common.labels.mines_count")}
            </h3>
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
                  color:"#fff",
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
              <span
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: 400,
                }}
              >
                {minesCount}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              type="primary"
              onClick={handleStartGame}
              size="large"
              block
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
