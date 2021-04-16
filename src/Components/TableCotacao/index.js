/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable-next-line react/prop-types */

import "bootstrap/dist/css/bootstrap.min.css"
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap"
import Table from "react-bootstrap/Table"

import React from "react"
import { makeStyles } from "@material-ui/core/styles"
// import Table from "@material-ui/core/Table"
// import TableBody from "@material-ui/core/TableBody"
// import TableCell from "@material-ui/core/TableCell"
// import TableContainer from "@material-ui/core/TableContainer"
// import TableHead from "@material-ui/core/TableHead"
// import TableRow from "@material-ui/core/TableRow"
import HelpIcon from "@material-ui/icons/Help"
import { Input } from "./style"

// import Paper from "@material-ui/core/Paper"

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

export default function TabelaCotacao(props) {
  // console.log(props)
  const rows = ["cds", "teste"]
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
          {rows.map(row => (
            <tr key={row.index}>
              <td>teste</td>
              <td>
                <Input type="number" />
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip id={`tooltip-${"top"}`}>Tooltip</Tooltip>}
                >
                  <HelpIcon style={{ fontSize: 18 }} />
                </OverlayTrigger>
              </td>
              <td className={classes.alignRight}>0,00</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
