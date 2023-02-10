import axios from "axios";
import React from "react";

function TaskContainer({ task, user, setTodoList }) {
  async function handleDeleteTodo() {
    try {
      let response = await axios.put("https://login-logout-oauth.onrender.com/user/todo/delete", {
        id: user["_id"],
        todo: task,
      });

      if (response.data.msg) {
        setTodoList([...response.data.todos]);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="task-container m-2 d-flex justify-content-between p-2">
      <h5 style={{
        width: "80%"
      }}>{task}</h5>
      <div className="option d-flex" style={{width:"20%"}}>
        <i className="bi bi-trash3-fill" onClick={handleDeleteTodo}></i>
      </div>
    </div>
  );
}

export default TaskContainer;
