const messages = {
    after: (field, [target]) => ` ${field}必須在${target}之後`,
    alpha_dash: (field) => ` ${field}能夠包含字母數字字符，包括破折號、下劃線`,
    alpha_num: (field) => `${field} 只能包含字母數字字符.`,
    alpha_spaces: (field) => ` ${field} 只能包含字母字符，包括空格.`,
    alpha: (field) => ` ${field} 只能包含字母字符.`,
    before: (field, [target]) => ` ${field} 必須在${target} 之前.`,
    between: (field, [min, max]) => ` ${field} 必須在${min} - ${max}之間.`,
    confirmed: (field, [confirmedField]) => ` ${field} 不能和${confirmedField}匹配.`,
    date_between: (field, [min, max]) => ` ${field}必須在${min}和${max}之間.`,
    date_format: (field, [format]) => ` ${field}必須在在${format}格式中.`,
    decimal: (field, [decimals] = ['*']) => ` ${field} 必須是數字的而且能夠包含${decimals === '*' ? '' : decimals} 小數點.`,
    digits: (field, [length]) => ` ${field} 必須是數字，且精確到 ${length}數`,
    dimensions: (field, [width, height]) => ` ${field}必須是 ${width} 像素到 ${height} 像素.`,
    email: (field) => ` ${field} 必須是有效的郵箱.`,
    ext: (field) => ` ${field} 必須是有效的文件.`,
    image: (field) => ` ${field} 必須是圖片.`,
    in: (field) => ` ${field} 必須是一個有效值.`,
    ip: (field) => ` ${field} 必須是一個有效的地址.`,
    max: (field, [length]) => ` ${field} 不能大於${length}字符.`,
    mimes: (field) => ` ${field} 必須是有效的文件類型.`,
    min: (field, [length]) => ` ${field} 必須至少有 ${length} 字符.`,
    not_in: (field) => ` ${field}必須是一個有效值.`,
    numeric: (field) => ` ${field} 只能包含數字字符.`,
    regex: (field) => ` ${field}格式無效.`,
    required: (field) => `${field}是必須的.`,
    size: (field, [size]) => ` ${field} 必須小於 ${size} KB.`,
    url: (field) => ` ${field}不是有效的url.`
  }, locale = {
    name: 'zh-Hant',
    messages,
    attributes: {}
  }

export default locale
