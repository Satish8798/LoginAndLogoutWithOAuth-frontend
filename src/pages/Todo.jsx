import TaskContainer from "../components/TaskContainer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Todo({ user, loginStatus }) {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  async function handleAddTodo() {
    setAddLoading(true);
    try {
      const response = await axios.post(
        "https://login-logout-oauth.onrender.com/user/todo/add",
        {
          id: user["_id"],
          todo,
        }
      );

      if (response.data.msg) {
       setTimeout(()=>{
        setAddLoading(false);
       },2000)
        setTodoList([...response.data.todos]);
        setTodo("");
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigateTo = useNavigate();

  async function getTodos() {
    try {
      const response = await axios.get(
        "https://login-logout-oauth.onrender.com/user/todo/get-list/" +
          user["_id"]
      );

      if (response.data.msg) {
        setTodoList(response.data.todos);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!loginStatus) {
      navigateTo("/");
    }
    getTodos();
  }, []);
  return (
    <div className="container">
      <i
        onClick={() => {
          navigateTo(-1);
        }}
        className="bi bi-arrow-left-circle-fill"
        style={{ fontSize: "40px" }}
      ></i>
      <h1 className="m-1">TODO LIST APP</h1>
      <div className="row">
        <div className="col-12">
          <div className="form-floating mb-3">
            <input
              type="text"
              value={todo}
              className="form-control task-input"
              id="floatingInput"
              placeholder="todo task"
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              required
            />
            <label style={{ color: "black" }}>Enter todo..</label>
            <button className="btn btn-primary mt-2" onClick={handleAddTodo}>
              {!addLoading ? (
                <p>Add Todo</p>
              ) : (
                <div class="spinner-border text-dark" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </div>
          <div className="col-12 mt-5">
            <h3>Todo List</h3>
            <div className="todo-list">
              {todoList.length !== 0 &&
                todoList.map((t, i) => (
                  <TaskContainer
                    task={t}
                    key={i}
                    setTodoList={setTodoList}
                    user={user}
                  />
                ))}
              {todoList.length === 0 && (
                <h5>
                  No todos..
                  <br /> Add a todo
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
