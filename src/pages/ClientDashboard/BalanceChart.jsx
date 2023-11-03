import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function BalanceChart({ data }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!data) return;
  return (
    <div>
      <BarChart
        className="balance-overview-chart"
        width={windowWidth * 0.5}
        height={windowHeight * 0.2}
        data={data}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Bar dataKey="balance" barSize={20} fill="#5B82A3" />
      </BarChart>
    </div>
  );
}
