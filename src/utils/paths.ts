export function toPublicPath(relativePath: string): string {
  return relativePath.replace(/^\./, "");
}
