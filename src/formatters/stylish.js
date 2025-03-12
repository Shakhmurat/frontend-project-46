import { isPlainObject } from 'lodash-es';
import {
  added,
  deleted,
  updated,
  nested,
} from '../types.js';

const baseIndent = '    ';
const sign = {
  added: '  + ',
  deleted: '  - ',
};

const getSign = (type) => sign[type] ?? baseIndent;
const objectToNode = (value) => (
  Object.entries(value).map(([key, nodeValue]) => (
    { key, value: nodeValue }
  ))
);

export default (diff) => {
  const iter = (node, depth = 0) => (
    node.flatMap(({
      key,
      value,
      children,
      type,
    }) => {
      const currentIndent = baseIndent.repeat(depth);
      const closingBracketIndent = currentIndent + baseIndent;
      const formatRow = (nodeValue, nodeType) => (
        `${currentIndent}${getSign(nodeType)}${key}: ${nodeValue}\n`);
      const formatNestedRow = (nodeValue, nodeType) => (
        `${currentIndent}${getSign(nodeType)}${key}: {
${iter(nodeValue, depth + 1)}${closingBracketIndent}}\n`);

      if (type === nested) {
        return formatNestedRow(children, type);
      }

      const getFormattedNode = (nodeValue, nodeType) => {
        if (isPlainObject(nodeValue)) {
          return formatNestedRow(objectToNode(nodeValue), nodeType);
        }

        return formatRow(nodeValue, nodeType);
      };

      if (type === updated) {
        const [oldValue, newValue] = value;
        return [
          `${getFormattedNode(oldValue, deleted)}`,
          `${getFormattedNode(newValue, added)}`,
        ];
      }

      return `${getFormattedNode(value, type)}`;
    }).join('')
  );

  return `{\n${iter(diff)}}`;
};
