import React, { useState, useEffect } from "react";

import './PieChart.css'

export const PieChart = ({ initialValues = [15, 31, 221, 5, 15] }) => {
  const cx = 125;
  const cy = 125;
  const radius = 80;
  const strokeWidth = 30;
  const colors = [
    "#6495ED",
    "purple",
    "#cd5c5c",
    "blue",
    "lightgreen",
    "orange",
    "teal",
  ];
  const circumference = 2 * Math.PI * radius;
  const adjustedCircumference = circumference - 35;
  let sortedValues = [];
  let dataTotal = 0;
  let angleOffset = -90;
  let chartData = [];
  const [circleTransform, setCircleTransform] = useState([]);
  const [strokeDashOffset, setStrokeDashOffset] = useState([]);
  const [hoveredItems, setHoveredItems] = useState([]);
  const [chartValues, setChartValues] = useState([]);

  //hover className="onhover"  {circleTransform[index]} and scale

  useEffect(() => {
    const size = initialValues.length;
    let items = []
    for (let i=0;i<size;i++){
      items.push(false);
    }
    setHoveredItems(items)

    sortedValues = initialValues.sort((a, b) => b - a);
    dataTotal = sortedValues.reduce((acc, val) => acc + val);
    sortedValues.forEach((dataVal, index) => {
      chartData.push(angleOffset);
      angleOffset = (dataVal / dataTotal) * 360 + angleOffset;

      console.log(hoveredItems)
    });
    setChartValues(sortedValues);
    let strokeArray = [];
    sortedValues.forEach((data, index) => {
      const strokeDirr = (data / dataTotal) * circumference;
      console.log(strokeDirr);
      strokeArray.push(circumference - strokeDirr);
    });
    setStrokeDashOffset(strokeArray);

    let rotateArray = [];
    sortedValues.forEach((data, index) => {
      const rotate = `rotate(${chartData[index]}, ${cx}, ${cy})`;
      rotateArray.push(rotate);
    });
    setCircleTransform([...rotateArray]);

    console.log(rotateArray);
    return () => {
      console.log("cleanup");
    };
  }, [initialValues]);

  const handleCurrentItemHover = (index) => {
    console.log(" On mouse enter")
    let items = hoveredItems;
    items[index] = true;
    setHoveredItems([...items]);
  };

  const handleCurrentItemHoverOff = (index) => {
    let items = hoveredItems;
    items[index] = false;
    setHoveredItems([...items]);
    console.log("mouse leave")
  };


  return (
    <div>
      <svg height="300" width="300" viewBox="0 0 300 300">
        {strokeDashOffset.map((value, index) => (
          <g key={index+value}>
            <circle
              onMouseEnter={()=>handleCurrentItemHover(index)}
              onMouseLeave={()=>handleCurrentItemHoverOff(index)}
              cx={cx}
              cy={cy}
              r={radius}
              key={value}
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              strokeDasharray={adjustedCircumference}
              strokeDashoffset={value}
              transform={hoveredItems[index] ? `${circleTransform[index]} scale(1.1)`: `${circleTransform[index]}`}
              fill="none"
              stroke-linecap= "round"
              //style={{stroke: hoveredItems[index] ? "black": "white" }}
            />

            <text style={{ color: "#fff" }} x={cx} y={cy}>
              {chartValues[index]}
            </text>
          </g>
        ))}
      </svg>
      Hovers
      {hoveredItems.map((val)=>{val.toString()})}

    </div>
  );
};
