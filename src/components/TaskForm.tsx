import React from "react";
import { PlusCircle, ChevronDown } from "lucide-react";
import { Task } from "../types";

interface TaskFormProps {
  newTask: Partial<Task>;
  setNewTask: (task: Partial<Task>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function TaskForm({ newTask, setNewTask, onSubmit }: TaskFormProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl mb-12">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-md font-semibold text-gray-800"
      >
        <span>Agregar Nueva Tarea</span>
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="p-10 pt-0">
          <form onSubmit={onSubmit} className="space-y-12">
            {/* Task Basic Info Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Información Básica
              </h2>

              {/* Task Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Tarea
                </label>
                <input
                  type="text"
                  placeholder="Describe la tarea"
                  value={newTask.name || ""}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Priority Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridad
                  </label>
                  <div className="relative">
                    <select
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          priority: e.target.value as Task["priority"],
                        })
                      }
                      className="w-full appearance-none px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white pr-10"
                    >
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Time Required */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiempo Requerido
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={newTask.timeRequired}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          timeRequired: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      horas
                    </span>
                  </div>
                </div>

                {/* Urgency Slider */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-4 flex justify-between items-center">
                    <span>Urgencia</span>
                    <span className="text-indigo-600 font-semibold px-3 py-1 bg-indigo-50 rounded-lg min-w-[4rem] text-center">
                      {newTask.urgency}/10
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newTask.urgency}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        urgency: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Puede esperar</span>
                    <span>Urgente</span>
                  </div>
                </div>

                {/* Importance Slider */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-4 flex justify-between items-center">
                    <span>Importancia</span>
                    <span className="text-indigo-600 font-semibold px-3 py-1 bg-indigo-50 rounded-lg min-w-[4rem] text-center">
                      {newTask.importance}/10
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newTask.importance}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        importance: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>No importante</span>
                    <span>Crítico</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Task Flexibility Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Flexibilidad
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Can Delay Toggle */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      ¿Se puede retrasar?
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newTask.canDelay}
                        onChange={(e) =>
                          setNewTask({ ...newTask, canDelay: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>

                {/* Delegation Toggle & Input */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        ¿Se puede delegar?
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newTask.canDelegate}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              canDelegate: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    {newTask.canDelegate && (
                      <input
                        type="text"
                        placeholder="¿A quién delegar?"
                        value={newTask.delegateTo || ""}
                        onChange={(e) =>
                          setNewTask({ ...newTask, delegateTo: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ROI Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Retorno de Inversión
              </h2>

              <div className="space-y-8">
                {/* Emotional ROI */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-4 flex justify-between items-center">
                    <span>ROI Emocional</span>
                    <span className="text-indigo-600 font-semibold px-3 py-1 bg-indigo-50 rounded-lg min-w-[4rem] text-center">
                      {newTask.emotionalROI}/10
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newTask.emotionalROI}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        emotionalROI: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Bajo</span>
                    <span>Alto</span>
                  </div>
                </div>

                {/* Business ROI */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-4 flex justify-between items-center">
                    <span>ROI Negocio</span>
                    <span className="text-indigo-600 font-semibold px-3 py-1 bg-indigo-50 rounded-lg min-w-[4rem] text-center">
                      {newTask.businessROI}/10
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newTask.businessROI}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        businessROI: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Bajo</span>
                    <span>Alto</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full group flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Agregar Tarea</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskForm;
