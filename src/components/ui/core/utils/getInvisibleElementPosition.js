const getInvisibleElementComputedStyle = ($el) => {//获取元素的宽度
            let $itemClone =$el.cloneNode(true);
            $itemClone.setAttribute('style',`
            	    'visibility': 'hidden';
                    'position': 'absolute';
                    'z-index': '-99999';
                    'left': '99999999px';
                    'top': '0px'`
                );
                document.body.appendChild($itemClone);
                let styles =  window.getComputedStyle($itemClone),result;
                if(styles){
                	result= {
                		width:styles.getPropertyValue('width'),
                		height:styles.getPropertyValue('height')
                	}
                }
            	document.body.removeChild($itemClone);
            	return result;
        }
export default getInvisibleElementComputedStyle;