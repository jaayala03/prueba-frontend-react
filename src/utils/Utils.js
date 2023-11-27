export function numberFormat(value) {
    let money = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0,
    }).format(value);
    return money;
}