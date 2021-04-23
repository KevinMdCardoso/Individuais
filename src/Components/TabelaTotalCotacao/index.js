/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable-next-line react/prop-types */

import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  linhaValores: {
    textAlign: "end",
    fontWeight: "bold",
    color: "#3c763d"
  }
})

export default function TabelaTotalCotacao(props) {
  const classes = useStyles()
  return (
    <div className={classes.table}>
      <Table responsive="md">
        <thead>
          <tr>
            <th>Prêmio Líquido (R$)</th>
            <th>IOF (R$)</th>
            <th>Prêmio Bruto (R$)</th>
            <th>Valor de Serviço (R$)</th>
            <th>Valor Comissão Total (R$)</th>
            <th>Valor Total (R$)</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.linhaValores}>
            <th>{props.premioLiquido > 0 ? props.premioLiquido : "0,00"}</th>
            <th>{props.Iof > 0 ? props.Iof : "0,00"}</th>
            <th>{props.premioBruto > 0 ? props.premioBruto : "0,00"}</th>
            <th>{props.valorServico > 0 ? props.valorServico : "0,00"}</th>
            <th>{props.valorComissao > 0 ? props.valorComissao : "0,00"}</th>
            <th>{props.valorTotal > 0 ? props.valorTotal : "0,00"}</th>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
