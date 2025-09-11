import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
function getLast7Days() {
  const arr = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    arr.push({
      key: d.toLocaleDateString(),
      label: d.toLocaleDateString(undefined, { weekday: "short" }),
    });
  }
  return arr;
}

export default function Dashboard({ activities }) {
  const todayKey = new Date().toLocaleDateString();

  const totals = useMemo(() => {
    const stepsToday = activities
      .filter((a) => a.date === todayKey)
      .reduce((s, a) => s + (a.steps || 0), 0);
    const calsToday = activities
      .filter((a) => a.date === todayKey)
      .reduce((s, a) => s + (a.calories || 0), 0);
    const days = getLast7Days();
    const map = {};
    days.forEach(
      (d) =>
        (map[d.key] = { dateKey: d.key, label: d.label, steps: 0, calories: 0 })
    );

    activities.forEach((a) => {
      if (map[a.date]) {
        map[a.date].steps += a.steps || 0;
        map[a.date].calories += a.calories || 0;
      }
    });

    const weekData = days.map((d) => ({
      name: d.label,
      steps: map[d.key].steps,
      calories: map[d.key].calories,
    }));

    return { stepsToday, calsToday, weekData };
  }, [activities, todayKey]);

  const stepGoal = 10000;
  const stepPct = Math.min(
    100,
    Math.round((totals.stepsToday / stepGoal) * 100)
  );

  return (
    <section className="custom-bg p-6 space-y-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Today</h2>
          <p className="muted-text">Quick summary</p>
        </div>

        <div className="text-right">
          <div className="text-sm muted-text">Steps</div>
          <div className="text-2xl font-semibold">{totals.stepsToday}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="w-full bg-[rgba(148,163,184,0.12)] h-3 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full gradient-bg"
            style={{ width: `${stepPct}%` }}
          />
        </div>
        <div className="flex justify-between text-sm muted-text">
          <span>
            {stepPct}% of {stepGoal.toLocaleString()} steps
          </span>
          <span>{totals.calsToday} cal</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold  mb-2">Last 7 days</h3>
        <div className="w-full" style={{ height: 220 }}>
          <ResponsiveContainer>
            <BarChart
              data={totals.weekData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.06)"
              />
              <XAxis dataKey="name" tick={{ fill: "var(--color-muted)" }} />
              <YAxis tick={{ fill: "var(--color-muted)" }} />
              <Tooltip
                wrapperStyle={{
                  background: "rgba(15,23,42,0.9)",
                  borderRadius: 8,
                }}
                contentStyle={{
                  border: "none",
                  color: "var(--color-foreground)",
                }}
              />
              <Bar
                dataKey="steps"
                fill="url(#stepsGradient)"
                radius={[6, 6, 0, 0]}
              ></Bar>
              <Bar dataKey="calories" fill="#4ade80" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs muted-text mt-2">
          Blue = steps • Green = calories
        </div>
      </div>
    </section>
  );
}
