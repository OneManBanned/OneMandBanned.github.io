function findFirstErrorField(obj) {
  let first = null;
  for (let key in obj) {
    first = key;
    break;
  }

  return first;
}

export default findFirstErrorField;
