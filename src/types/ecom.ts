export type User = {
	id: string;
	email: string;
	name: string;
	passwordHash: string;
	isAdmin: boolean;
};

export type OrderItem = {
	productId: string;
	name: string;
	price: number;
	quantity: number;
	currency: string;
};

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';

export type Order = {
	id: string;
	userId?: string;
	items: OrderItem[];
	subtotal: number;
	currency: string;
	status: OrderStatus;
	createdAt: string;
};


