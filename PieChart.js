import React, { useState, useEffect } from "react";

export const PieChart = ({ initialValues = [5, 3, 1, 5] }) => {
  const [circumference, setCircumference] = useState(0);
  const [adjustedCircumference, setAdjustedCircumference] = useState(0);
  const [sortedValues, setSortedValues] = useState([8, 9, 9, 9]);
  const [chartData, setChartData] = useState([]);
  const [angleOffset, setAngleOffset] = useState(-90);
  const [dataTotal, setDataTotal] = useState(0);
  const cx = 80;
  const cy = 80;
  const radius = 60;
  const strokeWidth = 30;
  const colors =  ["#6495ED", "goldenrod", "#cd5c5c", "thistle", "lightgray"];

  useEffect(() => {
    setCircumference(2 * Math.PI * radius); //circumference
  });

  useEffect(() => {
    setAdjustedCircumference(circumference - 2);
  }, [circumference]);

  useEffect(() => {
    //sortInitialValues() {
    const sorted = initialValues.sort((a, b) => b - a);
    setSortedValues(sorted);
    console.log("hhhhhh" + sortedValues);
  },[]);

  useEffect(() => {
    // calculateChartData() {
    sortedValues.map((dataVal, index) => {
      const data = { degrees: angleOffset };
      setChartData([...chartData, data]);
      setAngleOffset(dataPercentage(dataVal) * 360 + angleOffset);
    });
  }, [sortedValues]);

  useEffect(() => {
    const reducedValues = sortedValues.reduce((acc, val) => acc + val);
    setDataTotal(reducedValues);
  }, [sortedValues]);

  const dataPercentage = (dataVal) => {
    return dataVal / dataTotal;
  };

  const calculateStrokeDashOffset = (dataVal, circumference) => {
    const strokeDiff = dataPercentage(dataVal) * circumference;
    console.log(strokeDiff)
    return circumference - strokeDiff;
  };

  const returnCircleTransformValue = (index) => {
    return `rotate(${chartData[index]?.degrees}, ${cx}, ${cy})`;
  };

  return (
    <div>
      <svg height="400" width="600" viewBox="0 0 160 160">
        {sortedValues.map((value, index) => {
          <g>
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              strokeDasharray={calculateStrokeDashOffset(value, circumference)}
              transform={returnCircleTransformValue(index)} fill="red"
            />
            <text></text>
          </g>;
        })}
        {/* <g>
          {initialValues}
          <circle
            cx="150"
            cy="40"
            r="25"
            fill="transparent"
            stroke="blue"
            stroke-width="7"
            strokeDasharray={circumference}
          ></circle>
          <text></text>
        </g> */}
      </svg>
    </div>
  );
};