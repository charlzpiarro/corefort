export const SITE_URL = "https://coreforttech.co.tz";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
