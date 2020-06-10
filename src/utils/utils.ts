
export const getCartProductInfo = async (req: any, res: any) => {
  const user = await req.user.populate('cart.items.productId').execPopulate();
  const cartProducts = user.cart
  // @ts-ignore
  res.json({cartProducts})
}