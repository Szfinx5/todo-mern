import React, { useState, useCallback } from "react";
import moment from "moment";
import axios from "axios";
import "../styles/globals.css";

function TaskItem({ task, deleteTask, updateTask }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/task/${task._id}`,
        { completed: !task.completed },
        { withCredentials: true }
      );
      updateTask(task._id, { completed: !task.completed });
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setIsLoading(false);
    }
  }, [task, isLoading, updateTask]);

  return (
    <tr className="task_item">
      <td className="task_name">
        <div
          className="task_item_checkbox"
          onChange={handleCheckboxClick}
          role="checkbox"
          aria-checked
        >
          <input
            type="checkbox"
            checked={task.completed}
            disabled={isLoading}
            readOnly
            tabIndex={-1}
          />
        </div>
      </td>
      <td>
        <p>{task.category}</p>
      </td>
      <td>
        <p>{task.description}</p>
      </td>
      <td>
        <p>{task.priority}</p>
      </td>
      <td>{moment(task.createdAt).format("DD MMM YY")}</td>
      <td>
        <button
          type="button"
          className="deleteBtn"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
