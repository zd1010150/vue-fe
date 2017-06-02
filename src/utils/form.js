
let formDataToJson = (formData) => {
  let json={};

    for (var entry of formData.entries())
    {
      json[entry[0]] = entry[1];
    }
    return JSON.stringify(json)

}


export {
  formDataToJson
}
