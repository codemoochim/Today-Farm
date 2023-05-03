export function checkRequiredParams(body, requestParameters) {
  for (let i = 0; i < requestParameters.length; i++) {
    const param = requestParameters[i];
    if (body[param] === undefined || body[param] === null || body[param].trim() === "") {
      return false;
    }
  }
  return true;
}
