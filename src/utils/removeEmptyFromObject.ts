export function removeEmptyFromObject(object: Object) {
  const filteredObject = Object.entries(object).filter(([, value]) => {
    return value.length > 0
  })

  console.log(filteredObject)

  return filteredObject
}
