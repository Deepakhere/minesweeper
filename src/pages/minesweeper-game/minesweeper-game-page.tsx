import React from "react";
import { Button, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import useMinesweeperGameController from "./minesweeper-game-controller";
import ControlPanel from "../../component/control-panel";
import MinesweeperRules from "../../component/rules-component/rules";
import Spinner from "../../component/spinner";

const { Title } = Typography;

const MinesweeperGamePage = () => {
  const {
    t,
    revealCell,
    toggleFlag,
    renderCell,
    gameStatus,
    board,
    onBack,
    minesCount,
    flagCount,
    timer,
    isPaused,
    isModalVisible,
    handleStartOverClick,
    handlePauseResume,
    handleModalClose,
    loading,
    setIsPaused,
  } = useMinesweeperGameController();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="minesweeper">
          <div className="minesweeper-card">
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
              >
                {t("minesweeper")}
              </Title>
              <MinesweeperRules setIsPaused={setIsPaused} />
            </div>

            <div className="minesweeper-board">
              <div className="board">
                {board.map((row, rowIndex) => (
                  <div key={rowIndex} className="row">
                    {row.map((_, colIndex) => {
                      const { cellKey, cellClass, cellContent } = renderCell(
                        rowIndex,
                        colIndex
                      );

                      return (
                        <div
                          key={cellKey}
                          className={cellClass}
                          onClick={() => revealCell(rowIndex, colIndex)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            toggleFlag(rowIndex, colIndex, e);
                          }}
                        >
                          {cellContent}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div>
                <ControlPanel
                  t={t}
                  minesCount={minesCount}
                  flagCount={flagCount}
                  gameStatus={gameStatus}
                  isModalVisible={isModalVisible}
                  timer={timer}
                  isPaused={isPaused}
                  handleStartOverClick={handleStartOverClick}
                  handlePauseResume={handlePauseResume}
                  handleModalClose={handleModalClose}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MinesweeperGamePage;
