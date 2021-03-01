import React, { useState, useEffect, useRef } from "react";

export const PieChart2 = ({ initialValues = [15, 31, 221, 5, 15] }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const adjustedCircumference = circumference - 2;
  const [strokeDashoffset, setStrokeDashOffset] = useState([]);
  const [circleTransformValue, setCircleTransformValue] = useState([]);
  let sortedValuesRef = useRef([4, 1, 5]);
  const  [angleOffset, setAngleOffset] = useState([-90]);
  const cx = 80;
  const cy = 80;


  const strokeWidth = 30;
  const colors = ["#6495ED", "purple", "#cd5c5c", "blue", "lightgray", 
"purple", "green"];

  useEffect(() => {
    let angleData = [-90];
    const circleValues = []
    const currentChartData = [];
    const strokeDiffArray = [];
    sortedValuesRef.current = initialValues.sort((a, b) => b - a);
    const dataTotal = sortedValuesRef.current.reduce((acc, val) => acc + val);
    sortedValuesRef.current.map((value, index) => {
      //chartData.push(angleData[index]);
      currentChartData.push(angleData[index])
      console.log('obl wart ' + (value / dataTotal) * 360 + angleData[index])
     angleData.push(((value / dataTotal) * 360) + (angleData[index]));
    });

    console.log("adfff" + angleData)

  

    sortedValuesRef.current.map((value, index) => {
      const strokeDiff = (value / dataTotal) * circumference;
      strokeDiffArray.push(strokeDiff)
    });

    setStrokeDashOffset(strokeDiffArray);


    sortedValuesRef.current.map((value, index) => {
     
      const rotateValue = `rotate(${currentChartData[index]}, ${cx}, ${cy})`;
      circleValues.push(rotateValue)
     
    });
    setCircleTransformValue(circleValues);

    console.log(
        "cirr cjhart data" + currentChartData + "\n"
    )
    console.log("circle transform " + circleTransformValue);
    console.log("str dash off" + strokeDashoffset)
  }, [initialValues]);

  return (
    <div>
      <svg height="160" width="160" viewBox="0 0 160 160">
        <text style={{ color: "white" }} x="0" u="0">
          Test
        </text>
        {circleTransformValue.map((value, index) => (
          <g>
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={radius}
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              strokeDashoffset={strokeDashoffset[index]}
              strokeDasharray={adjustedCircumference}
              transform={value}
              fill="transparent"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
