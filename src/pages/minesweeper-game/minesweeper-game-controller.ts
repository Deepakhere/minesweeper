import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type Cell = {
  isMine: boolean;
  adjacentMines: number;
};

const useMinesweeperGameController = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { boardSize, minesCount } = location.state;

  const BOARD_SIZE: number = boardSize;
  const MINES_COUNT: number = minesCount;

  const loadInitialState = () => {
    const savedGameStatus = localStorage.getItem("gameStatus");

    if (savedGameStatus === "playing") {
      return {
        board: JSON.parse(localStorage.getItem("board") || "[]"),
        revealedCells: new Set(
          JSON.parse(localStorage.getItem("revealedCells") || "[]")
        ),
        flaggedCells: new Set(
          JSON.parse(localStorage.getItem("flaggedCells") || "[]")
        ),
        flagCount: Number(localStorage.getItem("flagCount")) || 0,
        gameStatus: savedGameStatus as "playing" | "won" | "lost",
      };
    }

    return null;
  };

  const [board, setBoard] = useState<Cell[][]>([]);
  const [flagCount, setFlagCount] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set());
  const [flaggedCells, setFlaggedCells] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const [timer, setTimer] = useState(
    () => localStorage.getItem("timer") || "00:00"
  );
  const [isPaused, setIsPaused] = useState(
    () => localStorage.getItem("isPaused") === "true"
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("isPaused", isPaused.toString());
  }, [isPaused]);

  const saveGameState = () => {
    if (gameStatus === "playing") {
      localStorage.setItem("board", JSON.stringify(board));
      localStorage.setItem(
        "revealedCells",
        JSON.stringify(Array.from(revealedCells))
      );
      localStorage.setItem(
        "flaggedCells",
        JSON.stringify(Array.from(flaggedCells))
      );
      localStorage.setItem("flagCount", flagCount.toString());
      localStorage.setItem("gameStatus", gameStatus);
      localStorage.setItem("boardSize", BOARD_SIZE.toString());
      localStorage.setItem("minesCount", MINES_COUNT.toString());
      localStorage.setItem("timer", timer);
      localStorage.setItem("isPaused", isPaused.toString());
    } else {
      localStorage.removeItem("board");
      localStorage.removeItem("revealedCells");
      localStorage.removeItem("flaggedCells");
      localStorage.removeItem("flagCount");
      localStorage.removeItem("gameStatus");
      localStorage.removeItem("boardSize");
      localStorage.removeItem("minesCount");
      localStorage.removeItem("timer");
      localStorage.removeItem("isPaused");
    }
  };

  const initializeBoard = () => {
    const newBoard: Cell[][] = Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => ({
        isMine: false,
        adjacentMines: 0,
      }))
    );

    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);

      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!newBoard[row][col].isMine) {
          newBoard[row][col].adjacentMines = countAdjacentMines(
            newBoard,
            row,
            col
          );
        }
      }
    }

    setBoard(newBoard);
    setRevealedCells(new Set());
    setFlaggedCells(new Set());
    setGameStatus("playing");
    setFlagCount(0);
    localStorage.setItem("board", JSON.stringify(newBoard));
    localStorage.setItem("gameStatus", "playing");
  };

  const countAdjacentMines = (
    board: Cell[][],
    row: number,
    col: number
  ): number => {
    let count = 0;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < BOARD_SIZE &&
        newCol >= 0 &&
        newCol < BOARD_SIZE
      ) {
        if (board[newRow][newCol].isMine) {
          count++;
        }
      }
    }

    return count;
  };

  const revealCell = (row: number, col: number) => {
    if (
      gameStatus !== "playing" ||
      revealedCells.has(`${row},${col}`) ||
      flaggedCells.has(`${row},${col}`)
    ) {
      return;
    }

    const newRevealedCells = new Set(revealedCells);
    newRevealedCells.add(`${row},${col}`);

    if (board[row][col].isMine) {
      setGameStatus("lost");
      return;
    }

    if (board[row][col].adjacentMines === 0) {
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < BOARD_SIZE &&
          newCol >= 0 &&
          newCol < BOARD_SIZE &&
          !newRevealedCells.has(`${newRow},${newCol}`)
        ) {
          board[newRow][newCol].isMine
            ? revealCell(newRow, newCol)
            : newRevealedCells.add(`${newRow},${newCol}`);
        }
      });
    }

    // if (
    //   newRow >= 0 &&
    //   newRow < BOARD_SIZE &&
    //   newCol >= 0 &&
    //   newCol < BOARD_SIZE &&
    //   !newRevealedCells.has(`${newRow},${newCol}`)
    // ) {
    //   if (!board[newRow][newCol].isMine) {
    //     newRevealedCells.add(`${newRow},${newCol}`);
    //     if (board[newRow][newCol].adjacentMines === 0) {
    //       revealCell(newRow, newCol);
    //     }
    //   }
    // }

    setRevealedCells(newRevealedCells);

    const totalCells = BOARD_SIZE * BOARD_SIZE;
    const safeCells = totalCells - MINES_COUNT;
    if (newRevealedCells.size === safeCells) {
      setGameStatus("won");
    }
    setIsPaused(false);
  };

  const toggleFlag = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (gameStatus !== "playing" || revealedCells.has(`${row},${col}`)) return;

    const newFlaggedCells = new Set(flaggedCells);
    const cellKey = `${row},${col}`;

    if (newFlaggedCells.has(cellKey)) {
      newFlaggedCells.delete(cellKey);
      setFlagCount((prev) => Math.max(0, prev - 1));
    } else if (flagCount < MINES_COUNT) {
      newFlaggedCells.add(cellKey);
      setFlagCount((prev) => Math.min(MINES_COUNT, prev + 1));
    }

    setFlaggedCells(newFlaggedCells);
  };

  const renderCell = (row: number, col: number) => {
    const cell = board[row][col];
    const cellKey = `${row},${col}`;
    const isRevealed = revealedCells.has(cellKey);
    const isFlagged = flaggedCells.has(cellKey);
    const isGameLost = gameStatus === "lost";

    let cellClass = "cell";
    let cellContent = "";

    if (isRevealed) {
      cellClass += " revealed";
      if (cell.isMine) {
        cellContent = "💥";
      } else if (cell.adjacentMines > 0) {
        cellContent = `${cell.adjacentMines}`;
      }
    } else if (isFlagged) {
      cellContent = "🚩";
    }

    if (isGameLost && cell.isMine) {
      cellContent = "💥";
      cellClass += " mine";
    }

    return { cellKey, cellClass, cellContent };
  };

  const onBack = () => {
    navigate("../");
  };

  const onTimeChange = () => {
    if (isPaused || gameStatus === "won" || gameStatus === "lost") {
      return;
    }

    const [minutes, seconds] = timer.split(":");
    const date = new Date();
    date.setMinutes(+minutes);
    date.setSeconds(+seconds);
    date.setSeconds(date.getSeconds() + 1);
    const newMinutesString = date.getMinutes().toString().padStart(2, "0");
    const newSecondsString = date.getSeconds().toString().padStart(2, "0");
    const newTime = `${newMinutesString}:${newSecondsString}`;

    setTimer(newTime);
    localStorage.setItem("timer", newTime);
  };

  const handleStartOverClick = () => {
    initializeBoard();
    setTimer("00:00");
    setIsPaused(false);
    setIsModalVisible(false);

    localStorage.removeItem("timer");
    localStorage.removeItem("flagCount");
    localStorage.removeItem("isPaused");
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const savedState = loadInitialState();

    if (savedState) {
      setBoard(savedState.board);
      //@ts-ignore
      setRevealedCells(savedState.revealedCells);
      //@ts-ignore
      setFlaggedCells(savedState.flaggedCells);
      setFlagCount(savedState.flagCount);
      setGameStatus(savedState.gameStatus);
    } else {
      initializeBoard();
    }
  }, []);

  useEffect(() => {
    if (board.length > 0) {
      saveGameState();
    }
  }, [board, revealedCells, flaggedCells, flagCount, gameStatus, location]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        onTimeChange();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, isPaused, gameStatus, loading]);

  useEffect(() => {
    if (gameStatus !== "playing") {
      setIsModalVisible(true);
    }
  }, [gameStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return {
    t,
    revealCell,
    toggleFlag,
    renderCell,
    revealedCells,
    flaggedCells,
    gameStatus,
    board,
    initializeBoard,
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
  };
};

export default useMinesweeperGameController;
