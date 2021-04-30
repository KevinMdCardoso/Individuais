import React from "react"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import CotacaoFormulario from "./Pages/Cotacao/Form"
import { Headers } from "./style"

export default function Routes() {
  return (
    <BrowserRouter>
      <Headers>
        <Link to="/cotacao">MultiCálculo</Link>
        <Nav style={{ width: "100%" }}>
          <Nav.Item>
            <Link
              to="/cotacao/form"
              style={{
                marginBottom: "12px"
              }}
            >
              Nova Cotação
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/cotacao/form"
              style={{
                marginBottom: "12px"
              }}
            >
              Cotações
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/cotacao/form"
              style={{
                marginBottom: "12px"
              }}
            >
              Propostas
            </Link>
          </Nav.Item>
        </Nav>
        <Link to="/cotacao/form">
          PROCULUS ADM. E CORRETORA DE SEGUROS DE VIDA LTDA <ExitToAppIcon />
        </Link>
      </Headers>
      <Switch>
        <Route path="/cotacao" exact component={CotacaoFormulario} />
        <Route path="/cotacao/form" exact component={CotacaoFormulario} />
        <Route path="*" component={CotacaoFormulario} />
      </Switch>
    </BrowserRouter>
  )
}
