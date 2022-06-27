import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "../../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
// Import Compennt
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function PostBlog(props) {
  // Post Blog
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const handleChangeText = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleChangeFile = (event) => {
    setForm({ ...form, [event.target.name]: event.target.files[0] });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    for (const data of formData.entries()) {
      console.log(data[0], data[1]);
    }
    axios
      .post("blog/post-blog", formData)
      .then((res) => {
        toast.success("Success Post", {
          theme: "colored",
        });
        setTimeout(() => {}, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      });
    console.log(form);
  };

  // get Data
  const [dataBlog, setDataBlog] = useState([]);
  const [order, setOrder] = useState({
    page: 1,
    limit: 10,
  });
  const [pageInfo, setPageInfo] = useState({});
  const getDataBlog = () => {
    axios
      .get(`blog/?page=${order.page}&limit=${order.limit}`)
      .then((res) => {
        console.log(res);
        setDataBlog(res.data.data);
        setPageInfo(res.data.pagination);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getDataBlog();
  }, []);
  console.log(dataBlog);

  // Update
  const [isUpdate, setIsUpdate] = useState(false);
  const [idBlog, setIdBlog] = useState("");
  const setUpdate = (data) => {
    setIdBlog(data.id);
    setForm({
      title: data.title,
      content: data.content,
      image: data.image,
    });
    setIsUpdate(true);
  };
  console.log(idBlog);
  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    for (const data of formData.entries()) {
      console.log(data[0], data[1]);
    }
    axios
      .patch(`blog/update-blog/${idBlog}`, formData)
      .then((res) => {
        toast.success("Success Update", {
          theme: "colored",
        });
        setTimeout(() => {}, 3000);
        getDataBlog();
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          theme: "colored",
        });
      });
    console.log(form);
  };
  // Delete Data
  const handleDelete = (data) => {
    // e.preventDefault();
    console.log("handledelete", data);
    axios
      .delete(`blog/delete-blog/${data.id}`, data)
      .then((res) => {
        toast.success("Success Delete Data", {
          theme: "colored",
        });
        getDataBlog();
      })
      .catch((err) => {
        toast.error("Failed Delete Data", {
          theme: "colored",
        });
      });
  };

  return (
    <>
      <div className="wrapper">
        {/* Sidebar  */}
        <Sidebar />
        {/* Page Content  */}
        <div id="content">
          <Header />
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">
                <b>Post Blog</b>
              </h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <ToastContainer />
            <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="write the title of the news"
                    onChange={handleChangeText}
                    value={form.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="meta title">Content</label>
                  <input
                    type="text"
                    className="form-control"
                    id="content"
                    name="content"
                    placeholder="write the meta title of the news"
                    onChange={handleChangeText}
                    value={form.content}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="meta title">Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={handleChangeFile}
                  />
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  {isUpdate ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
          <br />
          <div className="view-data">
            <h3>Blog List</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Content</th>
                  <th scope="col">Image</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {dataBlog.map((item) => (
                  <>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>{item.image}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setUpdate(item)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
