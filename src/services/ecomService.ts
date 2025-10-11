import { storage } from './storage';
import { categories as seedCategories, products as seedProducts, Product } from '@/data/catalog';
import type { User, Order, OrderItem, OrderStatus } from '@/types/ecom';

const KEYS = {
	users: 'ecom_users',
	products: 'ecom_products',
	categories: 'ecom_categories',
	orders: 'ecom_orders',
	session: 'ecom_session',
};

function init() {
	// Seed products and categories once
	const hasProducts = storage.get<Product[]>(KEYS.products, []).length > 0;
	if (!hasProducts) {
		storage.set(KEYS.products, seedProducts);
		storage.set(KEYS.categories, seedCategories);
	}
	// Seed admin if not exists
	const users = storage.get<User[]>(KEYS.users, []);
	if (!users.find(u => u.isAdmin)) {
		const admin: User = {
			id: 'admin-1',
			email: 'admin@example.com',
			name: 'Admin',
			passwordHash: 'admin', // DEMO ONLY. Replace with real hashing.
			isAdmin: true,
		};
		storage.set(KEYS.users, [...users, admin]);
	}
}

init();

export const ecomService = {
	// Auth
	register(email: string, name: string, password: string): User {
		const users = storage.get<User[]>(KEYS.users, []);
		if (users.find(u => u.email === email)) throw new Error('Email already registered');
		const user: User = {
			id: `user_${Date.now()}`,
			email,
			name,
			passwordHash: password,
			isAdmin: false,
		};
		storage.set(KEYS.users, [...users, user]);
		storage.set(KEYS.session, { userId: user.id });
		return user;
	},
	login(email: string, password: string): User {
		const users = storage.get<User[]>(KEYS.users, []);
		const user = users.find(u => u.email === email && u.passwordHash === password);
		if (!user) throw new Error('Invalid credentials');
		storage.set(KEYS.session, { userId: user.id });
		return user;
	},
	logout() {
		storage.set(KEYS.session, null);
	},
	currentUser(): User | undefined {
		const session = storage.get<{ userId?: string } | null>(KEYS.session, null);
		if (!session?.userId) return undefined;
		const users = storage.get<User[]>(KEYS.users, []);
		return users.find(u => u.id === session.userId);
	},

	// Products
	listProducts(): Product[] {
		return storage.get<Product[]>(KEYS.products, []);
	},
	getProduct(id: string): Product | undefined {
		return this.listProducts().find(p => p.id === id);
	},
	createProduct(p: Product) {
		const products = this.listProducts();
		storage.set(KEYS.products, [...products, p]);
	},
	updateProduct(id: string, updates: Partial<Product>) {
		const products = this.listProducts().map(p => p.id === id ? { ...p, ...updates } : p);
		storage.set(KEYS.products, products);
	},
	deleteProduct(id: string) {
		const products = this.listProducts().filter(p => p.id !== id);
		storage.set(KEYS.products, products);
	},

	// Orders
	listOrders(): Order[] {
		return storage.get<Order[]>(KEYS.orders, []);
	},
	createOrder(items: OrderItem[], currency: string, userId?: string): Order {
		const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
		const order: Order = {
			id: `ord_${Date.now()}`,
			items,
			currency,
			subtotal,
			status: 'pending',
			createdAt: new Date().toISOString(),
			userId,
		};
		const orders = this.listOrders();
		storage.set(KEYS.orders, [order, ...orders]);

		// decrease inventory
		const products = this.listProducts();
		for (const item of items) {
			const idx = products.findIndex(p => p.id === item.productId);
			if (idx >= 0) {
				products[idx] = { ...products[idx], stock: Math.max(0, (products[idx].stock ?? 0) - item.quantity) } as Product;
			}
		}
		storage.set(KEYS.products, products);
		return order;
	},
	updateOrderStatus(orderId: string, status: OrderStatus) {
		const orders = this.listOrders().map(o => o.id === orderId ? { ...o, status } : o);
		storage.set(KEYS.orders, orders);
	},
};


