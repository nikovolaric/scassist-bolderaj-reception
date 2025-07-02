import { PieChart, Pie, Cell } from "recharts";

function Visits({ visitsLeft }: { visitsLeft: number }) {
  function valueA() {
    if (visitsLeft > 10) {
      return 10;
    } else {
      return visitsLeft;
    }
  }

  function valueB() {
    if (visitsLeft > 10) {
      return 0;
    } else {
      return 10 - visitsLeft;
    }
  }

  return (
    <div>
      <p className="text-sm font-medium text-black/75">Stanje vstopnic</p>
      <div className="grid grid-cols-2 rounded-lg bg-white px-5 py-3">
        <PieChart width={184} height={184}>
          <Pie
            dataKey="value"
            data={[
              { name: "A", value: valueA() },
              { name: "B", value: valueB() },
            ]}
            innerRadius={60}
            outerRadius={80}
          >
            <Cell fill="#ffde00" />
            <Cell fill="#cccccc" />
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={30}
            fontWeight="semibold"
          >
            {visitsLeft}
          </text>
        </PieChart>
        <p>
          Na voljo še:{" "}
          <span className="font-medium">{visitsLeft} vstopnic</span>
        </p>
      </div>
    </div>
  );
}

export default Visits;
