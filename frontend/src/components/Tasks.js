import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import TaskItem from "./TaskItem";
import { useVerifyUser } from "@/helpers";

const Tasks = ({ tasks }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [taskList, setTaskList] = useState((tasks = []));
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("priorityDesc");
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({
    category: "",
    description: "",
    priority: 3,
  });

  const { category, description, priority } = newTask;
  useEffect(() => {
    if (!router.isReady) return;

    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/task`,
          {
            withCredentials: true,
            params: {
              search: searchTerm,
              sort: sortOption,
              showCompleted: showCompleted,
            },
          }
        );

        setTaskList(data?.message);
      } catch (err) {
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [isAddingNew, router, searchTerm, showCompleted, sortOption]);

  const handleChange = (e) => {
    setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const addNewTask = async (e) => {
    setError(null);
    e.preventDefault();
    if (!newTask.category || !newTask.description || !newTask.priority) {
      setError("All the fields are required");
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/task`,
        { category, description, priority },
        { withCredentials: true }
      );
      setIsAddingNew(false);
      setNewTask({ category: "", description: "", priority: 3 });
      setTaskList([{ ...data?.message }, ...taskList]);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/task/${id}`, {
        withCredentials: true,
      });
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    }
  };

  const updateTask = (taskId, updatedFields) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedFields } : task
      )
    );
  };

  if (isLoading) {
    return null;
  }
  return (
    <div className="tasks">
      <div className="filters">
        <label>
          Sort by: {"  "}
          <select onChange={handleSort}>
            <option value="priorityDesc">Priority (High to Low)</option>
            <option value="priorityAsc">Priority (Low to High)</option>
            <option value="dateDesc">Date Added (Newest First)</option>
            <option value="dateAsc">Date Added (Oldest First)</option>
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted((prev) => !prev)}
          />
          {"    "}Show completed
        </label>
        <label>
          Search: {"  "}
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter_input"
          />
        </label>
      </div>

      <button type="button" className="addNew" onClick={addNewButtonClick}>
        {isAddingNew ? "Cancel" : "Add New"}
      </button>
      {isAddingNew && (
        <>
          <form className="addNewForm" onSubmit={addNewTask}>
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
              placeholder="Task Category"
            />
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Task name"
            />
            <select
              name="priority"
              value={priority}
              onChange={handleChange}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <button type="submit">Add</button>
          </form>
          {error && <div className="error">{error}</div>}
        </>
      )}
      {taskList.length > 0 ? (
        <table className="taskList_table">
          <thead>
            <tr>
              <th>Done</th>
              <th>Category</th>
              <th>Task</th>
              <th>Priority</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="noTask">No Task Found. Create a new task</p>
      )}
    </div>
  );
};

export default Tasks;
