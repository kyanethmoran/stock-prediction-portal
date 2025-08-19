import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import ChartExplanation from "./ChartExplanation";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState();
  const [ma100, setMa100] = useState();
  const [ma200, setMa200] = useState();
  const [combinedPlot, setCombinedPlot] = useState();
  const [testPlot, setTestPlot] = useState();

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

      // set the plots from the backend
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotUrl = `${backendRoot}${response.data.plot_img}`;
      const ma100URL = `${backendRoot}${response.data.plot_100_dma}`;
      const ma200URL = `${backendRoot}${response.data.plot_200_dma}`;
      const ma100_200URL = `${backendRoot}${response.data.plot_100_200_dma}`;
      const testPlotURL = `${backendRoot}${response.data.plot_test_prediction}`;
      setPlot(plotUrl);
      setMa100(ma100URL);
      setMa200(ma200URL);
      setCombinedPlot(ma100_200URL);
      setTestPlot(testPlotURL);

      if (response.data.error) {
        setError(response.data.error);
        console.log(error);
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error: ", error);
      setError("Unable to fetch prediction. Please check the ticker symbol.");
    } finally {
      setLoading(false);
    }
  };

  const plotItems = [
    // { src: plot, alt: "Close price plot" },
    { src: ma100, alt: "100-day moving average" },
    { src: ma200, alt: "200-day moving average" },
    { src: combinedPlot, alt: "100/200-day combined plot" },
    { src: testPlot, alt: "Model test vs. actual plot" },
  ];

  return (
    <>
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

          <ChartExplanation />

          {/* display the ticker plots */}
          <div className="prediction mt-1">
            {plotItems.map((img, i) =>
              img.src ? (
                <div className="pt-2" key={i}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
