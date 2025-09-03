export const converterParaReal = (valorInteiro : number) => {
  let stringValor = String(valorInteiro);

  if (stringValor.length < 3) {
    stringValor = stringValor.padStart(3, '0');
  }

  const centavos = stringValor.slice(-2);
  const reais = stringValor.slice(0, -2);
  return `${reais},${centavos}`;
}

export const converterParaInteiro = (valorString: string): string => {
  const stringComPonto = valorString.replace(',', '.');

  const valorDecimal = parseFloat(stringComPonto);
  
  if (isNaN(valorDecimal)) {
    return "";
  }
  const valorFormatado = valorDecimal.toFixed(2);
  
  const stringInteira = valorFormatado.replace('.', '');
  console.log(stringInteira)
  return stringInteira;
};

export const normalizar = (valorString : string): string => {
  return converterParaReal(parseInt(converterParaInteiro(valorString)))
}

export default {converterParaReal, converterParaInteiro, normalizar}