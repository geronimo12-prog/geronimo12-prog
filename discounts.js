function withDiscounts(products) {
  return products.map(p => {
    const rule = DISCOUNTS.find(d => d.productId === p.id);
    if (!rule) return { ...p, finalPrice: p.price, discountPercent: 0 };
    const finalPrice = Math.round(p.price * (1 - rule.percent / 100));
    return { ...p, finalPrice, discountPercent: rule.percent };
  });
}
