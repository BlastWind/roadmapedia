export function isHttp(url) {}

export function cleanURLForQuery(url) {
  url = url.trim();
  if (url.substring(0, 8) === "https://") {
    url.replace("https://", "");
  } else if (url.substring(0, 7) === "http://") {
    url.replace("http://", "");
  }
  return url;
}
