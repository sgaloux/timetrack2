import convert from 'xml-js';

export function convertXmlToJs(input: string) {
  return convert.xml2js(input, { compact: true, alwaysArray: true });
}
