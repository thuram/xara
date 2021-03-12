export const dataMapper = (data) => {
  let total = 0

  const results = data.map((item) => {
    total += item.frequencia

    return {
      period: item.periodo
        .replace('0[', '0')
        .replace('[', '')
        .replace(',', ' até '),
      total: Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(
        item.frequencia
      )
    }
  })

  return {
    results,
    total: Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(total)
  }
}
