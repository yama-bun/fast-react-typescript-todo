import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import React from 'react'

const Todo: React.FC = () => {
    type TodoType = {
        id: number
        title: string
        body: string
    }
    const [todos, setTodos] = useState <TodoType[]>([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/blog/")
            .then((res) => setTodos(res.data));
    }, []);

    // 全件取得

    // 新規登録
    const addTodoHandler = () => {
        axios
            .post("http://127.0.0.1:8000/blog/", { title: title, body: body })
            .then((res) => console.log(res));
    };

    return (
        <>
            <div className="container">
                <h1>Todo</h1>
                <div className="form-group">
                    <label htmlFor="title">タイトル</label>
                    <input
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        name="title"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">内容</label>
                    <input
                        onChange={(event) => setBody(event.target.value)}
                        type="text"
                        name="body"
                        className="form-control mb-2"
                    />
                </div>
                <button
                    type="submit"
                    onClick={addTodoHandler}
                    className="btn btn-primary mb-3"
                >
                    投稿
                </button>

                <table className="table">
                    <tr>
                        <th>ID</th>
                        <th>タイトル</th>
                        <th>内容</th>
                        <th>詳細</th>
                        <th>削除</th>
                    </tr>
                    {
                        todos.map(
                            todo =>
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.body}</td>
                                    <td>
                                        <button className="btn btn-info">詳細</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger text-warning">削除</button>
                                    </td>
                                </tr>
                        )
                    }
                </table>

                <ul>
                </ul>
            </div>
        </>
    );
};

export default Todo
