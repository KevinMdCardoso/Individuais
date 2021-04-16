import React, { Component } from "react"
import Button from "@material-ui/core/Button"
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

export default class cotacao extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peculio: [],
      seguro: [],
      servico: [],
      message: "",
      isLoading: false
    }
  }

  componentDidMount() {
    const peculio = []
    console.log("grgeata")
    let seguro = []
    const servico = []
    const response = Api.get(`multicalculo/listaplanosativos`).then(
      response => {
        console.log(response)
        for (const plano in response.data) {
          if (response.data[plano].tipo.nome === "Seguro") {
            seguro = [...seguro, response.data[plano]]
          }

          // switch (response.data[plano].tipo.nome) {
          //   case "Seguro":
          //     seguro = [...seguro, response.data[plano]]
          //     break
          //   case "peculio":
          //     peculio = [...peculio, response.data[plano]]
          //     break
          //   case "servico":
          //     servico = [...servico, response.data[plano]]
          //     break
          // }
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

  render() {
    const { seguro } = this.state
    console.log(seguro)
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
                <Input />
              </Coluna4>
              <Coluna4>
                <Label>CPF</Label>
                <Input />
              </Coluna4>
            </Linha>
            <Linha>
              <Coluna4>
                <Label>Data de Nascimento</Label>
                <Input type="date" />
              </Coluna4>
              <Coluna4>
                <Label>Idade</Label>
                <Input type="number" />
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
                <Input />
              </Coluna4>
            </Linha>
            <Linha>
              <TabelaCotacao
                colunaCapital="Benefício (R$)"
                colunaPremio="Contribuição (R$)"
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
                <Input />
              </Coluna4>
            </Linha>
            <Linha>
              <TabelaCotacao
                colunaCapital="Capital Segurado (R$)"
                colunaPremio="Prêmio (R$)"
              />
            </Linha>
            <CabecalhoTipoPlano>Serviço</CabecalhoTipoPlano>
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
                <Input />
              </Coluna4>
            </Linha>
            <Linha>
              <TabelaCotacao
                colunaCapital="Contratar Serviço"
                colunaPremio="Valor (R$)"
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
