'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

import { type Cart } from '@/api/types';

const useCartState = (initialCart: Cart) => useState<Cart>(initialCart);

export const CartContext = createContext<ReturnType<
	typeof useCartState
> | null>(null);

const CartProvider = ({
	cart: initialCart,
	children,
}: {
	cart: Cart;
	children: ReactNode;
}) => {
	const [cart, setCart] = useCartState(initialCart);

	return (
		<CartContext.Provider value={[cart, setCart]}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => {
	const cart = useContext(CartContext);
	if (!cart) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return cart;
};
