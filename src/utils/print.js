export function printTable(tableId) {
  let css = `@media print{
	  	#${tableId} {
	  		display: table;
	  	}
  	}`,
    body = document.body,
    style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  body.appendChild(style)
  window.print()
  body.removeChild(style)
}
