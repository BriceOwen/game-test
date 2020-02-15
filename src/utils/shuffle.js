const shuffle = arr => {
  let currentIndex = arr.length
  let temporaryValue
  let randomIndex = 0
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = temporaryValue
  }
  return arr
}

export { shuffle }
