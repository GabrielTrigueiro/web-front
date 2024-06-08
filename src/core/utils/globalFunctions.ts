function removeNonNumeric(input?: string): string {
    if (input) return input.replace(/\D/g, "");
    else return "";
}

export const GlobalFunctions = {
    removeNonNumeric
};