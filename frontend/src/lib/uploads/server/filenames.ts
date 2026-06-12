const UNSAFE_FILENAME_CHARS = /[^a-zA-Z0-9._ -]/g;

export function sanitizeOriginalFilename(filename: string) {
  const withoutPath = filename.split(/[\\/]/).pop() || 'photo';
  const cleaned = withoutPath
    .replace(UNSAFE_FILENAME_CHARS, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned.slice(0, 120) || 'photo';
}

export function getLowercaseExtension(filename: string) {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}
