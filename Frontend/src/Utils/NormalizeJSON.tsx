function getValues(obj:any, headers:any, prefix = "") {
    const values = [];
    for (const key of headers) {
      if (key.startsWith(prefix)) {
        const subKeys = key.slice(prefix.length).split(".");
        let value = obj;
        for (const subKey of subKeys) {
          value = value[subKey];
          if (value === undefined) {
            break;
          }
        }
        values.push(value !== undefined ? value : "");
      } else {
        values.push("");
      }
    }
    return values;
}

const getHeaders = (obj:any, prefix = ""):any => {
    const headers = [];
    for (const key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        const nestedHeaders = getHeaders(obj[key], prefix + key + ".");
        headers.push(...nestedHeaders);
      } else if(!Array.isArray(obj[key])) {
        headers.push(prefix + key);
      }
    }
    return headers;
  }

export function jsonNormalize(jsonData:any) {
    const headers = getHeaders(jsonData[0]);

    const normalizedJSON:any = jsonData.map((item:any, ) => {
      const values = getValues(item, headers);
      let NormalizedCollegeObject = {}
      for(let i = 0; i < values.length; i++){
            NormalizedCollegeObject = {
                [`${headers[i]}`]: values[i],
                ...NormalizedCollegeObject
            }
      }

      return ({
            ...NormalizedCollegeObject
      })
    });

    return (normalizedJSON)
}