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
import { cpfMask, numeroMask } from "../../../Components/mask/mask"

export default class cotacao extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peculio: [],
      seguro: [],
      servico: [],
      cpfCliente: "",
      comisaoPeculio: "0%",
      comisaoSeguro: "0%",
      message: "",
      isLoading: false
    }

    this.handlechangeCpf = this.handlechangeCpf.bind(this)
    this.handlechangeData = this.handlechangeData.bind(this)
    this.mostraValor = this.mostraValor.bind(this)
    this.handlechangeComisaoPeculio = this.handlechangeComisaoPeculio.bind(this)
    this.handlechangeComisaoSeguro = this.handlechangeComisaoSeguro.bind(this)
    this.handlechangeAlteraCapital = this.handlechangeAlteraCapital.bind(this)
  }

  componentDidMount() {
    let servico = []
    let peculio = []
    let seguro = []

    const response = Api.get(`multicalculo/listaplanosativos`).then(
      response => {
        // console.log("Retorno:", response.data)
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
    this.setState({ comisaoPeculio: `${numeroMask(value)}%` })
  }

  handlechangeComisaoSeguro(e) {
    const value = e.target.value.replace("%", "")
    this.setState({ comisaoSeguro: `${numeroMask(value)}%` })
  }

  handlechangeAlteraCapital(altCobertura, e) {
    const { seguro } = this.state

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
    console.log(seguro)
    this.setState({ seguro })
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

  render() {
    const {
      seguro,
      peculio,
      servico,
      cpfCliente,
      idade,
      dataNascimento,
      comisaoPeculio,
      comisaoSeguro
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
                <InputReadOnly
                  readOnly="true"
                  value="PROCULUS ADM. E CORRETORA DE SEGUROS DE VIDA LTDA"
                />
              </Coluna4>
              <Coluna4>
                <Label>Código do Corretor</Label>
                <InputReadOnly readOnly="true" value="FC0192" />
              </Coluna4>
            </Linha>
            <Linha>
              <Coluna4>
                <Label>Nome</Label>
                <Input upper="true" />
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
                <Select>
                  <option select> </option>
                  <option value="valor1">0%</option>
                  <option value="valor2">100%</option>
                  <option value="valor3">150%</option>
                  <option value="valor4">200%</option>
                </Select>
              </Coluna4>
              <Coluna4>
                <Label>Percentual de Comissão</Label>
                <Input
                  value={comisaoPeculio}
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
                <Select>
                  <option select> </option>
                  <option value="valor1">0%</option>
                  <option value="valor2">100%</option>
                  <option value="valor3">150%</option>
                  <option value="valor4">200%</option>
                </Select>
              </Coluna4>
              <Coluna4>
                <Label>Percentual de Comissão</Label>
                <Input
                  value={comisaoSeguro}
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
