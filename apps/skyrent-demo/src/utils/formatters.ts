const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/**
 * Format a number as USD currency without decimals.
 */
export const formatCurrency = (value: number) => currencyFormatter.format(value);

/**
 * Format a daily rental price for display.
 */
export const formatDailyPrice = (dailyPrice: number) => `${formatCurrency(dailyPrice)}/day`;

/**
 * Join street address lines into a single display line.
 */
export const formatAddressLine = (line1: string, line2: string) =>
  [line1, line2].filter(Boolean).join(', ');

/**
 * Join city, region, and postal code into a single display line.
 */
export const formatCityLine = (city: string, region: string, postalCode: string) =>
  [city, region, postalCode].filter(Boolean).join(', ');

/**
 * Format a concise specs line for drone cards.
 */
export const formatDroneSpecs = (specs: {
  rangeMiles: number;
  maxSpeedMph: number;
  loadCapacityLbs?: number;
}) => {
  const parts = [
    `Range ${specs.rangeMiles}mi`,
    `${specs.maxSpeedMph}mph`,
    specs.loadCapacityLbs ? `${specs.loadCapacityLbs}lb` : null,
  ].filter(Boolean);
  return parts.join(' • ');
};
