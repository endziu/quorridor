module.exports = function (obj, arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] && (arr[i].name === obj.name)) {
      arr.splice(i, 1)
    }
  }
  return arr
}
