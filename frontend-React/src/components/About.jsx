import React from "react";
import "../assets/css/About.css";
import techStack from "../assets/dataObjects/TechStack";

const About = () => {
  const tech = techStack;
  return (
    <>
      <section className="mt-0">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className="about-hero p-4 p-md-5 shadow-sm">
              <h1 className="display-6 fw-semibold mb-3">About This Project</h1>
              <p className="text-muted mb-3">
                This is a <strong>sample/portfolio project</strong> built to
                demonstrate a modern full-stack workflow: a React front end
                styled with Bootstrap 5, a Django REST API, and a simple
                machine-learning layer (TensorFlow) for illustrative
                predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-4 p-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <h2 className="h4 m-0">Tech Stack Overview</h2>
            </div>

            <div className="d-flex flex-wrap gap-3">
              {tech.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  className="about-pill bg-info text-dark"
                  aria-disabled="true"
                  title={`${t.name} — ${t.detail}`}
                >
                  <span className="pill-name">{t.name}</span>
                  <span className="pill-detail">· {t.detail}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="alert alert-warning border-0 rounded-4">
              <h3 className="h6 mb-2">Disclaimer</h3>
              <p className="mb-0 small">
                This application is <strong>not</strong> a production system and{" "}
                <strong>should not</strong> be used for real trading or
                financial decisions. Any ML/AI features are illustrative only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
