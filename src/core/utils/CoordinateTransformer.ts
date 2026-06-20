export class CoordinateTransformer {
  /**
   * Converts a pixel value to a percentage (0-100) relative to the dimension.
   * @param pixelValue The value in pixels (e.g., x coordinate, width).
   * @param dimension The total dimension in pixels (e.g., canvas width, canvas height).
   * @returns The percentage value (0-100).
   */
  static toPercent(pixelValue: number, dimension: number): number {
    if (dimension === 0) return 0;
    return (pixelValue / dimension) * 100;
  }

  /**
   * Converts a percentage value (0-100) to pixels relative to the dimension.
   * @param percentValue The value as a percentage.
   * @param dimension The total dimension in pixels.
   * @returns The pixel value.
   */
  static toPixel(percentValue: number, dimension: number): number {
    return (percentValue / 100) * dimension;
  }

  /**
   * Helper specifically for Font Size scaling based on Image Height.
   * Font size is typically relative to the height of the image for vertical consistency.
   */
  static fontSizeToPercent(pixelSize: number, imageHeight: number): number {
    return this.toPercent(pixelSize, imageHeight);
  }

  static fontSizeToPixel(percentSize: number, imageHeight: number): number {
    return this.toPixel(percentSize, imageHeight);
  }
}
