import React, { useState } from "react";
import "./index.css";
import axios from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { login } from "../../stores/actions/auth";

function Login(props) {
  // Handle Login
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChangeText = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  // Implement Login dengan Redux
  const handleSubmit = (event) => {
    event.preventDefault();
    props
      .login(form)
      .then((res) => {
        localStorage.setItem("token", res.value.data.data.token);
        toast.success("Success Login", {
          theme: "colored",
        });
        setTimeout(() => {
          props.history.push("/admin/main");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.msg);
      });
  };
  console.log(form);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  LOGIN ADMIN
                </h5>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={handleChangeText}
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={handleChangeText}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
