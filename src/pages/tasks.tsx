import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/services/api';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';

type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export default function TasksPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const api = useApi();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  useEffect(() => {
    if (user) getTasks(user.token);
  }, []);

  async function getTasks(token: string) {
    const response = await api.read('/tasks', token);
    if (response && response.length > 0) {
      setTasks( response );
    } else {
      alert('Usuário não possui tarefas');
    }
  }

  const openCreateModal = () => {
    setEditingTask(null);
    setModalTitle('');
    setModalDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalTitle(task.title);
    setModalDescription(task.description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setModalTitle('');
    setModalDescription('');
  };

  const handleSave = async() => {

    if (user === null) return;

    if (editingTask) {
      // Editar tarefa existente
      const editTask = await api.put('/tasks/'+editingTask.id, 
        { title: modalTitle, description: modalDescription, done: editingTask.done }, 
        user.token
      );

      if (editTask && editTask.id) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTask.id
              ? { ...task, title: modalTitle, description: modalDescription }
              : task
          )
        );
      }

    } else {
      // Criar nova tarefa
      const newTask = await api.post('/tasks', {title: modalTitle, description: modalDescription}, user.token);

      if (newTask && newTask.id) {
        setTasks((prev) => [...prev, newTask]);
      } else {
        alert('Erro ao criar tarefa');
      }
      
    }

    closeModal();
  };

  const handleToggleDone = async (task: Task) => {
    if (user === null) return;
    const editTask = await api.put('/tasks/'+task.id, 
      { title: task.title, description: task.description, done: !task.done }, 
      user.token
    );

    if (editTask && editTask.id) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editTask.id ? { ...task, done: !task.done } : task
        )
      );
    }
   
  };

  const handleDelete = async (id: string) => {

    if (user === null) return;

    const response = await api.delete('/tasks/'+id, user.token);

    if (response && response.message == 'Task deleted') {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Minhas Tarefas</h1>
          <div className="flex gap-2">
            <button
              onClick={openCreateModal}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Nova Tarefa
            </button>
            <button
              onClick={logout}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Lista de tarefas */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-start p-3 border rounded"
            >
              <div className="flex-1">
                <span
                  className={`font-semibold ${task.done ? 'line-through text-gray-400' : ''}`}
                >
                  {task.title}
                </span>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleToggleDone(task)}
                  className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  {task.done ? 'Desfazer' : 'Concluir'}
                </button>
                <button
                  onClick={() => openEditModal(task)}
                  className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de criar/editar tarefa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
            </h2>

            <input
              type="text"
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              placeholder="Título"
            />

            <textarea
              value={modalDescription}
              onChange={(e) => setModalDescription(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded resize-none"
              placeholder="Descrição"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
