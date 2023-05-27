const formatCurrency = (decimalStr) => {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(decimalStr);
};

export default formatCurrency;
