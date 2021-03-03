import React, { useState, useEffect } from "react";

export const PieChart2 = ({ initialValues = [15, 31, 221, 5, 15] }) => {
  const cx = 80;
  const cy = 80;
  const radius = 60;
  const strokeWidth = 30;
  const colors = ["#6495ED", "purple", "#cd5c5c", "blue", "lightgreen", "orange", "teal"];
  const circumference = 2 * Math.PI * radius;
  const adjustedCircumference = circumference - 6;
  let sortedValues = [];
  let dataTotal = 0;
  let angleOffset = -90;
  let chartData = [];
  const [circleTransform, setCircleTransform] = useState([]);
  const [strokeDashOffset, setStrokeDashOffset] = useState([]);

  useEffect(() => {
    sortedValues = initialValues.sort((a, b) => b - a);
    dataTotal = sortedValues.reduce((acc, val) => acc + val)
    sortedValues.forEach((dataVal, index) => {
      chartData.push(angleOffset)
      angleOffset = dataVal / dataTotal * 360 + angleOffset;
    })

    let strokeArray=[];
    sortedValues.forEach((data, index) => {
      const strokeDirr = data / dataTotal * circumference;
      console.log(strokeDirr)
      strokeArray.push(circumference - strokeDirr);
    })
    setStrokeDashOffset(strokeArray);

    let rotateArray = [];
    sortedValues.forEach((data, index) => {
      const rotate = `rotate(${chartData[index]}, ${cx}, ${cy})`
      rotateArray.push(rotate)
    })
    setCircleTransform([...rotateArray])
    console.log(rotateArray)
    return () => {
      console.log('cleanup');
    };
  }, []);


  return (
    <div>
      <svg height="250" width="200" viewBox="0 0 200 200">
        {strokeDashOffset.map((value, index) => (
          <g>
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              key={value}
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              strokeDasharray={adjustedCircumference}
              strokeDashoffset={value}
              transform={circleTransform[index]}
              fill="transparent"
            />
            <text></text>
          </g>
        ))}
      </svg>
    </div>
  );
};
