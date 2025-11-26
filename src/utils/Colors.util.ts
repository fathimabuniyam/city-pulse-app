export function alpha(color: string, alphaValue: number): string {
  const rgbaColor = hexToRgba(color);
  return `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${alphaValue})`;
}

function hexToRgba(hex: string): { r: number; g: number; b: number } {
  let r = 0;
  let g = 0;
  let b = 0;

  if (hex?.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex?.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return { r, g, b };
}
