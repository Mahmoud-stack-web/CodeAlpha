import { useEffect, useState } from "react";
export default function ActivityForm({
  onAdd,
  onUpdate,
  editing,
  onCancelEdit,
}) {
  const [type, setType] = useState("");
  const [steps, setSteps] = useState("");
  const [calories, setCalories] = useState("");

  useEffect(() => {
    if (editing) {
      setType(editing.type || "");
      setSteps(editing.steps ?? "");
      setCalories(editing.calories ?? "");
    } else {
      setType("");
      setSteps("");
      setCalories("");
    }
  }, [editing]);

  const reset = () => {
    setType("");
    setSteps("");
    setCalories("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: type || "Activity",
      steps: Number(steps) || 0,
      calories: Number(calories) || 0,
      date: new Date().toLocaleDateString(),
    };

    if (editing) {
      onUpdate(editing.id, payload);
    } else {
      onAdd(payload);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
    >
      <div className="md:col-span-1">
        <label className="block text-sm muted-text mb-1">Exercise</label>
        <input
          className="input-glass w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="e.g., Running"
        />
      </div>

      <div>
        <label className="block text-sm muted-text mb-1">Steps</label>
        <input
          type="number"
          className="input-glass w-full"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="0"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm muted-text mb-1">Calories</label>
        <input
          type="number"
          className="input-glass w-full"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="0"
          min="0"
        />
      </div>

      <div className="md:col-span-1 flex gap-3">
        <button
          type="submit"
          className="gradient-bg px-4 py-2 rounded-lg font-semibold shadow-md hover:opacity-95"
        >
          {editing ? "Save" : "Add Activity"}
        </button>
        {editing ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 rounded-lg border border-transparent hover:bg-white/5"
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setType("");
              setSteps("");
              setCalories("");
            }}
            className="px-4 py-2 rounded-lg border border-transparent hover:bg-white/5"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
