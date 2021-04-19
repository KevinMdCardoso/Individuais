/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable-next-line react/prop-types */

import "bootstrap/dist/css/bootstrap.min.css"
import { OverlayTrigger, Tooltip, Button, InputGroup } from "react-bootstrap"
import Table from "react-bootstrap/Table"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import HelpIcon from "@material-ui/icons/Help"
import { Input } from "./style"

const useStyles = makeStyles({
  table: {
    width: "100%"
    // borderTop: "1px solid #dee2e6"
  },
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
  }
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
  const Planos = props.data
  const rows = []
  const coberturas = Planos.map(item => separaDoPlano(item.coberturas))
  for (const cob in coberturas) {
    if ({}.hasOwnProperty.call(coberturas, cob)) {
      coberturas[cob].map(x => rows.push(x))
    }
  }

  rows.sort(sortOrdenacao)
  // console.log(rows)
  const classes = useStyles()
  return (
    <div className={classes.table}>
      <Table responsive="md">
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
                      onClick={e => props.mostraValor(cobertura)}
                    />
                  </td>
                  <td className={classes.alignRight}>
                    {cobertura.mostraValor ? cobertura.premio : "0,00"}
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <Input
                      value={
                        cobertura.capital === 0
                          ? "0.00"
                          : `${cobertura.capital}`
                      }
                      onChange={e => props.alteraCapital(cobertura, e)}
                    />
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${"top"}`}>Tooltip</Tooltip>
                      }
                    >
                      <HelpIcon style={{ fontSize: 18 }} />
                    </OverlayTrigger>
                  </td>
                  <td className={classes.alignRight}>
                    {cobertura.premio ? cobertura.premio : "0,00"}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
