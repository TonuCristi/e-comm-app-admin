import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

const StyledChart = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1 / span 2;
  grid-row: 2 / span 3;
`;

type Props = {
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default function Chart({ data }: Props) {
  return (
    <StyledChart>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Orders" fill="#8884d8" />
          <Bar dataKey="Sales" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </StyledChart>
  );
}
