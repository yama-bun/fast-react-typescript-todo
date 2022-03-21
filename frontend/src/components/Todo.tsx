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
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [selectedTodo, setSelectedTodo] = useState < TodoType[]>([]);
    const [id, setId] = useState<number>(1);
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");


    // 全件取得
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/blog/")
            .then((res) => setTodos(res.data));
    }, []);

    // id取得
    const getTodo = (id: number) => {
        selectedTodo.pop()
        axios
            .get(`http://127.0.0.1:8000/blog/${id}`)
            .then((res) => setSelectedTodo([...selectedTodo, res.data]));
    };

    // 新規登録
    const addTodoHandler = () => {
        axios
            .post("http://127.0.0.1:8000/blog/", { title: title, body: body })
            .then((res) => console.log(res));
    };

    // 更新
    const putTodoHandler = (id: number) => {
        axios
            .put(`http://127.0.0.1:8000/blog/${id}`, { id: id, title: title, body: body })
            .then((res) => console.log(res));
    };

    // 削除
    const deleteTodoHandler = (id: number) => {
        axios.delete(`http://127.0.0.1:8000/blog/${id}`)
    }

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
                <hr />
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
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.body}</td>
                            <td>
                                <button onClick={() => getTodo(todo.id)} className="btn btn-info">
                                    編集
                                </button>
                            </td>
                            <td>
                                <button onClick={() => deleteTodoHandler(todo.id)} className="btn btn-danger text-warning">削除</button>
                            </td>
                        </tr>
                    ))}
                </table>
                <hr />
                {
                    selectedTodo.length ? (
                        <>
                            <p>id:{selectedTodo[0].id}</p>
                            <input type="hidden" name="id" value={selectedTodo[0].id} />
                            <div className="form-group">
                                <label htmlFor="title">タイトル</label>
                                <input type="text" name="title" onChange={(event) => setTitle(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">内容</label>
                                <input type="text" name="body" onChange={(event) => setBody(event.target.value)} />
                            </div>
                            <button
                                type="submit"
                                onClick={() => putTodoHandler(selectedTodo[0].id)}
                                className="btn btn-primary mb-3"
                            >更新</button>
                        </>
                    ) : ''
                }
            </div>
        </>
    );
};

export default Todo
