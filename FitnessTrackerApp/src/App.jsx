import React, { useEffect, useState } from "react";
import ActivityForm from "./Components/ActivityForm";
import Dashboard from "./Components/Dashboard";
import ActivityList from "./Components/ActivityList";

const STORAGE_KEY = "fitness_activities_v1";

export default function App() {
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(null);

  // load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setActivities(JSON.parse(raw));
      } catch {
        setActivities([]);
      }
    } else {
      setActivities([]);
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity) => {
    const item = { id: Date.now(), ...activity };
    setActivities((s) => [item, ...s]);
  };

  const updateActivity = (id, data) => {
    setActivities((s) => s.map((a) => (a.id === id ? { ...a, ...data } : a)));
    setEditing(null);
  };

  const deleteActivity = (id) => {
    setActivities((s) => s.filter((a) => a.id !== id));
  };

  const startEdit = (activity) => setEditing(activity);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <header className="py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          Fitness Tracker
        </h1>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
        <section className="custom-bg p-6">
          <ActivityForm
            key={editing ? `editing-${editing.id}` : "new"}
            onAdd={addActivity}
            onUpdate={updateActivity}
            editing={editing}
            onCancelEdit={() => setEditing(null)}
          />
        </section>

        <Dashboard activities={activities} />

        <ActivityList
          activities={activities}
          onEdit={startEdit}
          onDelete={deleteActivity}
        />
      </main>
    </div>
  );
}
