import React from "react";

const ChartExplanation = () => {
  return (
    <>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-12">
            <div
              className="card shadow-lg rounded-4 border-0"
              style={{ backgroundColor: "#1e1e2f", color: "#e4e4e7" }}
            >
              <div className="card-body p-2">
                <h4 className="mb-3 text-center text-muted">
                  About These Charts
                </h4>
                <p className="text-secondary">
                  The following four charts are generated from the
                  <strong> stock data</strong>. They focus on:
                </p>
                <ul>
                  <li>
                    <strong>Close Price</strong>
                  </li>
                  <li>
                    <strong>100-Day Moving Average</strong>
                  </li>
                  <li>
                    <strong>200-Day Moving Average</strong>
                  </li>
                </ul>
                <p className="text-secondary mt-3">
                  To evaluate model performance, the stock data was divided into
                  two groups:
                </p>
                <ul>
                  <li>
                    <strong>First 70%</strong> : used for
                    <strong> training</strong> the model
                  </li>
                  <li>
                    <strong>Last 30%</strong> : used for
                    <strong> testing</strong> against known values
                  </li>
                </ul>
                <p className="text-secondary mt-3">
                  This setup allows you to see how closely the model's
                  predictions align with real values during both training and
                  testing phases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartExplanation;
