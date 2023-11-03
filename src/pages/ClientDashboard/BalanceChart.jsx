import React, { useState, useEffect, useRef } from "react";
import { Card } from "../../components";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function BalanceChart({ data }) {
  const chartContainerRef = useRef(null);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(150);

  console.log([height, width]);

  useEffect(() => {
    function handleResize() {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.clientWidth;
        const containerHeight = chartContainerRef.current.clientHeight;

        if (containerWidth < 800) {
          setWidth(containerWidth);
        } else if (containerWidth === 0) {
          setWidth(400);
        }

        if (containerHeight < 150) {
          setHeight(chartContainerRef.current.clientHeight);
        }
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!data) return null;
  return (
    <Card title={"Balance Overview"}>
      <div ref={chartContainerRef} className="balance-overview-chart-container">
        <BarChart
          className="balance-overview-chart"
          width={width}
          height={height}
          data={data}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Bar dataKey="balance" barSize={20} fill="#5B82A3" />
        </BarChart>
      </div>
    </Card>
  );
}
