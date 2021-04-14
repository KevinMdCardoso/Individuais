import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import {
  Body,
  Container,
  Headers,
  Input,
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

export default class cotacao extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
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
                  color="primary"
                  href="#contained-buttons"
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
                <Input />
              </Coluna4>
              <Coluna4>
                <Label>Código do Corretor</Label>
                <Input />
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
              <TabelaCotacao />
            </Linha>
            <CabecalhoTipoPlano>Seguro</CabecalhoTipoPlano>
            <Linha>
              <Coluna4>
                <Label>Percentual de Agenciamento</Label>
                <Select>
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
              <TabelaCotacao />
            </Linha>
            <CabecalhoTipoPlano>Serviço</CabecalhoTipoPlano>
            <Linha>
              <Coluna4>
                <Label>Percentual de Agenciamento</Label>
                <Select>
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
              <TabelaCotacao />
            </Linha>
            <Linha>
              <Coluna2>
                <Button
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
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
