import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await axios.post(
        "put backend-DjangoRestFramework here",
        formData
      );

      // ✅ Login successful — do something with the response
      alert("Login successful!");
      console.log("Token or User Info:", response.data);
      // e.g., save token and redirect
      // localStorage.setItem("token", response.data.token);
      // navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const msg =
          error.response.data.detail ||
          error.response.data.error ||
          "Login failed. Check your credentials.";
        setLoginError(msg);
      } else {
        setLoginError("Server error. Please try again later.");
        alert(
          "Hey dev dont forget to come back to login.jsx to update the axios.post on line 25"
        );
      }
    }
  };

  return (
    <>
      <div
        className="container my-5"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <card
              className="card shadow-lg rounded-4 border-0"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <nestcard className="card-body p-4">
                <h3 className="text-center mb-4 text-info">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-muted">Username:</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted">Password:</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {submitted && loginError && (
                    <div className="text-danger small mt-1 mb-3">
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-info w-100 text-light"
                  >
                    Login
                  </button>
                </form>
                <p className="text-center mt-3 text-muted">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-info">
                    Sign up here
                  </Link>
                </p>
              </nestcard>
            </card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
