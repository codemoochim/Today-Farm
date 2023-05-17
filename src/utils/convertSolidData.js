export const convertSolidRawToPercent = (solidValue) => {
  const result = ((4095 - parseInt(solidValue)) / 4095) * 100;
  return parseInt(result);
};
