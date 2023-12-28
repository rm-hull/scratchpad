export function replaceInXmlText(xmlString: string, searchPattern: RegExp, replacement: string): string {
  const regexTextElements = />([^<]*)<?/g;
  const textElementMatches = xmlString.match(regexTextElements);

  if (textElementMatches === null) {
    return xmlString.replace(searchPattern, replacement);
  }

  const result = xmlString.replace(regexTextElements, (match) => {
    return match.replace(searchPattern, replacement);
  });

  return result;
}
