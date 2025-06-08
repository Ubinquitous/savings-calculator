export const useParseNumber = () => {
  const withComma = (str: string) => {
    if (!str) return '';
    let result = '';

    if (str.length === 0 || (str.length === 1 && str[0] === '0')) {
      result = '0';
    } else {
      const trimmedStr = str.split('').reduce((prev, char, idx) => {
        if (idx === 0 && char === '0') {
          return prev;
        }
        if (prev) {
          return prev + char;
        }
        return char;
      }, '');
      trimmedStr
        .split('')
        .reverse()
        .forEach((cur, idx) => {
          result += (idx !== 0 && idx % 3) === 0 ? ',' : '';
          result += cur;
        });
      result = result.split('').reverse().join('');
    }

    return result;
  };

  const format = (value = 0): string => {
    if (value == null || Number.isNaN(value)) return '0';
    const unit = 10000;
    const unitLabels = ['', '만', '억', '조', '경', '해'];
    const maxIndex = unitLabels.length - 1;
    const result: string[] = [];
    let index = 0;
    do {
      const mod = value % unit;
      if (mod !== 0) {
        result.unshift(`${mod}${unitLabels[index]}`);
      }

      index += 1;
      value = (value - mod) / unit;
    } while (value > 0 && index < maxIndex);

    if (value > 0 && index === maxIndex) {
      result.unshift(`${value}${unitLabels[maxIndex]}`);
    }

    result.forEach((n, i) => {
      if (n.length === 5) {
        const curStr = result[i];
        result[i] = `${curStr.slice(0, 1)},${curStr.slice(1)}`;
      }
    });

    return `${result.length > 0 ? result.join(' ') : 0}`;
  };

  return { format, withComma };
};
