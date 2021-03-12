export const dataMapper = (data) => {
  return data.map((item) => ({
    period: item.periodo
      .replace('0[', '0')
      .replace('[', '')
      .replace(',', ' até '),
    total: Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(
      item.frequencia
    )
  }))
}
