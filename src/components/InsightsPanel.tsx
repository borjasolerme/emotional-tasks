import React from "react";
import {
  Brain,
  Timer,
  Battery,
  DollarSign,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { Task } from "../types";

interface InsightsPanelProps {
  tasks: Task[];
}

function InsightsPanel({ tasks }: InsightsPanelProps) {
  const calculateInsights = () => {
    const highEnergyDrainTasks = tasks.filter((t) => t.energyDrain >= 7);
    const lowROITasks = tasks.filter(
      (t) => (t.businessROI + t.emotionalROI) / 2 <= 4
    );
    const highROITasks = tasks.filter(
      (t) => (t.businessROI + t.emotionalROI) / 2 >= 7
    );
    const delegatableTasks = tasks.filter((t) => t.canDelegate);
    const delayableTasks = tasks.filter((t) => t.canDelay);
    const quickWinTasks = tasks.filter(
      (t) => t.timeRequired <= 2 && (t.businessROI + t.emotionalROI) / 2 >= 6
    );

    const totalTime = tasks.reduce((acc, task) => acc + task.timeRequired, 0);
    const averageEnergyDrain =
      tasks.length > 0
        ? tasks.reduce((acc, task) => acc + task.energyDrain, 0) / tasks.length
        : 0;

    // Add new filters for urgency and importance
    const urgentTasks = tasks.filter((t) => t.urgency >= 8);
    const importantTasks = tasks.filter((t) => t.importance >= 8);
    const urgentAndImportant = tasks.filter(
      (t) => t.urgency >= 8 && t.importance >= 8
    );
    const notUrgentButImportant = tasks.filter(
      (t) => t.urgency < 5 && t.importance >= 8
    );

    return {
      highEnergyDrainTasks,
      lowROITasks,
      highROITasks,
      delegatableTasks,
      delayableTasks,
      quickWinTasks,
      totalTime,
      averageEnergyDrain,
      urgentTasks,
      importantTasks,
      urgentAndImportant,
      notUrgentButImportant,
    };
  };

  const insights = calculateInsights();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add these new cards before existing ones */}
        <InsightCard
          title="Urgente e Importante"
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
          tasks={insights.urgentAndImportant}
          recommendation="Prioridad máxima - Atender inmediatamente"
        />

        <InsightCard
          title="Importante, No Urgente"
          icon={<Brain className="h-6 w-6 text-blue-500" />}
          tasks={insights.notUrgentButImportant}
          recommendation="Planificar y programar estratégicamente"
        />

        <InsightCard
          title="Tareas de Alto Impacto"
          icon={<Brain className="h-6 w-6 text-purple-500" />}
          tasks={insights.highROITasks}
          recommendation="Prioriza estas tareas de alto ROI emocional y de negocio."
        />

        <InsightCard
          title="Quick Wins"
          icon={<Timer className="h-6 w-6 text-green-500" />}
          tasks={insights.quickWinTasks}
          recommendation="Tareas rápidas con alto impacto - ideal para momentos de baja energía."
        />

        <InsightCard
          title="Alto Desgaste"
          icon={<Battery className="h-6 w-6 text-orange-500" />}
          tasks={insights.highEnergyDrainTasks}
          recommendation="Considera delegar o redistribuir estas tareas agotadoras."
        />

        <InsightCard
          title="Bajo ROI"
          icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
          tasks={insights.lowROITasks}
          recommendation="Evalúa eliminar o delegar estas tareas de bajo impacto."
        />

        <InsightCard
          title="Delegables"
          icon={<AlertTriangle className="h-6 w-6 text-blue-500" />}
          tasks={insights.delegatableTasks}
          recommendation="Identifica a quién podrías delegar estas tareas."
        />

        <InsightCard
          title="Pueden Esperar"
          icon={<Clock className="h-6 w-6 text-indigo-500" />}
          tasks={insights.delayableTasks}
          recommendation="Tareas que podrías reprogramar para liberar tiempo."
        />
      </div>

      <div className="bg-indigo-50 p-6 rounded-lg space-y-6 border border-indigo-200">
        <h3 className="text-xl font-semibold text-indigo-900">
          Análisis y Recomendaciones
        </h3>

        <div className="space-y-6">
          <section>
            <h4 className="text-lg font-medium text-indigo-800 mb-2">
              Datos Clave
            </h4>
            <ul className="space-y-1 text-indigo-700">
              <li>• Tiempo total requerido: {insights.totalTime} horas</li>
              <li>
                • Nivel promedio de energía requerida:{" "}
                {insights.averageEnergyDrain.toFixed(1)}/10
              </li>
              <li>
                • {insights.delegatableTasks.length} tareas pueden ser delegadas
              </li>
              <li>
                • {insights.delayableTasks.length} tareas pueden ser retrasadas
              </li>
            </ul>
          </section>

          <section>
            <h4 className="text-lg font-medium text-indigo-800 mb-2">
              Análisis de Situación
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-indigo-700">
                  ¿Qué podemos DELEGAR?
                </h5>
                <ul className="ml-4 text-indigo-600 list-disc">
                  {insights.delegatableTasks.map((task) => (
                    <li key={task.id}>{task.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-indigo-700">
                  ¿Qué podemos RETRASAR?
                </h5>
                <ul className="ml-4 text-indigo-600 list-disc">
                  {insights.delayableTasks.map((task) => (
                    <li key={task.id}>{task.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-indigo-700">
                  ¿Qué podemos NO HACER?
                </h5>
                <ul className="ml-4 text-indigo-600 list-disc">
                  {insights.lowROITasks.map((task) => (
                    <li key={task.id}>{task.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-lg font-medium text-indigo-800 mb-2">
              Matriz de Eisenhower
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-indigo-700">
                  Urgente e Importante (DO)
                </h5>
                <ul className="ml-4 text-indigo-600 list-disc">
                  {insights.urgentAndImportant.map((task) => (
                    <li key={task.id}>{task.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-indigo-700">
                  No Urgente pero Importante (PLAN)
                </h5>
                <ul className="ml-4 text-indigo-600 list-disc">
                  {insights.notUrgentButImportant.map((task) => (
                    <li key={task.id}>{task.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-lg font-medium text-indigo-800 mb-2">
              Acciones Recomendadas
            </h4>
            <ul className="space-y-2 text-indigo-700 ml-4 list-disc">
              <li>
                Atender inmediatamente las tareas urgentes e importantes (
                {insights.urgentAndImportant.length})
              </li>
              <li>
                Programar las tareas importantes no urgentes (
                {insights.notUrgentButImportant.length})
              </li>
              <li>
                Planificar, a primera hora, bloques de tiempo para las tareas
                IMPORTANTES
              </li>
              <li>
                Agrupar / delegar reuniones para sacar tiempo de reflexión todas
                las semanas
              </li>
              <li>
                Delegar tareas de bajo ROI $$$ y emocional, contratar un perfil
                administrativo
              </li>
              <li>
                Identificar tareas de alto ROI emocional y bajo $$$ para
                sustituirlas por otras de mayor impacto
              </li>
              <li>
                Agendar como una reunión más, los momentos de pareja, amigos,
                deporte y autocuidado y RESPETARLOS
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function InsightCard({
  title,
  icon,
  tasks,
  recommendation,
}: {
  title: string;
  icon: React.ReactNode;
  tasks: Task[];
  recommendation: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{recommendation}</p>

      {/* Add this section to show tasks */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="text-sm text-gray-700 border-l-2 border-indigo-200 pl-3"
          >
            {task.name}
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 mt-3">
        {tasks.length} tareas identificadas
      </div>
    </div>
  );
}

export default InsightsPanel;
