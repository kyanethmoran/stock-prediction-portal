import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (formData.password !== formData.confirmPassword) {
      return; // Stop here if passwords don't match
    }

    console.log("Signup Data:", formData);
    // replace this with an actual POST request to backend
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
              <nestedcard className="card-body p-4">
                <h3 className="text-center mb-4 text-primary">
                  Create Account
                </h3>
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
                    <label className="form-label text-muted">Email:</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      required
                      value={formData.email}
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
                  <div className="mb-3">
                    <label className="form-label text-muted">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control bg-body-secondary"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {submitted &&
                      formData.password !== formData.confirmPassword && (
                        <div className="text-danger small mt-1">
                          Passwords do not match
                        </div>
                      )}
                  </div>
                  <button type="submit" className="btn btn-info w-100">
                    Sign Up
                  </button>
                </form>
                <p className="text-center mt-3 text-muted">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </nestedcard>
            </card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
