// src/components/MapComp/MapComp.js
import React from 'react';

// Componente Ball para exibir cada círculo no mapa
const Ball = ({ selected, index, x, y, img, description }) => {
  return (
    <g>
      <a href={selected ? "/quiz" : null} target={selected ? "_self" : "_blank"}>
        <circle
          cx={x}
          cy={y}
          r="5%"
          fill={selected ? "#2880F2" : "#ABD0FF"}
          stroke="#67B5FF"
          strokeWidth={4}
        />
        <text
          x={x}
          y={y}
          fontSize="1.5em"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
        >
          {index}
        </text>
      </a>
    </g>
  );
};

// Componente MapComp que renderiza o SVG com as bolas e linhas
const MapComp = (props) => {
  const balls = [
    { id: 0, x: "50%", y: "0%" },
    { id: 1, x: "50%", y: "10%" },
    { id: 2, x: "50%", y: "20%" },
    { id: 3, x: "50%", y: "30%" },
    { id: 4, x: "50%", y: "40%" },
    { id: 5, x: "50%", y: "50%" },
    { id: 6, x: "50%", y: "60%" },
    { id: 7, x: "50%", y: "70%" },
    { id: 8, x: "50%", y: "80%" },
    { id: 9, x: "50%", y: "90%" },
    { id: 10, x: "50%", y: "100%" },
    { id: 11, x: "50%", y: "110%" },
    { id: 12, x: "50%", y: "120%" },
    { id: 13, x: "50%", y: "130%" },
    { id: 14, x: "50%", y: "140%" },
    { id: 15, x: "50%", y: "150%" },
    // Adicione quantas bolas quiser para preencher a área de rolagem
  ];

  return (
    <svg width="100%" height="100vh">
      {/* Linhas entre as bolas */}
      {balls.map((ball, index) => {
        if (index < balls.length - 1) {
          const nextBall = balls[index + 1];
          return (
            <line
              key={`line-${ball.id}-${nextBall.id}`}
              x1={ball.x}
              y1={ball.y}
              x2={nextBall.x}
              y2={nextBall.y}
              stroke="#67B5FF"
              strokeWidth="10"
            />
          );
        }
        return null;
      })}

      {/* Bolas */}
      {balls.map((ball) => (
        <Ball
          description={props.description}
          img={props.img}
          selected={ball.id === props.selected}
          index={ball.id}
          key={ball.id}
          x={ball.x}
          y={ball.y}
          number={ball.number}
        />
      ))}
    </svg>
  );
};

export default MapComp;
