import React, { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/dashboard",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("success: ", response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        console.log("try/catch is done");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              className="card shadow-lg rounded-4 border-0"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <div className="card-body p-4 text-center">
                <h2 className="mb-3 text-muted">Welcome to your Dashboard</h2>
                <p className="text-secondary">
                  This is a protected page only accessible after login.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
