export default function ActivityList({ activities, onEdit, onDelete }) {
  return (
    <section className="custom-bg p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold ">Recent Activities</h2>
        <div className="muted-text text-sm">{activities.length} entries</div>
      </div>

      {activities.length === 0 ? (
        <p className="text-center muted-text">No activities logged yet.</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((a) => (
            <li
              key={a.id}
              className="p-3 rounded-md border border-[rgba(99,102,241,0.08)] hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{a.type}</div>
                <div className="text-sm muted-text">
                  Steps: {a.steps} • Calories: {a.calories}
                </div>
                <div className="text-xs muted-text mt-1">{a.date}</div>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onEdit(a)}
                  className="px-3 py-1 rounded-md border border-transparent hover:bg-white/5 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(a.id)}
                  className="px-3 py-1 rounded-md bg-red-600/80 text-white text-sm hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
