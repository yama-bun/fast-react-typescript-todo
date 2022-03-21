import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import React from 'react'

const Blog = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/blog/").then((res) => {
            console.log(res.data);
        });
    }, []);

    const addTodoHandler = () => {
        axios
            .post("http://127.0.0.1:8000/blog/", { title: title, body: body })
            .then((res) => console.log(res));
    };
    return (
        <>
            <div className="container">
                <h1>Blog</h1>
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
                    <label htmlFor="body">本文</label>
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
                    className="btn btn-primary"
                >
                    投稿
                </button>

                <div>
                    <ul></ul>
                </div>
            </div>
        </>
    );
};

export default Blog
