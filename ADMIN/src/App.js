import Router from "./route/Index";

import ThemeProvider from "./layout/provider/Theme";
import { useEffect } from "react";
import {useSelector} from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

const App = () => {
  const info = useSelector(state => state.account.info)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if(!info && (pathname !== "/auth-login" && pathname !== "/auth-register")) return <Navigate to="/auth-login" replace/>

  // useEffect(() => {
  //   if(!info && pathname !== "/auth-login") navigate("/auth-login")
  // }, [info])

  return (
    <ThemeProvider>
      <ToastContainer />
      <Router />
    </ThemeProvider>
  );
};
export default App;