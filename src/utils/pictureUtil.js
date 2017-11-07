const IS_MOBILE = window.innerWidth < 768,
      SUFFIX = "?thumbnail=small"
export function shrink(src,onlyShrinkOnMobile){
  let imgSrc
  if(onlyShrinkOnMobile && (!IS_MOBILE)){
    imgSrc = src
  }else{
    imgSrc = src + SUFFIX
  }
  return imgSrc
}
