/*eslint-disable*/

// Takes a the time value from our cache as argument
// Determines whether or not 5 minutes has passed
exports.cacheShouldRefresh = (timestamp) => {
  const now = new Date(Date.now());
  if (now.getDay() === 0 || now.getDay() === 6) {
    return false;
  }

  const date = new Date(timestamp);
  let diff = (now.getTime() - date.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff)) > 5;
};
