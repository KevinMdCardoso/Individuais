import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Col, Form, Button } from "react-bootstrap"
import { Risco, CabecalhoForm, CabecalhoTipoPlano, Select } from "./style"
import TabelaCotacao from "../../../Components/TableCotacao"
import TabelaTotalCotacao from "../../../Components/TabelaTotalCotacao"
import Api from "../../../Services/api"
import {
  cpfMask,
  numeroMask,
  numeroInteiroMask
} from "../../../Components/mask/mask"

export default class cotacao extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peculio: [],
      seguro: [],
      servico: [],
      selecionadoFuneral: 0,
      cpfCliente: "",
      nomeCliente: "",

      comisaoPeculio: 0,
      agenciamentoPeculio: 0,
      comisaoSeguro: 0,
      agenciamentoSeguro: 0,

      codigoCorretor: "",
      nomeCorretor: "",
      emailCorretor: "",
      filialCorretor: "",
      documentoCorretor: "",
      numeroSusepCorretor: "",

      premioBruto: 0,
      premioLiquido: 0,
      premioMinimo: 0,
      valorComissaoTotal: 0,
      valorServico: 0,
      valorTotal: 0,
      iof: 0,

      cotacaoCalculada: null,

      dataCotacao: null,
      numeroCotacao: null,
      idCotacao: null,

      message: "",
      isLoading: false,
      isCalculado: false,
      isGerado: false,
      isEdicao: true
    }

    this.handlechangeCpf = this.handlechangeCpf.bind(this)
    this.handlechangeData = this.handlechangeData.bind(this)
    this.mostraValor = this.mostraValor.bind(this)
    this.calculaCotacao = this.calculaCotacao.bind(this)
    this.GerarCotacao = this.GerarCotacao.bind(this)
    this.handlechangeComisaoPeculio = this.handlechangeComisaoPeculio.bind(this)
    this.handlechangeComisaoSeguro = this.handlechangeComisaoSeguro.bind(this)
    this.handlechangeAlteraCapital = this.handlechangeAlteraCapital.bind(this)
    this.handlechangeNomeCliente = this.handlechangeNomeCliente.bind(this)
    this.handlechangeAgenciamentoPeculio = this.handlechangeAgenciamentoPeculio.bind(
      this
    )
    this.handlechangeAgenciamentoSeguro = this.handlechangeAgenciamentoSeguro.bind(
      this
    )
    this.handlechangeAlteraSelecionado = this.handlechangeAlteraSelecionado.bind(
      this
    )
  }

  componentDidMount() {
    let servico = []
    let peculio = []
    let seguro = []

    const codigoCorretor = "FC0192"

    Api.get(`multicalculo/listaplanosativos`).then(
      response => {
        for (const plano in response.data) {
          if (response.data[plano].tipo.nome === "Serviço") {
            if (Object.prototype.hasOwnProperty.call(response.data, plano)) {
              for (const cobertura in response.data[plano].coberturas) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    response.data[plano].coberturas,
                    cobertura
                  )
                ) {
                  response.data[plano].coberturas[cobertura].mostraValor = false
                }
              }
            }
            servico = [...servico, response.data[plano]]
          } else if (response.data[plano].tipo.nome === "Seguro") {
            if (Object.prototype.hasOwnProperty.call(response.data, plano)) {
              for (const cobertura in response.data[plano].coberturas) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    response.data[plano].coberturas,
                    cobertura
                  )
                ) {
                  response.data[plano].coberturas[cobertura].capital = 0
                  response.data[plano].coberturas[
                    cobertura
                  ].toolTip = this.pegaMsgTooltip(
                    response.data[plano].coberturas[cobertura]
                  )
                }
              }
            }
            seguro = [...seguro, response.data[plano]]
          } else if (response.data[plano].tipo.nome === "Pecúlio") {
            if (Object.prototype.hasOwnProperty.call(response.data, plano)) {
              for (const cobertura in response.data[plano].coberturas) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    response.data[plano].coberturas,
                    cobertura
                  )
                ) {
                  response.data[plano].coberturas[cobertura].capital = 0
                  response.data[plano].coberturas[
                    cobertura
                  ].toolTip = this.pegaMsgTooltip(
                    response.data[plano].coberturas[cobertura]
                  )
                }
              }
            }
            peculio = [...peculio, response.data[plano]]
          }
        }
        this.setState({ peculio, seguro, servico })
      },
      error => {
        if (error === 404) {
          this.setState({
            message: "Não foi possível conectar ao banco de dados"
          })
          this.setState({ isLoading: false })
        } else {
          this.setState({
            message: "Não foi possível conectar ao banco de dados"
          })
          this.setState({ isLoading: false })
        }
        // console.log(error)
      }
    )

    Api.get(`multicalculo/obterdadoscorretor/${codigoCorretor}`).then(
      response => {
        if (response.data) {
          this.setState({
            codigoCorretor: response.data.codigo,
            nomeCorretor: response.data.nome,
            emailCorretor: response.data.email,
            filialCorretor: response.data.filial,
            documentoCorretor: response.data.documento,
            numeroSusepCorretor: response.data.nro_registro_susep
          })
        }
      },
      error => {
        if (error === 404) {
          this.setState({
            message: "Não foi possível conectar ao banco de dados"
          })
          this.setState({ isLoading: false })
        } else {
          this.setState({
            message: "Não foi possível conectar ao banco de dados"
          })
          this.setState({ isLoading: false })
        }
      }
    )

    this.setState({ isGerado: false, isCalculado: false, isEdicao: true })
  }

  handlechangeAlteraSelecionado(e, coberturas) {
    const { seguro, selecionadoFuneral } = this.state
    for (const plano in seguro) {
      if (Object.prototype.hasOwnProperty.call(seguro, plano)) {
        for (const cobertura in seguro[plano].coberturas) {
          if (
            Object.prototype.hasOwnProperty.call(
              seguro[plano].coberturas,
              cobertura
            ) &&
            seguro[plano].coberturas[cobertura].id ===
              coberturas[selecionadoFuneral].id
          ) {
            seguro[plano].coberturas[cobertura].capital = `${numeroMask(
              "0,00"
            )}`
          }
        }
      }
    }
    this.setState({ isCalculado: false, selecionado: e.target.value })
  }

  handlechangeCpf(e) {
    this.setState({ isCalculado: false, cpfCliente: cpfMask(e.target.value) })
  }

  handlechangeData(e) {
    const dataNascimento = new Date(e.target.value)
    const agora = new Date(Date.now())
    if (
      dataNascimento.getFullYear() > 1920 &&
      dataNascimento.getFullYear() <= agora.getFullYear()
    ) {
      let idade = agora.getFullYear() - dataNascimento.getFullYear()

      if (agora.getMonth() < dataNascimento.getMonth()) {
        idade -= 1
      } else if (
        agora.getMonth() === dataNascimento.getMonth() &&
        agora.getDate() <= dataNascimento.getDate()
      ) {
        idade -= 1
      }
      this.setState({ isCalculado: false, dataNascimento, idade })
    }
  }

  handlechangeComisaoPeculio(e) {
    this.setState({
      isCalculado: false,
      comisaoPeculio: numeroInteiroMask(e.target.value.replace("%", ""))
    })
  }

  handlechangeComisaoSeguro(e) {
    this.setState({
      isCalculado: false,
      comisaoSeguro: numeroInteiroMask(e.target.value.replace("%", ""))
    })
  }

  handlechangeAgenciamentoPeculio(e) {
    this.setState({ isCalculado: false, agenciamentoPeculio: e.target.value })
  }

  handlechangeAgenciamentoSeguro(e) {
    this.setState({ isCalculado: false, agenciamentoSeguro: e.target.value })
  }

  handlechangeAlteraCapital(altCobertura, e) {
    const { seguro, peculio } = this.state

    for (const plano in seguro) {
      if (Object.prototype.hasOwnProperty.call(seguro, plano)) {
        for (const cobertura in seguro[plano].coberturas) {
          if (
            Object.prototype.hasOwnProperty.call(
              seguro[plano].coberturas,
              cobertura
            ) &&
            seguro[plano].coberturas[cobertura].id === altCobertura.id
          ) {
            seguro[plano].coberturas[cobertura].capital = `${numeroMask(
              e.target.value
            )}`
          }
        }
      }
    }

    for (const plano in peculio) {
      if (Object.prototype.hasOwnProperty.call(peculio, plano)) {
        for (const cobertura in peculio[plano].coberturas) {
          if (
            Object.prototype.hasOwnProperty.call(
              peculio[plano].coberturas,
              cobertura
            ) &&
            peculio[plano].coberturas[cobertura].id === altCobertura.id
          ) {
            peculio[plano].coberturas[cobertura].capital = `${numeroMask(
              e.target.value
            )}`
          }
        }
      }
    }
    this.setState({ isCalculado: false, seguro })
  }

  handlechangeNomeCliente(e) {
    this.setState({
      isCalculado: false,
      nomeCliente: e.target.value.toUpperCase()
    })
  }

  calculaCotacao() {
    const {
      seguro,
      peculio,
      servico,
      cpfCliente,
      nomeCliente,
      idade,
      dataNascimento,
      comisaoPeculio,
      comisaoSeguro,
      agenciamentoPeculio,
      agenciamentoSeguro,
      codigoCorretor,
      nomeCorretor,
      emailCorretor,
      filialCorretor,
      documentoCorretor,
      numeroSusepCorretor
    } = this.state

    const cotacaoCobertura = []

    for (const plano in seguro) {
      const planoValor = {
        premio_liquido: 0,
        iof: 0,
        premio_bruto: 0,
        agenciamento: agenciamentoSeguro,
        comissao: comisaoSeguro
      }
      for (const cobertura in seguro[plano].coberturas) {
        if (seguro[plano].coberturas[cobertura].capital) {
          const auxCobertura = seguro[plano].coberturas[cobertura]
          const auxPlano = {
            apolice: seguro[plano].apolice,
            ativo: seguro[plano].ativo,
            id: seguro[plano].id,
            nome: seguro[plano].nome,
            ramo: seguro[plano].ramo,
            sub: seguro[plano].sub,
            tipo: seguro[plano].tipo,
            tipo_plano_id: seguro[plano].tipo_plano_id
          }

          auxCobertura.plano = auxPlano

          cotacaoCobertura.push({
            cobertura_id: seguro[plano].coberturas[cobertura].id,
            capital: seguro[plano].coberturas[cobertura].capital
              .replace(".", "")
              .replace(",", "."),
            cobertura: auxCobertura,
            cotacao_plano_valor: planoValor,
            plano: auxPlano,
            plano_id: auxPlano.id
          })
        }
      }
    }

    for (const plano in peculio) {
      const planoValor = {
        premio_liquido: 0,
        iof: 0,
        premio_bruto: 0,
        agenciamento: agenciamentoPeculio,
        comissao: comisaoPeculio
      }
      for (const cobertura in peculio[plano].coberturas) {
        if (peculio[plano].coberturas[cobertura].capital) {
          const auxCobertura = peculio[plano].coberturas[cobertura]
          const auxPlano = {
            apolice: peculio[plano].apolice,
            ativo: peculio[plano].ativo,
            id: peculio[plano].id,
            nome: peculio[plano].nome,
            ramo: peculio[plano].ramo,
            sub: peculio[plano].sub,
            tipo: peculio[plano].tipo,
            tipo_plano_id: peculio[plano].tipo_plano_id
          }
          auxCobertura.plano = auxPlano
          cotacaoCobertura.push({
            cobertura_id: peculio[plano].coberturas[cobertura].id,
            capital: peculio[plano].coberturas[cobertura].capital
              .replace(".", "")
              .replace(",", "."),
            cobertura: auxCobertura,
            cotacao_plano_valor: planoValor,
            plano: auxPlano,
            plano_id: auxPlano.id
          })
        }
      }
    }

    for (const plano in servico) {
      const planoValor = {
        premio_liquido: 0,
        iof: 0,
        premio_bruto: 0,
        agenciamento: 0,
        comissao: 0
      }
      for (const cobertura in servico[plano].coberturas) {
        if (servico[plano].coberturas[cobertura].mostraValor) {
          const auxCobertura = servico[plano].coberturas[cobertura]
          const auxPlano = {
            apolice: servico[plano].apolice,
            ativo: servico[plano].ativo,
            id: servico[plano].id,
            nome: servico[plano].nome,
            ramo: servico[plano].ramo,
            sub: servico[plano].sub,
            tipo: servico[plano].tipo,
            tipo_plano_id: servico[plano].tipo_plano_id
          }
          auxCobertura.plano = auxPlano
          cotacaoCobertura.push({
            cobertura_id: servico[plano].coberturas[cobertura].id,
            premio: servico[plano].coberturas[cobertura].premio,
            cobertura: auxCobertura,
            cotacao_plano_valor: planoValor,
            plano: auxPlano,
            plano_id: auxPlano.id
          })
        }
      }
    }

    Api.post("multicalculo/calculapremio", {
      codigo_corretor: codigoCorretor,
      filial_corretor: filialCorretor,
      nome_corretor: nomeCorretor,
      email_corretor: emailCorretor,
      nro_susep_corretor: numeroSusepCorretor,
      documento_corretor: documentoCorretor,
      idade,
      data_nascimento: dataNascimento,
      data_cotacao: new Date(),
      nome_cliente: nomeCliente,
      cpf_cliente: cpfCliente,
      premio_liquido: 0,
      iof: 0,
      premio_bruto: 0,
      valor_servico: 0,
      valor_comissao_total: 0,
      valor_total: 0,
      premio_minimo: 0,
      cotacao_cobertura: cotacaoCobertura
    }).then(
      response => {
        if (response.data) {
          // Percorre todas as coberturas calculadas e preenche no objeto.
          for (const coberturaCalculada in response.data.cotacao_cobertura) {
            for (const plano in peculio) {
              for (const cobertura in peculio[plano].coberturas) {
                if (
                  peculio[plano].coberturas[cobertura].id ===
                  response.data.cotacao_cobertura[coberturaCalculada]
                    .cobertura_id
                ) {
                  peculio[plano].coberturas[cobertura].premio =
                    response.data.cotacao_cobertura[coberturaCalculada].premio
                }
              }
            }
            for (const plano in seguro) {
              for (const cobertura in seguro[plano].coberturas) {
                if (
                  seguro[plano].coberturas[cobertura].id ===
                  response.data.cotacao_cobertura[coberturaCalculada]
                    .cobertura_id
                ) {
                  seguro[plano].coberturas[cobertura].premio =
                    response.data.cotacao_cobertura[coberturaCalculada].premio
                }
              }
            }
          }

          this.setState({
            isCalculado: true,
            premioBruto: response.data.premio_bruto,
            premioLiquido: response.data.premio_liquido,
            premioMinimo: response.data.premio_minimo,
            iof: response.data.iof,
            valorServico: response.data.valor_servico,
            valorTotal: response.data.valor_total,
            valorComissaoTotal: response.data.valor_comissao_total,
            cotacaoCalculada: response.data
          })
        }
      },
      error => {
        if (error === 404) {
          console.log(error)
        } else {
          console.log(error)
        }
      }
    )
  }

  GerarCotacao() {
    const { cotacaoCalculada } = this.state

    console.log(cotacaoCalculada)
    Api.post("multicalculo/criacotacao", {
      codigo_corretor: cotacaoCalculada.codigo_corretor,
      filial_corretor: cotacaoCalculada.filial_corretor,
      nome_corretor: cotacaoCalculada.nome_corretor,
      email_corretor: cotacaoCalculada.email_corretor,
      nro_susep_corretor: cotacaoCalculada.nro_susep_corretor,
      documento_corretor: cotacaoCalculada.documento_corretor,
      idade: cotacaoCalculada.idade,
      data_nascimento: cotacaoCalculada.data_nascimento,
      data_cotacao: cotacaoCalculada.data_cotacao,
      nome_cliente: cotacaoCalculada.nome_cliente,
      cpf_cliente: cotacaoCalculada.cpf_cliente,
      premio_liquido: cotacaoCalculada.premio_liquido,
      iof: cotacaoCalculada.iof,
      premio_bruto: cotacaoCalculada.premio_bruto,
      valor_servico: cotacaoCalculada.valor_servico,
      valor_comissao_total: cotacaoCalculada.valor_comissao_total,
      valor_total: cotacaoCalculada.valor_total,
      premio_minimo: cotacaoCalculada.premio_minimo,
      cotacao_cobertura: cotacaoCalculada.cotacao_cobertura
    }).then(
      response => {
        if (response.data) {
          console.log(response.data)
          this.setState({
            dataCotacao: response.data.data_cotacao,
            numeroCotacao: response.data.numero_cotacao,
            idCotacao: response.data.id,
            isGerado: true,
            isCalculado: false,
            isEdicao: false
          })
        }
      },
      error => {
        if (error === 404) {
          console.log(error)
        } else {
          console.log(error)
        }
      }
    )
  }

  mostraValor(altCobertura) {
    const { servico } = this.state
    for (const plano in servico) {
      if (Object.prototype.hasOwnProperty.call(servico, plano)) {
        for (const cobertura in servico[plano].coberturas) {
          if (
            Object.prototype.hasOwnProperty.call(
              servico[plano].coberturas,
              cobertura
            ) &&
            servico[plano].coberturas[cobertura].id === altCobertura.id
          ) {
            servico[plano].coberturas[cobertura].mostraValor = !servico[plano]
              .coberturas[cobertura].mostraValor
          }
        }
      }
    }
    this.setState({ isCalculado: false, servico })
  }

  pegaMsgTooltip(cobertura) {
    const seguro = this.state
    let msg = ""
    if (cobertura.capital_maximo > 0 && cobertura.capital_minimo > 0) {
      msg = `Essa cobertura deve respeitar o maximo de R$ ${numeroMask(
        `${cobertura.capital_maximo}00`
      )} e o minimo de R$ ${numeroMask(`${cobertura.capital_minimo}00`)}.`
    } else if (
      cobertura.percentual_maximo_cobertura_principal > 0 &&
      cobertura.percentual_minimo_cobertura_principal > 0
    ) {
      if (
        cobertura.percentual_maximo_cobertura_principal ===
        cobertura.percentual_minimo_cobertura_principal
      ) {
        if (cobertura.percentual_maximo_cobertura_principal === 100) {
          msg = `O valor dessa cobertura deve ser igual a da cobertura
          ${cobertura.cobertura_principal.nome}`
        } else {
          msg = `O valor dessa cobertura deve ser
            ${cobertura.percentual_maximo_cobertura_principal}%
            da cobertura ${cobertura.cobertura_principal.nome}.`
        }
      } else {
        msg = `Essa cobertura deve respeitar a cobertura
          ${cobertura.cobertura_principal.nome}, sendo o
          maximo de ${cobertura.percentual_maximo_cobertura_principal}%
          e o minimo de ${cobertura.percentual_minimo_cobertura_principal}%
          do capital segurado.`
      }
    } else {
      msg = `Essa cobertura tem os valores maximo e minimo pela idade do contratante.`
    }

    return msg
  }

  render() {
    const {
      seguro,
      peculio,
      servico,
      cpfCliente,
      nomeCliente,
      idade,
      comisaoPeculio,
      comisaoSeguro,
      agenciamentoPeculio,
      agenciamentoSeguro,
      selecionadoFuneral,
      codigoCorretor,
      nomeCorretor,
      premioBruto,
      premioLiquido,
      valorComissaoTotal,
      valorServico,
      valorTotal,
      iof,
      isCalculado,
      isEdicao,
      isGerado,
      dataCotacao,
      numeroCotacao
    } = this.state

    const styles = {
      container: () => ({
        paddingTop: "15px",
        paddingLeft: "15px",
        paddingRight: "15px",
        marginRight: "auto",
        marginLeft: "auto"
      })
    }

    return (
      <>
        <Container style={{ marginBottom: "20px" }}>
          <Form style={styles.container()} className="body-content">
            <Form.Row>
              <Col md={4}>
                <Form.Label>Buscar Cotação por Número</Form.Label>
                <Form.Control type="number" placeholder="Número da Cotação" />
              </Col>
              <Col md={2}>
                <Button variant="primary" style={{ marginTop: "31px" }}>
                  Obter Cotação
                </Button>
              </Col>
            </Form.Row>
            <Risco />
            <CabecalhoForm>Cálculo de Cotação</CabecalhoForm>
            {isGerado === true ? (
              <Form.Row style={{ marginBottom: "16px" }}>
                <Col md={4}>
                  <Form.Label>Número da Cotação</Form.Label>
                  <Form.Control readOnly="true" value={numeroCotacao} />
                </Col>
                <Col md={4}>
                  <Form.Label>Data da Cotação</Form.Label>
                  <Form.Control readOnly="true" value={dataCotacao} />
                </Col>
              </Form.Row>
            ) : (
              ""
            )}
            <Form.Row style={{ marginBottom: "16px" }}>
              <Col md={4}>
                <Form.Label>Nome do Corretor</Form.Label>
                <Form.Control readOnly="true" value={nomeCorretor} />
              </Col>
              <Col md={4}>
                <Form.Label>Código do Corretor</Form.Label>
                <Form.Control readOnly="true" value={codigoCorretor} />
              </Col>
            </Form.Row>
            <Form.Row style={{ marginBottom: "16px" }}>
              <Col md={4}>
                <Form.Label>Nome </Form.Label>
                <Form.Control
                  upper="true"
                  value={nomeCliente}
                  onChange={this.handlechangeNomeCliente}
                  readOnly={isGerado}
                />
              </Col>
              <Col md={4}>
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  maxLength="14"
                  value={cpfCliente}
                  onChange={this.handlechangeCpf}
                  readOnly={isGerado}
                />
              </Col>
            </Form.Row>
            <Form.Row style={{ marginBottom: "16px" }}>
              <Col md={4}>
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  onChange={this.handlechangeData}
                  readOnly={isGerado}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Idade</Form.Label>
                <Form.Control readOnly="true" type="number" value={idade} />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={12}>
                <TabelaCotacao
                  NomeTipoPlano="Pecúlio"
                  colunaCapital="Benefício (R$)"
                  colunaPremio="Contribuição (R$)"
                  data={peculio}
                  checkBox="false"
                  tipoPlano="Pecúlio"
                  alteraCapital={this.handlechangeAlteraCapital}
                  isGerado={isGerado}
                  handlechangeAgenciamento={
                    this.handlechangeAgenciamentoPeculio
                  }
                  handlechangeComisao={this.handlechangeComisaoPeculio}
                  comisao={comisaoPeculio}
                  agenciamento={agenciamentoPeculio}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={12}>
                <TabelaCotacao
                  NomeTipoPlano="Seguro"
                  colunaCapital="Capital Segurado (R$)"
                  colunaPremio="Prêmio (R$)"
                  data={seguro}
                  checkBox="false"
                  tipoPlano="Seguro"
                  alteraCapital={this.handlechangeAlteraCapital}
                  alteraSelecionado={this.handlechangeAlteraSelecionado}
                  selecionadoFuneral={selecionadoFuneral}
                  isGerado={isGerado}
                  handlechangeAgenciamento={this.handlechangeAgenciamentoSeguro}
                  handlechangeComisao={this.handlechangeComisaoSeguro}
                  comisao={comisaoSeguro}
                  agenciamento={agenciamentoSeguro}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={12}>
                <TabelaCotacao
                  NomeTipoPlano="Serviço"
                  colunaCapital="Contratar Serviço"
                  colunaPremio="Valor (R$)"
                  data={servico}
                  checkBox="true"
                  mostraValor={this.mostraValor}
                  tipoPlano="Serviço"
                  isGerado={isGerado}
                  // handlechangeAgenciamento={this.handlechangeAgenciamentoSeguro}
                  // handlechangeComisao={this.handlechangeComisaoSeguro}
                  // comisao={comisaoSeguro}
                  // agenciamento={agenciamentoPeculio}
                />
              </Col>
            </Form.Row>

            {isCalculado || isGerado ? (
              <Form.Row>
                <Col md={12}>
                  <TabelaTotalCotacao
                    premioLiquido={premioLiquido}
                    Iof={iof}
                    premioBruto={premioBruto}
                    valorServico={valorServico}
                    valorComissao={valorComissaoTotal}
                    valorTotal={valorTotal}
                  />
                </Col>
              </Form.Row>
            ) : (
              ""
            )}

            <Form.Row>
              {isEdicao === true ? (
                <Col md={1}>
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    style={{ backgroundColor: "#007bff", color: "#fff" }}
                    onClick={this.calculaCotacao}
                  >
                    Calcular
                  </Button>
                </Col>
              ) : (
                ""
              )}

              {isCalculado === true ? (
                <Col md={2}>
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    style={{ backgroundColor: "#6c757d", color: "#fff" }}
                    onClick={this.GerarCotacao}
                  >
                    Gerar Cotação
                  </Button>
                </Col>
              ) : (
                ""
              )}

              {isGerado === true ? (
                <>
                  <Col md={2}>
                    <Button
                      variant="contained"
                      href="#contained-buttons"
                      style={{ backgroundColor: "#007bff", color: "#fff" }}
                    >
                      Gerar Proposta
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="contained"
                      href="#contained-buttons"
                      style={{ backgroundColor: "#6c757d", color: "#fff" }}
                    >
                      Editar Cotação
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="contained"
                      href="#contained-buttons"
                      style={{ backgroundColor: "#28a745", color: "#fff" }}
                    >
                      Imprimir
                    </Button>
                  </Col>
                </>
              ) : (
                ""
              )}
            </Form.Row>
          </Form>
        </Container>
      </>
    )
  }
}
