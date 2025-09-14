type maskType = "cpf";

const cpfMask = (str: string) => {
  let value = str.replace(/\D/g, "");
  if (value.length > 11) return value.slice(0, 11);

  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return value;
};

export const maskString = (str: string, mask: maskType) => {
  switch (mask) {
    case "cpf":
      return cpfMask(str);
    default:
      return str;
  }
};

export const unmaskString = (str: string) => {
  return str.replace(/\D/g, "");
};
