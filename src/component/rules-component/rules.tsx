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
