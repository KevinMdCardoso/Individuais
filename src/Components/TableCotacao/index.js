/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable-next-line react/prop-types */

import "bootstrap/dist/css/bootstrap.min.css"

import {
  OverlayTrigger,
  Tooltip,
  Button,
  InputGroup,
  Row,
  Col,
  Form
} from "react-bootstrap"
import Table from "react-bootstrap/Table"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import HelpIcon from "@material-ui/icons/Help"
import { Input, Select, CabecalhoTipoPlano } from "./style"

const useStyles = makeStyles({
  headerName: {
    width: "32.8%",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  headerValue: {
    width: "50%",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  headerPremio: {
    width: "18%",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  icon: {
    color: "RGB(0, 0, 0) !important",
    marginRight: "30px"
  },
  mesmaLinha: {},
  alignRight: {
    textAlign: "right",
    fontWeight: "700"
  },
  alignRightVerde: { textAlign: "right", fontWeight: "700", color: "#3c763d" }
})

function separaDoPlano(coberturas) {
  return coberturas.map(x => x)
}

function sortOrdenacao(a, b) {
  if (a.ordenacao > b.ordenacao) {
    return 1
  }
  if (a.ordenacao < b.ordenacao) {
    return -1
  }
  return 0
}

export default function TabelaCotacao(props) {
  const { selecionadoFuneral } = props
  const Planos = props.data
  const rows = []
  const ordenacoesRepitidas = []
  const itensAgrupados = []
  const IndexRemocao = []
  const coberturas = Planos.map(item => separaDoPlano(item.coberturas))

  if (props.isGerado) {
    for (const cob in coberturas) {
      if ({}.hasOwnProperty.call(coberturas, cob)) {
        coberturas[cob].map(x => (x.capital ? rows.push(x) : ""))
      }
    }
  } else {
    for (const cob in coberturas) {
      if ({}.hasOwnProperty.call(coberturas, cob)) {
        coberturas[cob].map(x => rows.push(x))
      }
    }
  }

  rows.sort(sortOrdenacao)

  for (const cobert in rows) {
    const testeOrdenacao = rows.filter(
      x => x.ordenacao === rows[cobert].ordenacao
    )
    if (testeOrdenacao.length > 1) {
      const auxOrdenador = ordenacoesRepitidas.find(
        x => x === rows[cobert].ordenacao
      )
      if (!(auxOrdenador > 0)) {
        ordenacoesRepitidas.push(rows[cobert].ordenacao)
      }
    }
  }

  for (const ordenacao in ordenacoesRepitidas) {
    itensAgrupados.push(
      rows.filter(x => x.ordenacao === ordenacoesRepitidas[ordenacao])
    )
    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i].ordenacao === ordenacoesRepitidas[ordenacao]) {
        rows.splice(i, 1)
        i -= 1
      }
    }
  }

  if (rows.length === 0) {
    return <></>
  }

  const classes = useStyles()
  return (
    <>
      <CabecalhoTipoPlano>{props.NomeTipoPlano}</CabecalhoTipoPlano>
      {props.NomeTipoPlano !== "Serviço" ? (
        <Form.Row style={{ marginBottom: "20px" }}>
          <Col md={4}>
            <Form.Label>Percentual de Agenciamento</Form.Label>
            <Select
              onChange={props.handlechangeAgenciamento}
              style={
                props.isGerado
                  ? {
                      background: "#eee",
                      pointerEvents: "none",
                      touchAction: "none"
                    }
                  : {}
              }
            >
              <option> </option>
              <option value="0" selected={props.agenciamento === 0}>
                0%
              </option>
              <option value="100" selected={props.agenciamento === 100}>
                100%
              </option>
              <option value="150" selected={props.agenciamento === 150}>
                150%
              </option>
              <option value="200" selected={props.agenciamento === 200}>
                200%
              </option>
            </Select>
          </Col>
          <Col md={4}>
            <Form.Label>Percentual de Comissão</Form.Label>
            <Form.Control
              value={`${props.comisao}%`}
              onChange={props.handlechangeComisao}
              readOnly={props.isGerado}
              style={{ textAlign: "right" }}
            />
          </Col>
        </Form.Row>
      ) : (
        ""
      )}

      <Table>
        <thead>
          <tr>
            <th className={classes.headerName}>Nome</th>
            <th className={classes.headerValue}>{props.colunaCapital}</th>
            <th className={classes.headerPremio}>{props.colunaPremio}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(cobertura => (
            <tr key={cobertura.id}>
              <td>{cobertura.nome}</td>
              {props.checkBox === "true" ? (
                <>
                  <td>
                    <input
                      type="checkbox"
                      readOnly={props.isGerado}
                      onClick={e => props.mostraValor(cobertura)}
                    />
                  </td>
                  {cobertura.mostraValor ? (
                    <td className={classes.alignRightVerde}>
                      {cobertura.premio}
                    </td>
                  ) : (
                    <td className={classes.alignRight}>0,00</td>
                  )}
                </>
              ) : (
                <>
                  <td>
                    <Input
                      style={
                        props.isGerado
                          ? {
                              background: "#eee",
                              pointerEvents: "none",
                              touchAction: "none"
                            }
                          : {}
                      }
                      value={
                        cobertura.capital === 0
                          ? "0,00"
                          : `${cobertura.capital}`
                      }
                      onChange={e => props.alteraCapital(cobertura, e)}
                    />
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${"top"}`}>
                          {cobertura.toolTip}
                        </Tooltip>
                      }
                    >
                      <HelpIcon style={{ fontSize: 18 }} />
                    </OverlayTrigger>
                  </td>
                  {cobertura.premio ? (
                    <td className={classes.alignRightVerde}>
                      {cobertura.premio}
                    </td>
                  ) : (
                    <td className={classes.alignRight}>0,00</td>
                  )}
                </>
              )}
            </tr>
          ))}
          {itensAgrupados.map(Coberturas => (
            <tr key={`${Coberturas.length}funeral`}>
              <td>
                <Select onChange={e => props.alteraSelecionado(e, Coberturas)}>
                  <option select> Funeral </option>
                  {Coberturas.map((cobertura, index) => (
                    <option value={index}>{cobertura.nome}</option>
                  ))}
                </Select>
              </td>
              <td>
                <Input
                  value={
                    Coberturas[selecionadoFuneral].capital === 0
                      ? "0,00"
                      : `${Coberturas[selecionadoFuneral].capital}`
                  }
                  onChange={e =>
                    props.alteraCapital(Coberturas[selecionadoFuneral], e)
                  }
                />
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-${"top"}`}>
                      {Coberturas[selecionadoFuneral].toolTip}
                    </Tooltip>
                  }
                >
                  <HelpIcon style={{ fontSize: 18 }} />
                </OverlayTrigger>
              </td>
              {Coberturas[selecionadoFuneral].premio ? (
                <td className={classes.alignRightVerde}>
                  {Coberturas[selecionadoFuneral].premio}
                </td>
              ) : (
                <td className={classes.alignRight}>0,00</td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
