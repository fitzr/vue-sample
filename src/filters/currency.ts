const digitsRE = /(\d{3})(?=\d)/g

export default function currency (value: string, currency: string | null, decimals: number | null) {
  const v = parseFloat(value)
  if (!isFinite(v) || (!value && v !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  const stringified = Math.abs(v).toFixed(decimals)
  const _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  const i = _int.length % 3
  const head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  const _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  const sign = v < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}
