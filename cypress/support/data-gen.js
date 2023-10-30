export const hexColorGenerator = () => {
  // 16777215 - maximum value of a 24-bit color
  // .toString(16) - converts number to a hexadecimal string (0-9, A-F)
  const randomColor = Math.round(Math.random() * 16777215).toString(16);
  const hexColor = `#${randomColor}00`.substring(0, 7);
  return hexColor;
};

export const numberGenerator = (number = 1000) => {
  const randomNumber = Math.round(Math.random() * number);
  return randomNumber;
};
