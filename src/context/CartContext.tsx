import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { Product, getProductById } from '@/data/catalog';

export type CartItem = {
	productId: string;
	quantity: number;
};

type CartState = {
	items: CartItem[];
};

type CartAction =
	| { type: 'ADD'; productId: string; quantity?: number }
	| { type: 'REMOVE'; productId: string }
	| { type: 'SET_QTY'; productId: string; quantity: number }
	| { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'ADD': {
			const quantityToAdd = action.quantity ?? 1;
			const existing = state.items.find(i => i.productId === action.productId);
			if (existing) {
				return {
					items: state.items.map(i => i.productId === action.productId ? { ...i, quantity: i.quantity + quantityToAdd } : i)
				};
			}
			return { items: [...state.items, { productId: action.productId, quantity: quantityToAdd }] };
		}
		case 'REMOVE':
			return { items: state.items.filter(i => i.productId !== action.productId) };
		case 'SET_QTY':
			return { items: state.items.map(i => i.productId === action.productId ? { ...i, quantity: action.quantity } : i) };
		case 'CLEAR':
			return { items: [] };
		default:
			return state;
	}
}

type CartContextValue = {
	items: Array<CartItem & { product: Product }>;
	addToCart: (productId: string, quantity?: number) => { ok: true } | { ok: false; reason: 'out_of_stock' | 'invalid_product' };
	removeFromCart: (productId: string) => void;
	setQuantity: (productId: string, quantity: number) => void;
	clear: () => void;
	count: number;
	subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_KEY = 'ecom_cart_items';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, { items: (() => {
		try {
			const raw = localStorage.getItem(CART_KEY);
			return raw ? (JSON.parse(raw) as CartItem[]) : [];
		} catch {
			return [];
		}
	})() });

	const value = useMemo<CartContextValue>(() => {
		const withProducts = state.items
			.map(i => {
				const product = getProductById(i.productId);
				return product ? { ...i, product } : undefined;
			})
			.filter(Boolean) as Array<CartItem & { product: Product }>;

		const addToCart: CartContextValue['addToCart'] = (productId, quantity = 1) => {
			const product = getProductById(productId);
			if (!product) return { ok: false, reason: 'invalid_product' } as const;
			const inCartQty = state.items.find(i => i.productId === productId)?.quantity ?? 0;
			if (inCartQty + quantity > product.stock) {
				return { ok: false, reason: 'out_of_stock' } as const;
			}
			dispatch({ type: 'ADD', productId, quantity });
			return { ok: true } as const;
		};

		const removeFromCart = (productId: string) => dispatch({ type: 'REMOVE', productId });
		const setQuantity = (productId: string, quantity: number) => dispatch({ type: 'SET_QTY', productId, quantity });
		const clear = () => dispatch({ type: 'CLEAR' });
		const count = withProducts.reduce((sum, i) => sum + i.quantity, 0);
		const subtotal = withProducts.reduce((sum, i) => sum + i.quantity * i.product.price, 0);

		return { items: withProducts, addToCart, removeFromCart, setQuantity, clear, count, subtotal };
	}, [state]);

	useEffect(() => {
		localStorage.setItem(CART_KEY, JSON.stringify(state.items));
	}, [state.items]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within CartProvider');
	return ctx;
}


