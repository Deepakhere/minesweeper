import React, { useState, useEffect } from "react";

const Spinner = () => {
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExploded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader-container">
      <div className={`mine ${isExploded ? "exploded" : ""}`}>
        <div className="mine-body"></div>
        {[...Array(12)].map((_, i) => (
          <div key={i} className="spike"></div>
        ))}
        {isExploded && (
          <>
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="smoke"></div>
            ))}
          </>
        )}
      </div>
      <div className={`loading-text ${isExploded ? "completed" : ""}`}>
        {isExploded ? "READY!" : "LOADING"}
      </div>

      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #1a1a1a;
          overflow: hidden;
        }

        .mine {
          position: relative;
          width: 80px;
          height: 80px;
          animation: bounce 1s ease infinite;
        }

        .mine-body {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: radial-gradient(circle at 30% 30%, #666, #333);
          border-radius: 50%;
          box-shadow: inset -2px -2px 6px rgba(0,0,0,0.5),
                      inset 2px 2px 6px rgba(255,255,255,0.3);
        }

        .spike {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 16px;
          background: #444;
          transform-origin: center 25px;
        }

        ${[...Array(12)]
          .map(
            (_, i) => `
          .spike:nth-child(${i + 2}) {
            transform: translate(-50%, -50%) rotate(${i * 30}deg);
          }
        `
          )
          .join("\n")}

        .particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: #ff4400;
          border-radius: 50%;
          opacity: 0;
        }

        .smoke {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: rgba(100, 100, 100, 0.8);
          border-radius: 50%;
          opacity: 0;
        }

        .exploded .mine-body {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.5);
          transition: all 0.3s ease-out;
        }

        .exploded .spike {
          animation: explodeSpike 0.5s ease-out forwards;
        }

        .exploded .particle {
          animation: explodeParticle 0.8s ease-out forwards;
        }

        .exploded .smoke {
          animation: explodeSmoke 1s ease-out forwards;
        }

        .loading-text {
          margin-top: 30px;
          font-size: 24px;
          font-weight: bold;
          color: #ff4400;
          letter-spacing: 4px;
        }

        .loading-text.completed {
          color: #4CAF50;
          animation: pulseText 0.5s ease infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes explodeSpike {
          0% {
            transform: translate(-50%, -50%) rotate(var(--rotation)) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--rotation)) scale(2);
            opacity: 0;
          }
        }

        @keyframes explodeParticle {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + ${Math.random() * 200 - 100}px),
              calc(-50% + ${Math.random() * 200 - 100}px)
            ) scale(0);
            opacity: 0;
          }
        }

        @keyframes explodeSmoke {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(
              calc(-50% + ${Math.random() * 100 - 50}px),
              calc(-50% + ${Math.random() * 100 - 50}px)
            ) scale(3);
            opacity: 0;
          }
        }

        @keyframes pulseText {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        ${[...Array(20)]
          .map(
            (_, i) => `
          .particle:nth-child(${i + 1}) {
            --angle: ${Math.random() * 360}deg;
            --distance: ${Math.random() * 100 + 50}px;
            --delay: ${Math.random() * 0.2}s;
            animation-delay: var(--delay);
          }
        `
          )
          .join("\n")}

        ${[...Array(15)]
          .map(
            (_, i) => `
          .smoke:nth-child(${i + 1}) {
            --angle: ${Math.random() * 360}deg;
            --distance: ${Math.random() * 50 + 25}px;
            --delay: ${Math.random() * 0.3}s;
            animation-delay: var(--delay);
          }
        `
          )
          .join("\n")}
      `}</style>
    </div>
  );
};

export default Spinner;
