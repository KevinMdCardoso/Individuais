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
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles({
  table: {
    Width: "100%"
  },
  centraliza: {
    textAlign: "center"
  },
  svg: {
    display: "flex",
    margin: "auto",
    width: "50px",
    height: "40px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  svgNoHover: {
    display: "flex",
    margin: "auto",
    width: "50px",
    height: "40px"
  },
  aumentaNome: {
    width: "66%"
  }
})

export default function TabelaCotacao(props) {
  console.log(props)
  const rows = []
  const classes = useStyles()
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.aumentaNome}> Nome</TableCell>
            <TableCell>Capital Segurado</TableCell>
            <TableCell>Premio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.index}>
              <TableCell />
              <TableCell>{row.nome}</TableCell>
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
