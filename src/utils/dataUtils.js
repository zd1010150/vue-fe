export const mapStatusIdToName = (id) => {
  switch (id) {
    case 0:
      return '待审核'
    case 1:
      return '审核成功'
    case 2:
      return '已拒绝'
    default:
      return '-'
  }
}
