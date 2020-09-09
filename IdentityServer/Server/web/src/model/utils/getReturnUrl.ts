export function getReturnUrl(searchQuery: string): string {
  let result = '';

  // ?ReturnUrl=   11 chars
  if (searchQuery.length > 11) {
    result = decodeURIComponent(searchQuery.substr(11, searchQuery.length - 11));
  }

  return result;
}
