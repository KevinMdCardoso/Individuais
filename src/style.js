import styled from "styled-components"

export const Headers = styled.div`
  width: 100%;
  background-color: #343a40 !important;

  height: 56px;
  font-weight: 600;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;

  a {
    white-space: nowrap;
    text-decoration: none;
    color: white;
    font-size: 1rem;
    padding: 8px;
    font-weight: 400;
    svg {
      margin-right: 5px;
    }
  }
`
