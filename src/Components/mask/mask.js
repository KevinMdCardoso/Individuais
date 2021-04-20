export const cpfMask = value => {
  return value // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export const cnpjMask = value => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
}

export const cepMask = value => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
}
export const numeroInteiroMask = value => {
  return value.replace(/\D/g, "").replace(".", "")
}

export const numeroMask = value => {
  let numero = value.replace(/\D/g, "").replace(".", "")
  // console.log(value)
  if (numero < 99999) {
    numero = numero.replace(/^(\d{1,3})(\d{2})/, "$1,$2")
  } else if (numero < 99999999) {
    numero = numero.replace(/^(\d{1,3})(\d{3})(\d{2})/, "$1.$2,$3")
  } else if (numero < 99999999999) {
    numero = numero.replace(/^(\d{1,3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3,$4")
  } else {
    numero = numero.replace(
      /^(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3.$4,$5"
    )
  }

  return numero
}

export const telefoneMask = value => {
  let telefone = value
    .replace(/\D/g, "")
    .replace(/^(\d)/, "($1")
    .replace(/(.{3})(\d)/, "$1)$2")
  if (telefone.length === 9) {
    telefone = telefone.replace(/(.{1})$/, "-$1")
  } else if (telefone.length === 10) {
    telefone = telefone.replace(/(.{2})$/, "-$1")
  } else if (telefone.length === 11) {
    telefone = telefone.replace(/(.{3})$/, "-$1")
  } else if (telefone.length === 12) {
    telefone = telefone.replace(/(.{4})$/, "-$1")
  } else if (telefone.length > 12) {
    telefone = telefone.replace(/(.{4})$/, "-$1")
  }
  return telefone
}
