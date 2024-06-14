function removeNonNumeric(input?: string): string {
    if (input) return input.replace(/\D/g, "");
    else return "";
}

export const GlobalFunctions = {
    removeNonNumeric
};

export function formatCurrencyBR(input: number | undefined): string {
    if (input === undefined) {
      return "R$ 0,00";
    }
  
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(input);
  }