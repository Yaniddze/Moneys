export function getReturnUrl(searchQuery: string): string {
  let result = '';

  // ?ReturnUrl=   11 chars
  if (searchQuery.length > 11) {
    result = "http://localhost:8081" + decodeURIComponent(searchQuery.substr(11, searchQuery.length - 11));
  }

  return result;
}
