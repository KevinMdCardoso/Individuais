import styled from "styled-components"

export const Body = styled.div`
  display: flex;
  color: black;
  font-weight: 400;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 1140px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`
export const Container = styled.div`
  width: 100%;
`
export const Headers = styled.div`
  width: 100%;
  background-color: black;
  color: white;
  height: 50px;
  font-weight: 600;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`
export const Input = styled.input`
  display: block;
  width: 70%;
  height: 38px;
  padding: 6px 12px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-transform: ${props => (props.upper ? "uppercase" : "none")};
  text-align: ${props => (props.alinhamentoDireita ? "right" : "left")};
`
export const InputReadOnly = styled.input`
  display: block;
  width: 70%;
  height: 38px;
  padding: 6px 12px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: #e9ecef;
`
export const Select = styled.select`
  display: block;
  width: 75%;
  height: 37px;
  padding: 6px 12px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const Coluna = styled.div`
  padding-right: 5px;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: baseline;
  margin-bottom: 16px;
`

export const Coluna2 = styled.div`
  width: 16.66%;
  padding-right: 5px;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: baseline;
  margin-bottom: 16px;
`
export const Coluna4 = styled.div`
  width: 33.33%;
  padding-right: 5px;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: baseline;
  margin-bottom: 16px;
`

export const Linha = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
`

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
`

export const Risco = styled.hr`
  ox-sizing: content-box;
  height: 0;
  overflow: visible;
`
export const CabecalhoForm = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
`

export const CabecalhoTipoPlano = styled.h2`
  font-weight: bold;
  font-size: 18px;
  line-height: 1.2;
  margin-top: 0;
  padding-top: 30px;
`
export const Negrito = styled.h2`
  font-weight: bold;
  font-size: 18px;
  line-height: 1.2;
  margin-top: 0;
`
