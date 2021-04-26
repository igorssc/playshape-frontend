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
  value.replace(/[^\d]/g, '')

  if (value.length == 10) {
    return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else if (value.length == 11) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else {
    return value
  }
}

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
