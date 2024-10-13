function isValidDate(dateString: string): boolean {
  const timestamp = Date.parse(dateString);
  return !Number.isNaN(timestamp);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const convertStringsToDates = <After, Before = any>(obj: Before): After => {
  if (Array.isArray(obj)) {
    return obj.map(item => convertStringsToDates<After>(item)) as unknown as After;
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj as unknown as After;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const newObj: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string' && isValidDate(value)) {
      newObj[key] = new Date(value);
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = convertStringsToDates<After>(value);
    } else {
      newObj[key] = value;
    }
  }

  return newObj as After;
};
