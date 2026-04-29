const COUPONS = {
  SPORT10: { type: 'general', percent: 10 },
  RIVER15: { type: 'river', percent: 15 },
  BIENVENIDO20: { type: 'first_purchase', percent: 20 }
};

function validateCoupon(code, cart, currentUser) {
  const coupon = COUPONS[code];
  if (!coupon) return { ok: false, message: 'Cupón inválido.' };
  if (coupon.type === 'first_purchase' && currentUser?.orders > 0) {
    return { ok: false, message: 'BIENVENIDO20 solo primera compra.' };
  }
  if (coupon.type === 'river' && !cart.some(i => (i.team || '').toLowerCase() === 'river')) {
    return { ok: false, message: 'RIVER15 requiere camisetas River en carrito.' };
  }
  return { ok: true, coupon };
}
