const validationRules = {
    "20": {
        regex: /^[a-z0-9]{1,16}$/i,
        error: "Reference must be 1–16 alphanumeric characters",
    },
    "23B": {
        regex: /^[a-z]{4}$/i,
        error: "Operation code must be 4 letters (e.g. CRED)",
    },
    "32A": {
        regex: /^\d{6}[a-z]{3}\d+$/i,
        error: "Format: YYMMDDCCYAmount",
    },
    "33B": {
        regex: /^[a-z]{3}\d+$/i,
        error: "Format: CCYAmount",
    },
    "71A": {
        regex: /^(our|ben|sha)$/i,
        error: "Charges must be OUR, BEN, or SHA",
    },
    "71F": {
        regex: /^[a-z]{3}\d+$/i,
        error: "Charges amount format: CCYAmount",
    },
};
export default validationRules