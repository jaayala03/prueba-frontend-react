export function numberFormat(value, type) {
    let money = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'COP', minimumFractionDigits: 0,
    }).format(value);
    return type === '1' ? money : money.replace('$', '$-');
}
