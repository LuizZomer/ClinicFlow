export function generatePassword(
  cpf: string,
  name: string,
  email: string,
): string {
  const cleanCpf = cpf.replace(/\D/g, '');
  const cpfPart = cleanCpf.substring(0, 4);

  const namePart = name.split(' ')[0].toLowerCase();

  const emailPart = email.split('@')[0].toLowerCase();

  // monta a senha
  return `${cpfPart}${namePart}${emailPart}`;
}
