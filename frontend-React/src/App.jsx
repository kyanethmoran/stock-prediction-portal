import "./assets/css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/dashboard/Dashboard";

import AuthProvider from "./AuthProvider";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/signup"
              element={
                <PublicRoutes>
                  <SignUp />
                </PublicRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoutes>
                  <Dashboard />
                </PrivateRoutes>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
