import React, { useState, useEffect, useRef } from "react";

export const PieChart2 = ({ initialValues = [15, 31, 221, 5, 15] }) => {
  const [sortedValues, setSortedValues] = useState([8, 9, 9, 9]);
  const [chartData, setChartData] = useState([]);
  const [angleOffset, setAngleOffset] = useState(-90);
  const latestOffset = useRef(angleOffset)
  const [dataTotal, setDataTotal] = useState(0);
  const [strokeDashOffset, setStrokeDashOffset] = useState([]);
  const [circleTransformValue, setCircleTransformValue] = useState([]);
  const cx = 80;
  const cy = 80;
  const radius = 75;
  const strokeWidth = 30;
  const colors = ["#6495ED", "purple", "#cd5c5c", "blue", "lightgreen"];
  const circumference = 2 * Math.PI * radius;
  const adjustedCircumference = circumference - 2;

  const dataPercentage = (dataVal) => {
    return dataVal / dataTotal;
  };

  useEffect(() => {
    //sortInitialValues() {
    const sorted = initialValues.sort((a, b) => b - a);
    setSortedValues(sorted);
  }, [initialValues]);

  useEffect(() => {
    console.log(sortedValues)
    // calculateChartData() {
    sortedValues.map((dataVal, index) => {
      console.log("Current offset" + latestOffset.current)
          setChartData([...chartData, latestOffset.current])
      //console.log("data" + data)
      console.log("chartData" + chartData)
      const test = dataPercentage(dataVal) * 360 + latestOffset.current;
      
      console.log("Obliczenia" + test)
      setAngleOffset(dataPercentage(dataVal) * 360 + angleOffset);
    }, [sortedValues]);

    const reducedValues = sortedValues.reduce((acc, val) => acc + val);
    setDataTotal(reducedValues);

  },[sortedValues])


    useEffect(() => {
      
    sortedValues.map((data, index) => {
      const strokeDiff = dataPercentage(data) * circumference;
      setStrokeDashOffset([...strokeDashOffset, circumference - strokeDiff]);
      let degrees = chartData[index];
      console.log("degrees " + degrees)
      setCircleTransformValue([
        ...circleTransformValue,
        `rotate(${chartData[index]}, ${cx}, ${cy})`,
      ]);

    });

  }, [chartData]);




  return (
    <div>
      <svg height="250" width="200" viewBox="0 0 200 200">
        {strokeDashOffset.map((value, index) => (
          <g>
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              strokeDasharray={value}
              transform={circleTransformValue[index]}
              fill="transparent"
            />
            <text></text>
          </g>
        ))}
      </svg>

      <p>{latestOffset.current}</p>


      <div>Stroke Dash Offset {strokeDashOffset.map((val) => <p>{val}</p>)}</div>
      <br/>
      <p>Chart Data {chartData.map((val) => val)} </p>
      

      <div>Circle transform value {circleTransformValue.map((val) =>
        <p>{val}</p>)}
        </div>
    </div>
  );
};
