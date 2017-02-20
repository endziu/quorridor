var inRange = function (value, min, max) {
  return value >= Math.min(min, max) && value <= Math.max(min, max)
}

module.exports = inRange
