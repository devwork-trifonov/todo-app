export function createColorGenerator(colors) {
  let count = -1
  let colorsLength = colors.length
  function nextColor() {
    let color
    if (count === colorsLength - 1) {
      count = 0
      color = colors[count]
      return color
    }
    count++
    color = colors[count]
    return color
  }
  function previousColor() {
    let color
    if (count === 0) {
      count = colorsLength - 1
      color = colors[count]
      return color
    }
    count--
    color = colors[count]
    return color
  }
  return [nextColor, previousColor]
}
