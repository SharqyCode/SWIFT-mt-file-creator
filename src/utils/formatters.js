export const formatDateYYMMDD = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d
        .toISOString()
        .slice(2, 10)
        .replace(/-/g, "");
};

export const formatAmount = (amount) => {
    if (!amount) return "";
    return amount.replace(".", ",");
};
