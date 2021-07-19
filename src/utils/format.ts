export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatDate = (value: number | Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(value)
}

export const formatPhone = (value: string) => {
  const mask = value.replace(/\D/g, '').replace(/^0/, '')
  if (mask.length > 10) {
    return mask.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3')
  } else if (mask.length > 5) {
    return mask.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3')
  } else if (mask.length > 2) {
    return mask.replace(/^(\d\d)(\d{0,5})/, '($1) $2')
  } else {
    return mask.replace(/^(\d*)/, '($1')
  }
}

export const formatCpf = (value: string) =>
  value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada

export const formatAddress = ({
  street,
  number,
  neighborhood,
  city,
  state,
  zipCode
}: {
  street?: string
  number?: number
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
}) => {
  return `${street}${number && ','} ${number}${
    neighborhood && ','
  } ${neighborhood}${city && ','} ${city} ${state && '-'} ${state}${
    zipCode && ','
  } ${zipCode}`
}
