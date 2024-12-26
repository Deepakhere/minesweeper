import React, { useState } from "react";
import { Typography, Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const MinesweeperRules = ({
  setIsPaused,
}: {
  setIsPaused?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);

  const showRulesModal = () => {
    setIsRulesModalVisible(true);
    setIsPaused?.(true);
  };

  const handleRulesModalClose = () => {
    setIsRulesModalVisible(false);
    setIsPaused?.(false);
  };

  const RulesContent = () => (
    <Typography>
      <Title level={3}>{t("common.labels.minesweeper_game_rules")}</Title>

      <Paragraph>
        <Text strong>{t("common.labels.objective")}</Text>{" "}
        {t("common.labels.clear_the_board_without_detonating_any_mines")}
      </Paragraph>

      <Paragraph>
        <Text strong>{t("common.labels.gameplay")}</Text>
        <ul>
          <li>Left-click to reveal squares</li>
          <li>Right-click to flag potential mine locations</li>
          <li>Numbers indicate adjacent mines</li>
        </ul>
      </Paragraph>

      <Paragraph>
        <Text strong>{t("common.labels.winning")}</Text> Reveal all safe squares
      </Paragraph>

      <Paragraph>
        <Text strong>{t("common.labels.losing")}</Text> Click on a mine
      </Paragraph>
    </Typography>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-800">
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          type="text"
          icon={
            <QuestionCircleOutlined
              style={{ color: "#999", fontSize: "18px" }}
            />
          }
          onClick={showRulesModal}
        />
      </div>

      <Modal
        open={isRulesModalVisible}
        onCancel={handleRulesModalClose}
        footer={[
          <Button key="close" onClick={handleRulesModalClose}>
            Close
          </Button>,
        ]}
      >
        <RulesContent />
      </Modal>
    </div>
  );
};

export default MinesweeperRules;

// const revealCell = (row: number, col: number) => {
//   if (
//     gameStatus !== "playing" ||
//     revealedCells.has(`${row},${col}`) ||
//     flaggedCells.has(`${row},${col}`)
//   ) {
//     return;
//   }

//   // Create a new Set for this revelation cascade
//   const newRevealedCells = new Set(revealedCells);

//   // Helper function to handle the flood fill recursively
//   const floodFill = (r: number, c: number) => {
//     // Skip if out of bounds or already revealed
//     if (
//       r < 0 ||
//       r >= BOARD_SIZE ||
//       c < 0 ||
//       c >= BOARD_SIZE ||
//       newRevealedCells.has(`${r},${c}`) ||
//       flaggedCells.has(`${r},${c}`)
//     ) {
//       return;
//     }

//     // Add current cell to revealed set
//     newRevealedCells.add(`${r},${c}`);

//     // If it's an empty cell, continue flood fill
//     if (board[r][c].adjacentMines === 0) {
//       // Check all 8 adjacent cells
//       for (let dx = -1; dx <= 1; dx++) {
//         for (let dy = -1; dy <= 1; dy++) {
//           if (dx === 0 && dy === 0) continue;
//           floodFill(r + dx, c + dy);
//         }
//       }
//     }
//   };

//   // If clicked on a mine, game over
//   if (board[row][col].isMine) {
//     setGameStatus("lost");
//     return;
//   }

//   // Start the flood fill from the clicked cell
//   floodFill(row, col);

//   // Update revealed cells
//   setRevealedCells(newRevealedCells);

//   // Check for win condition
//   const totalCells = BOARD_SIZE * BOARD_SIZE;
//   const safeCells = totalCells - MINES_COUNT;
//   if (newRevealedCells.size === safeCells) {
//     setGameStatus("won");
//   }
// };
