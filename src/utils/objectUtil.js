const assignToObject = (obj, src) => {
  let result = {}
  _.filter(src, function (key, index) {
    if ((!_.isUndefined(obj[index])) && (!_.isUndefined(src[index]))) {
      result[index] = src[index]
    } else if ((!_.isUndefined(obj[index])) && (_.isUndefined(src[index]))) {
      result[index] = obj[index]
    }
  })
  return result
}
export { assignToObject }
