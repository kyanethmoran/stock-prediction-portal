import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/dashboard");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/predict/", {
        ticker: ticker.toUpperCase(),
      });
      console.log("response: ", response.data);

      // set the plots from the backend
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotUrl = `${backendRoot}${response.data.plot_img}`;
      setPlot(plotUrl);

      if (response.data.error) {
        setError(response.data.error);
        console.log(error);
      } else {
        setError("");
      }
    } catch {
      console.error("Error: ", error);
      setError("Unable to fetch prediction. Please check the ticker symbol.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container m-5 mx-auto">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              className="card shadow-lg rounded-4 border-0"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <div className="card-body p-4 text-center">
                <h2 className="m-1 text-muted">Welcome to your Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form className="input-group" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Stock Ticker"
                value={ticker}
                onChange={(e) => {
                  setTicker(e.target.value.toUpperCase());
                  if (error) setError("");
                }}
                required
                disabled={loading}
              />
              <button type="submit" className="btn btn-info text-light">
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    Loading...
                  </>
                ) : (
                  "See Prediction"
                )}
              </button>
            </form>

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>

          {/* display the ticker plots */}
          <div className="prediction mt-1">
            <div className="pt-2">
              {plot && <img src={plot} style={{ maxWidth: "100%" }} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
