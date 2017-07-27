export function printDiv(divId) {
  let headstr = "<html><head><title></title></head><body>";
  let footstr = "</body>";
  let newstr = document.querySelector(divId).innerHTML;
  let oldstr = document.body.innerHTML;
  document.body.innerHTML = headstr + newstr + footstr;
  window.print();
  document.body.innerHTML = oldstr;
  return false;
}
