export function checkRequiredParams(body, requestParameters) {
  requestParameters.forEach((params) => {
    const target = body[params];
    if (target === undefined || target === null || target === "") {
      return false;
    }
  });
  return true;
}
