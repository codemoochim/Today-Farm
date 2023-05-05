export const minutesToMillisecond = (minutes) => {
  return 6 * 1000 * minutes;
};

export const searchTimeFlag = (ms = 10) => {
  const currentTime = new Date(Date.now());
  const pastTime = new Date(currentTime - ms);
  return { currentTime, pastTime };
};
