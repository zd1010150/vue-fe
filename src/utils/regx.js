export default {
  password:/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  positiveFloatMoney : /^(0|([1-9][0-9]*))(\.?)\d{0,2}$/
}
