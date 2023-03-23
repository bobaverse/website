export const random = (min: number, max: number) => {
  const random = Math.random()
  min = Math.round(min)
  max = Math.floor(max)

  return Math.floor(random * (max - min) + min)
}
