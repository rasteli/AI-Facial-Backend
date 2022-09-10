interface Data {
  [key: string]: string
}

export function removeEmptyFromObject(object: Object) {
  const filteredObjectToArray = Object.entries(object).filter(([, value]) => {
    return value.length > 0
  }) // -> [[key, value]]

  const data: Data = {}

  filteredObjectToArray.forEach(([key, value]) => {
    data[key] = value
  }) // -> {key: value}

  return data
}
