import { Task } from "../types";
import { Trash2, CheckCircle, Circle } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <p className="text-gray-500">No hay tareas agregadas aún</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
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
                Coste Energía
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
              <tr key={task.id} className={task.completed ? "bg-gray-50" : ""}>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggle(task.id)}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 w-[600px] relative group">
                  <div className="relative">
                    <span
                      className={`block truncate ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
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
                  <span className="text-sm text-gray-500">
                    {task.businessROI}/10
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {task.emotionalROI}/10
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {task.energyDrain}/10
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {task.urgency}/10
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {task.importance}/10
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
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

export default TaskList;
