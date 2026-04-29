function buildWhatsAppMessage(cart, total, couponCode) {
  const lines = cart.map(i => `- ${i.name} x${i.qty} = ${new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(i.finalPrice * i.qty)}`).join('%0A');
  const cpn = couponCode ? `%0ACupón aplicado: ${couponCode}` : '';
  return `Hola, quiero comprar:%0A${lines}%0A${cpn}%0ATotal final: ${new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(total)}`;
}
