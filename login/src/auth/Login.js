import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";

const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter Valid Email Address")
        .strict()
        .trim()
        .required("This field is required"),
      password: yup.string().strict().trim().required("This field is required"),
    }),
    onSubmit: (data) => {
      console.log(data);
      axios.post("http://localhost:5000/api/login",data)
      .then(res=>{
        localStorage.setItem('auth',JSON.stringify(res.data))
       props.history.push('/home')
      })
      .catch((err)=>{toast.error(err.response.data)})
    },
  });
  return (
    <>
      <div className="format">
        <h4 style={{ textAlign: "center" }}>Welcome Back</h4>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="pagesec">
            <button className="btn btn-success text-white" type="submit">
              Submit
            </button>

            <a
              href="#"
              onClick={() => {
                window.location.href = "register";
              }}
            >
              <span>Don't have an account? </span>
              SignUp
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
