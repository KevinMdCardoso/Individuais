import React from "react"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import CotacaoFormulario from "./Pages/Cotacao/Form"
import CotacaoList from "./Pages/Cotacao/List"
import PropostaList from "./Pages/Proposta/List/index.js"
import { Headers } from "./style"

export default function Routes() {
  return (
    <BrowserRouter>
      <Headers>
        <Link to="/cotacao" style={{ fontSize: "28px" }}>
          MultiCálculo
        </Link>
        <Nav
          style={{ width: "100%", marginBottom: "10px", flexWrap: "nowrap" }}
        >
          <Nav.Item>
            <Link to="/cotacao/form">Nova Cotação</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/cotacao">Cotações</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/proposta">Propostas</Link>
          </Nav.Item>
        </Nav>
        <Link to="/cotacao/form">
          PROCULUS ADM. E CORRETORA DE SEGUROS DE VIDA LTDA <ExitToAppIcon />
        </Link>
      </Headers>
      <Switch>
        <Route path="/proposta" exact component={PropostaList} />
        <Route path="/cotacao" exact component={CotacaoList} />
        <Route path="/cotacao/form" exact component={CotacaoFormulario} />
        <Route path="*" component={CotacaoFormulario} />
      </Switch>
    </BrowserRouter>
  )
}
