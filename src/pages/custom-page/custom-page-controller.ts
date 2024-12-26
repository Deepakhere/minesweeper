import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCustomPageController = () => {
  const navigate = useNavigate();
  const [boardSize, setBoardSize] = useState(5);
  const [minesCount, setMinesCount] = useState(5);

  const handleStartGame = () => {
    console.log("Starting game with:", {
      boardSize,
      minesCount,
    });
    navigate("../game", {
      state: {
        boardSize,
        minesCount,
      },
    });
  };

  const handleChangeDifficulty = () => {
    navigate("../");
  };

  const onBack = () => {
    navigate("../");
  };

  return {
    boardSize,
    minesCount,
    onBack,
    setBoardSize,
    setMinesCount,
    handleStartGame,
    handleChangeDifficulty,
  };
};
export default useCustomPageController;

