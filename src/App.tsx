import React, { useState, useEffect } from "react";
import { Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import InsightsPanel from "./components/InsightsPanel";
import { Sparkles, LineChart } from "lucide-react";

const INITIAL_TASK: Partial<Task> = {
  emotionalROI: 5,
  businessROI: 5,
  timeRequired: 1,
  energyDrain: 5,
  canDelegate: false,
  priority: "medium",
  canDelay: false,
  urgency: 5,
  importance: 5,
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState<Partial<Task>>(INITIAL_TASK);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.name) return;

    const task: Task = {
      ...(newTask as Task),
      id: crypto.randomUUID(),
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask(INITIAL_TASK);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <span>Tabla de Tareas Emocionales</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Organiza tus tareas considerando el impacto emocional y empresarial
          </p>
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            <LineChart className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-700">
              {showInsights ? "Ocultar Insights" : "Ver Insights"}
            </span>
          </button>
        </div>

        {showInsights && (
          <div className="mb-8">
            <InsightsPanel tasks={tasks} />
          </div>
        )}

        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          onSubmit={handleSubmit}
        />

        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </div>
  );
}

export default App;
