export const placeHolder = field => `Enter ${field}`;

export const Field = (obj, fieldName, label, type) => ({
    id: fieldName,
    name: fieldName,
    label: label,
    placeholder: placeHolder(label.toLowerCase()),
    onChange: obj?.handleChange,
    type:type, 
    value: obj?.values[fieldName],
    error: obj?.touched[fieldName] && Boolean(obj?.errors[fieldName]),
    helperText: obj?.touched[fieldName] && obj?.errors[fieldName],
});

export const Selection = (obj, fieldName, placeholder, label) => ({
    id: fieldName,
    name: fieldName,
    label: label,
    onChange: obj?.handleChange,
    value: obj?.values[fieldName],
    placeholder: placeholder,
    error: obj?.touched[fieldName] && Boolean(obj?.errors[fieldName]),
    helperText: obj?.touched[fieldName] && obj?.errors[fieldName],
});
