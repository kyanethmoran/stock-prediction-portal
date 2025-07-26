import React from "react";
import machineLearning from "../assets/images/machineLearning.jpg";

const Main = () => {
  return (
    <>
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-5 fw-bold text-dark">
                Smarter Stock Analysis with Machine Learning
              </h1>
              <p className="lead text-muted mt-3">
                Stock+ uses powerful machine learning to uncover patterns,
                predict market movements, and give you the edge in real-time
                decision making.
              </p>
              {/* come back to this for routing */}
              <a
                href="/signup"
                className="btn btn-info btn-lg mt-3 text-white shadow"
              >
                Get Started
              </a>
            </div>

            <div className="col-md-6 text-center">
              <img
                src={machineLearning}
                className="bg-secondary rounded shadow-sm d-flex justify-content-center align-items-center"
                style={{ height: "300px", width: "100%" }}
              />
            </div>
            <div>
              <p className="text-center text-primary small shadow mt-2 px-3">
                <strong>Disclaimer:</strong> This website is a portfolio project
                created for demonstration purposes only. It is not a real
                product and should <u>not</u> be used to make actual trading or
                investment decisions. No data, predictions, or insights provided
                here are financial advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
