import React, { Component } from "react"

import TableList from "../../../Components/TableList"

export default class cotacaoList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const products = [
      {
        id: 1,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 2,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 1348.71
      },
      {
        id: 3,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 4,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 5,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 6,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 7,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 73.79
      },
      {
        id: 8,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 9,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 10,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 11,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 12,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 13,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 14,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 15,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 16,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 17,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 73.79
      },
      {
        id: 18,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 19,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 20,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 73.79
      },
      {
        id: 21,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 22,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 23,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 24,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 25,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 26,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 27,
        nome: `Item nome 1`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      },
      {
        id: 28,
        nome: `Item nome 2`,
        cpf: "042.125.460-27",
        dataCotacao: "31/03/2021",
        valorTotal: 2100
      }
    ]

    const columns = [
      {
        dataField: "id",
        text: "Número da Cotação",
        sort: true
      },
      {
        dataField: "nome",
        text: "Nome",
        sort: true
      },
      {
        dataField: "cpf",
        text: "CPF",
        sort: true
      },
      {
        dataField: "dataCotacao",
        text: "Data da Cotação",
        sort: true
      },
      {
        dataField: "valorTotal",
        text: "Valor Total",
        sort: true
      },
      {
        dataField: "acoes",
        text: "Ações"
      }
    ]
    return (
      <>
        <TableList Header={columns} Rows={products} />
      </>
    )
  }
}
