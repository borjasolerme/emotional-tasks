import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Task } from "../types";
import TaskForm from "./TaskForm";

interface TaskTableProps {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

function TaskTable({ tasks, onAddTask, onDeleteTask }: TaskTableProps) {
  const [newTask, setNewTask] = useState<Partial<Task>>({
    businessROI: 5,
    emotionalROI: 5,
    energyDrain: 5,
    urgency: 5,
    importance: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.name) {
      onAddTask(newTask as Task);
      setNewTask({
        businessROI: 5,
        emotionalROI: 5,
        energyDrain: 5,
        urgency: 5,
        importance: 5,
      });
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <div>
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        onSubmit={handleSubmit}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[600px]">
                Tarea
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROI $$$
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROI Emocional
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coste Energético
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Urgencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Importancia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 w-[600px] relative group">
                  <div className="relative">
                    <span className="block truncate">
                      {truncateText(task.name, 50)}
                    </span>
                    {task.name.length > 50 && (
                      <div className="absolute invisible group-hover:visible bg-black text-white p-2 rounded text-sm -top-8 left-0 z-10 whitespace-normal max-w-[300px]">
                        {task.name}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.businessROI}/10
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.emotionalROI}/10
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.energyDrain}/10
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.urgency}/10
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {task.importance}/10
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable;
