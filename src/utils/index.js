const isNumeric = (value) => ((typeof value === 'number' || typeof value === 'string') && !Number.isNaN(Number(value)));

export default isNumeric;
