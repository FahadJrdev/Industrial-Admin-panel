import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


export const GraphLine = ({data, primaryLine, secondaryLine}) => {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {
        primaryLine
        ?<>
          <Line
            type="monotone"
            dataKey="Investors"
            stroke="var(--primary-color)"
            activeDot={{ r: 8 }}
          />
        </>
        :<></>
      }
      {
        secondaryLine
        ?<>
          <Line type="monotone" dataKey="Projects" stroke="var(--secondary-color)" />
        </>
        :<></>
      }
    </LineChart>
  );
}
