import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import InputMask from "react-input-mask"
import {
  Body,
  Container,
  Headers,
  Input,
  InputReadOnly,
  Label,
  Coluna2,
  Coluna4,
  Linha,
  Risco,
  CabecalhoForm,
  CabecalhoTipoPlano,
  Negrito,
  Select
} from "./style"
import TabelaCotacao from "../../../Components/TableCotacao"
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
      message: "",
      isLoading: false
    }

    this.handlechangeCpf = this.handlechangeCpf.bind(this)
    this.handlechangeData = this.handlechangeData.bind(this)
    this.mostraValor = this.mostraValor.bind(this)
    this.calculaCotacao = this.calculaCotacao.bind(this)
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
    this.setState({ selecionado: e.target.value })
  }

  handlechangeCpf(e) {
    this.setState({ cpfCliente: cpfMask(e.target.value) })
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
      this.setState({ dataNascimento, idade })
    }
  }

  handlechangeComisaoPeculio(e) {
    const value = e.target.value.replace("%", "")
    this.setState({ comisaoPeculio: numeroInteiroMask(value) })
  }

  handlechangeComisaoSeguro(e) {
    const value = e.target.value.replace("%", "")
    this.setState({ comisaoSeguro: numeroInteiroMask(value) })
  }

  handlechangeAgenciamentoPeculio(e) {
    this.setState({ agenciamentoPeculio: e.target.value })
  }

  handlechangeAgenciamentoSeguro(e) {
    this.setState({ agenciamentoSeguro: e.target.value })
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
    this.setState({ seguro })
  }

  handlechangeNomeCliente(e) {
    this.setState({ nomeCliente: e.target.value.toUpperCase() })
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
          auxCobertura.plano = seguro[plano]
          cotacaoCobertura.push({
            cobertura_id: seguro[plano].coberturas[cobertura].id,
            capital: seguro[plano].coberturas[cobertura].capital,
            cobertura: auxCobertura,
            cotacao_plano_valor: planoValor
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
          auxCobertura.plano = peculio[plano]
          cotacaoCobertura.push({
            cobertura_id: peculio[plano].coberturas[cobertura].id,
            capital: peculio[plano].coberturas[cobertura].capital,
            cobertura: auxCobertura,
            cotacao_plano_valor: planoValor
          })
        }
      }
    }

    const json = {
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
    }

    console.log(json)
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
    this.setState({ servico })
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
      selecionadoFuneral,
      codigoCorretor,
      nomeCorretor
    } = this.state
    return (
      <>
        <Headers>Multicalculo</Headers>
        <Body>
          <Container>
            <Linha>
              <Coluna4>
                <Label>Buscar Cotação por Número</Label>
                <Input type="number" />
              </Coluna4>
              <Coluna2>
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  style={{ backgroundColor: "#007bff", color: "#fff" }}
                >
                  Obter Cotação
                </Button>
              </Coluna2>
            </Linha>
            <Risco />
            <CabecalhoForm>Cálculo de Cotação</CabecalhoForm>
            <Linha>
              <Coluna4>
                <Label>Nome do Corretor</Label>
                <InputReadOnly readOnly="true" value={nomeCorretor} />
              </Coluna4>
              <Coluna4>
                <Label>Código do Corretor</Label>
                <InputReadOnly readOnly="true" value={codigoCorretor} />
              </Coluna4>
            </Linha>
            <Linha>
              <Coluna4>
                <Label>Nome</Label>
                <Input
                  upper="true"
                  value={nomeCliente}
                  onChange={this.handlechangeNomeCliente}
                />
              </Coluna4>
              <Coluna4>
                <Label>CPF</Label>
                <Input
                  maxLength="14"
                  value={cpfCliente}
                  onChange={this.handlechangeCpf}
                />
              </Coluna4>
            </Linha>
            <Linha>
              <Coluna4>
                <Label>Data de Nascimento</Label>
                <Input type="date" onChange={this.handlechangeData} />
              </Coluna4>
              <Coluna4>
                <Label>Idade</Label>
                <InputReadOnly type="number" value={idade} />
              </Coluna4>
            </Linha>
            <CabecalhoTipoPlano>Pecúlio</CabecalhoTipoPlano>
            <Linha>
              <Coluna4>
                <Label>Percentual de Agenciamento</Label>
                <Select onChange={this.handlechangeAgenciamentoPeculio}>
                  <option select> </option>
                  <option value="0">0%</option>
                  <option value="100">100%</option>
                  <option value="150">150%</option>
                  <option value="200">200%</option>
                </Select>
              </Coluna4>
              <Coluna4>
                <Label>Percentual de Comissão</Label>
                <Input
                  value={`${comisaoPeculio}%`}
                  onChange={this.handlechangeComisaoPeculio}
                  alinhamentoDireita="true"
                />
              </Coluna4>
            </Linha>
            <Linha>
              <TabelaCotacao
                colunaCapital="Benefício (R$)"
                colunaPremio="Contribuição (R$)"
                data={peculio}
                checkBox="false"
                tipoPlano="Pecúlio"
                alteraCapital={this.handlechangeAlteraCapital}
              />
            </Linha>
            <CabecalhoTipoPlano>Seguro</CabecalhoTipoPlano>
            <Linha>
              <Coluna4>
                <Label>Percentual de Agenciamento</Label>
                <Select onChange={this.handlechangeAgenciamentoSeguro}>
                  <option select> </option>
                  <option value="0">0%</option>
                  <option value="100">100%</option>
                  <option value="150">150%</option>
                  <option value="200">200%</option>
                </Select>
              </Coluna4>
              <Coluna4>
                <Label>Percentual de Comissão</Label>
                <Input
                  value={`${comisaoSeguro}%`}
                  onChange={this.handlechangeComisaoSeguro}
                  alinhamentoDireita="true"
                />
              </Coluna4>
            </Linha>
            <Linha>
              <TabelaCotacao
                colunaCapital="Capital Segurado (R$)"
                colunaPremio="Prêmio (R$)"
                data={seguro}
                checkBox="false"
                tipoPlano="Seguro"
                alteraCapital={this.handlechangeAlteraCapital}
                alteraSelecionado={this.handlechangeAlteraSelecionado}
                selecionadoFuneral={selecionadoFuneral}
              />
            </Linha>
            <CabecalhoTipoPlano>Serviço</CabecalhoTipoPlano>
            <Linha>
              <TabelaCotacao
                colunaCapital="Contratar Serviço"
                colunaPremio="Valor (R$)"
                data={servico}
                checkBox="true"
                mostraValor={this.mostraValor}
                tipoPlano="Serviço"
              />
            </Linha>
            <Linha>
              <Coluna2>
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  style={{ backgroundColor: "#007bff", color: "#fff" }}
                  onClick={this.calculaCotacao}
                >
                  Calcular
                </Button>
              </Coluna2>
            </Linha>
          </Container>
        </Body>
      </>
    )
  }
}
