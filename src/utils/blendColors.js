const blendColors = (mainColor, secondColor) => {
  const alpha = parseInt(mainColor.substr(7, 2), 16) / 255;
  const r1 = parseInt(mainColor.substr(1, 2), 16);
  const g1 = parseInt(mainColor.substr(3, 2), 16);
  const b1 = parseInt(mainColor.substr(5, 2), 16);

  const r2 = parseInt(secondColor.substr(1, 2), 16);
  const g2 = parseInt(secondColor.substr(3, 2), 16);
  const b2 = parseInt(secondColor.substr(5, 2), 16);

  const r = Math.round(r1 * alpha + r2 * (1 - alpha));
  const g = Math.round(g1 * alpha + g2 * (1 - alpha));
  const b = Math.round(b1 * alpha + b2 * (1 - alpha));

  return `rgb(${r},${g},${b})`;
};

export default blendColors;
