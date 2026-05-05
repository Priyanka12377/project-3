import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [projectsRes, tasksRes] = await Promise.all([
          axios.get('http://localhost:3001/api/projects', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:3001/api/tasks', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setProjects(projectsRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const overdueTasks = tasks.filter(task => 
    task.status === 'pending' && new Date(task.dueDate) < new Date()
  );

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role.toUpperCase()}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Projects</h3>
            <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tasks</h3>
            <p className="text-3xl font-bold text-green-600">{tasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overdue</h3>
            <p className={`text-3xl font-bold ${overdueTasks.length ? 'text-red-600' : 'text-gray-600'}`}>
              {overdueTasks.length}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Link
            to="#"
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">+ New Project</h3>
            <p className="text-gray-600">Create a new project and add team members</p>
          </Link>
          <Link
            to="#"
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">+ New Task</h3>
            <p className="text-gray-600">Add tasks to existing projects</p>
          </Link>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Recent Tasks</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {tasks.slice(0, 5).map(task => (
              <div key={task._id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{task.description?.substring(0, 100)}...</p>
                    <div className="flex items-center mt-2 space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      {task.dueDate && (
                        <span className={`text-xs font-medium ${
                          new Date(task.dueDate) < new Date() ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

