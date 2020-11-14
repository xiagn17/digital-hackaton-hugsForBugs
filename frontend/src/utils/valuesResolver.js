export function valuesResolver(value, values) {
    if (Array.isArray(values)) {
        return values.includes(value);
    }

    return value === values;
}
