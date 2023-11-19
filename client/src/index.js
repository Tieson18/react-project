import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// CSS
import "./core-ui/app.css";
import "./core-ui/responsive.css";
import "./core-ui/leaflet.css";
import './routes/menu/menu.css'
import './routes/contact/contact.css'
import './routes/about/aboutUs.css'
// import './routes/blog/blog.css'
import './routes/cart/cart.css'
import './routes/registration/register.css'
import './routes/checkout/checkout.css'
import './routes/payment/payments.css'
import './routes/not-found/notFound.css'
import './routes/profile/profile.css'


//Components
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  // </React.StrictMode>
);

reportWebVitals();
