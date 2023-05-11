// export function checkRequiredParams(body, requestParameters) {
//   for (let i = 0; i < requestParameters.length; i++) {
//     const param = requestParameters[i];
//     if (body[param] === undefined || body[param] === null || body[param].trim() === "") {
//       return false;
//     }
//   }
//   return true;
// }
export function checkRequiredParams(body, requestParameters) {
  requestParameters.forEach((params) => {
    const target = body[params];
    if (target === undefined || target === null || target.trim() === "") {
      return false;
    }
  });
  return true;
}
