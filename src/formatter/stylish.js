import { isPlainObject } from 'lodash-es';

const baseIndent = '    ';
const sign = {
  added: '  + ',
  deleted: '  - ',
};

const getSign = (type) => sign[type] || baseIndent;

export default (diff) => {
  const iter = (node, depth = 0) => (
    node.flatMap(({
      key,
      value,
      children,
      type,
    }) => {
      const currentIndent = baseIndent.repeat(depth);
      const currentSign = currentIndent + getSign(type);
      const bracketIndent = currentIndent + baseIndent;

      if (type === 'nested') {
        return `${currentSign}${key}: {\n${iter(children, depth + 1)}${bracketIndent}}\n`;
      }

      if (isPlainObject(value)) {
        const nodes = Object.entries(value).map(([nodeKey, nodeValue]) => (
          { key: nodeKey, value: nodeValue }
        ));
        return `${currentSign}${key}: {\n${iter(nodes, depth + 1)}${bracketIndent}}\n`;
      }

      return `${currentSign}${key}: ${value}\n`;
    }).join('')
  );

  return `{\n${iter(diff)}}`;
};
