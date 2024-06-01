import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";

const Register = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().strict().trim().required("This field is required"),
      email: yup
        .string()
        .email("Enter Valid Email Address")
        .strict()
        .trim()
        .required("This field is required"),
      password: yup.string().strict().trim().required("This field is required"),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Must be Same")
        .required("this field required"),
    }),
    onSubmit: (data) => {
      axios
        .post("http://localhost:5000/api/register", data)
        .then((res) => {
          toast.success("User Registered Successfully!!")
          props.history.push("/login");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    },
  });
  return (
    <>
      <div className="format">
        <h4 style={{ textAlign: "center", marginTop: "10px" }}>Sign up</h4>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
            />
            {formik.errors.confirmpassword ? (
              <div className="text-danger">{formik.errors.confirmpassword}</div>
            ) : null}
          </div>
          <div className="pagesec">
            <button
              className="btn btn-success text-white font-weight-bold"
              type="submit"
            >
              Submit
            </button>
            <button className="btn btn-primary">
              <a
                className="text-decoration-none  text-white"
                href="/login"
                onClick={() => {
                  window.location.href = "register";
                }}
              >
                Login
              </a>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
