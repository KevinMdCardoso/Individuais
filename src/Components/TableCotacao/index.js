/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable-next-line react/prop-types */

import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import HelpIcon from "@material-ui/icons/Help"
import { Input } from "./style"
// import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles({
  table: {
    width: "100%",
    borderTop: "1px solid #dee2e6"
  },
  headerName: {
    width: "33%",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  headerValue: {
    width: "50%",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  headerPremio: {
    width: "17%",
    fontWeight: "bold",
    fontSize: "1rem"
  },
  icon: {
    color: "RGB(0, 0, 0) !important",
    marginRight: "30px"
  },
  mesmaLinha: {
    display: "flex",
    alignItems: "center"
  }
})

export default function TabelaCotacao(props) {
  console.log(props)
  const rows = ["cds", "teste"]
  const classes = useStyles()
  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerName}>Nome</TableCell>
            <TableCell className={classes.headerValue}>
              Capital Segurado (R$)
            </TableCell>
            <TableCell className={classes.headerPremio}>Prêmio (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.index}>
              <TableCell>teste</TableCell>
              <TableCell className={classes.mesmaLinha}>
                <Input type="number" />
                <HelpIcon style={{ fontSize: 22 }} />
              </TableCell>
              <TableCell>R$ 0,00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
