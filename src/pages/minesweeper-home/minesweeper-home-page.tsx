import React, { useEffect } from "react";
import "antd/dist/reset.css";
import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import AnimatedMinesHeader from "../../component/header/header";
import Spinner from "../../component/spinner";

const MinesweeperHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  const cardData = [
    { size: 8, mines: "10 mines", color: "#4CAF50" },
    { size: 15, mines: "40 mines", color: "#2196F3" },
    { size: 30, mines: "99 mines", color: "#9C27B0" },
    { size: 0, mines: "Custom", color: "#ff7f50" },
  ];

  const handleCardClick = (item: { size: number; mines: string }) => {
    if (!item.size) {
      navigate("../custom-page");
      return;
    }
    navigate("./game", {
      state: {
        boardSize: item.size,
        minesCount: +item.mines.split(" ")[0],
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    localStorage.removeItem("gameStatus");
    localStorage.removeItem("board");
    localStorage.removeItem("revealedCells");
    localStorage.removeItem("flaggedCells");
    localStorage.removeItem("flagCount");
    localStorage.removeItem("boardSize");
    localStorage.removeItem("minesCount");
    localStorage.removeItem("timer");
    localStorage.removeItem("isPaused");

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <Spinner />
        </div>
      ) : (
        <div className="minesweeper-home">
          <div className="minesweeper-home-header">
            <AnimatedMinesHeader />
            <Row gutter={[20, 20]} justify="center">
              {cardData.map((item, index) => (
                <Col key={index} xs={12} sm={12} md={12} lg={12}>
                  <Card
                    hoverable
                    bordered
                    className="minesweeper-home-card"
                    style={{
                      borderColor: item.color,
                      borderWidth: "2px",
                      background: "rgba(255, 255, 255, 0.05)",
                    }}
                    onClick={() => {
                      handleCardClick(item);
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        color: item.color,
                        fontFamily: "monospace",
                        fontWeight: "bold",
                      }}
                    >
                      {item.size === 0
                        ? "?"
                        : `${item.size} × ${item.size === 30 ? 16 : item.size}`}
                    </h2>
                    <p
                      style={{
                        color: "#999",
                        marginTop: "5px",
                        fontSize: "14px",
                        fontFamily: "monospace",
                      }}
                    >
                      {item.mines}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default MinesweeperHomePage;
