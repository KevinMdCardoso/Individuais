import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { Link } from "react-router-dom"
import Routes from "./routes"

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
)
