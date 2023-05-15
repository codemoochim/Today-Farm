export function checkRequiredParams(body, requestParameters) {
  requestParameters.forEach((params) => {
    const target = body[params];
    if (target === null || target?.length === 0) {
      return false;
    }
  });
  return true;
}
