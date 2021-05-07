/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const styles = {
  container: () => ({
    paddingTop: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "1200px"
  })
}

export default function TabelaList(props) {
  const { Header, Rows } = props

  const pageButtonRenderer = ({
    page,
    active,
    disabled,
    title,
    onPageChange
  }) => {
    const handleClick = e => {
      e.preventDefault()
      onPageChange(page)
    }
    return (
      <li className="page-item">
        <a href="#" onClick={handleClick}>
          {page}
        </a>
      </li>
    )
  }

  const options = {
    pageButtonRenderer
  }

  return (
    <Row style={styles.container()}>
      <Col>
        <Row>
          <Col md={10}>
            <h2>Listagem de Cotações</h2>
          </Col>
          <Col>
            <Link to="/cotacao/form">
              <Button>Nova cotação</Button>
            </Link>
          </Col>
        </Row>
        <pageButtonRenderer />

        <paginationFactory />
        <BootstrapTable
          bootstrap4
          bordered
          striped
          responsive
          keyField="id"
          data={Rows}
          columns={Header}
          pagination={paginationFactory({
            options,
            showTotal: true,
            sizePerPage: 25,
            pageStartIndex: 1,
            prePageText: "Prev",
            nextPageText: "Next",
            firstPageText: "First",
            lastPageText: "Last",
            paginationPosition: "right"
          })}
          filter={filterFactory()}
        />
      </Col>
    </Row>
  )
}
