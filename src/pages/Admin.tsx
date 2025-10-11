import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { inputVariants } from '@/components/ui/input';
import { ecomService } from '@/services/ecomService';
import { useAuth } from '@/context/AuthContext';
import { formatPrice, products as seedProducts } from '@/data/catalog';
import type { Product } from '@/data/catalog';

const Admin = () => {
	const { user, isAdmin } = useAuth();
	const navigate = useNavigate();
	const [tab, setTab] = useState<'products' | 'orders' | 'analytics'>('products');
	const [products, setProducts] = useState<Product[]>(() => ecomService.listProducts());
	const [orders, setOrders] = useState(() => ecomService.listOrders());

	if (!user || !isAdmin) {
		navigate('/admin/login');
		return null;
	}

	function addSampleProduct() {
		const p = { ...seedProducts[0], id: `p_${Date.now()}` } as Product;
		ecomService.createProduct(p);
		setProducts(ecomService.listProducts());
	}

	function updateOrderStatus(orderId: string, status: 'pending'|'paid'|'shipped'|'completed'|'cancelled') {
		ecomService.updateOrderStatus(orderId, status);
		setOrders(ecomService.listOrders());
	}

	return (
		<div className="min-h-screen bg-luxury-white">
			<Navigation />
			<section className="pt-28 pb-6 container mx-auto px-4">
				<div className="flex items-center justify-between">
					<h1 className="text-4xl font-serif">Admin Dashboard</h1>
					<p className="text-luxury-gray">Signed in as {user.email}</p>
				</div>
				<div className="mt-6 flex gap-3">
					<Button variant={tab==='products'?'luxury':'luxury-outline'} onClick={() => setTab('products')}>Products</Button>
					<Button variant={tab==='orders'?'luxury':'luxury-outline'} onClick={() => setTab('orders')}>Orders</Button>
					<Button variant={tab==='analytics'?'luxury':'luxury-outline'} onClick={() => setTab('analytics')}>Analytics</Button>
				</div>
			</section>

			<section className="container mx-auto px-4 pb-20">
				{tab === 'products' && (
					<div>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-semibold">Products</h2>
							<Button variant="luxury" onClick={addSampleProduct}>Add Sample Product</Button>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{products.map(p => (
								<div key={p.id} className="border rounded-lg overflow-hidden bg-luxury-cream">
									<img src={p.images[0]} alt={p.name} className="w-full h-48 object-cover" />
									<div className="p-4">
										<h3 className="text-xl font-serif">{p.name}</h3>
										<p className="text-sm text-luxury-gray">{p.categoryName}</p>
										<div className="flex items-center justify-between mt-2">
											<span>{formatPrice(p.price, p.currency)}</span>
											<span className="text-sm">Stock: {p.stock}</span>
										</div>
										<div className="mt-3 flex gap-2">
											<Button variant="luxury-outline" onClick={() => {/* placeholder edit */}}>Edit</Button>
											<Button variant="destructive" onClick={() => { ecomService.deleteProduct(p.id); setProducts(ecomService.listProducts()); }}>Delete</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
				{tab === 'orders' && (
					<div>
						<h2 className="text-2xl font-semibold mb-4">Orders</h2>
						<div className="space-y-3">
							{orders.map(o => (
								<div key={o.id} className="border rounded p-4">
									<div className="flex items-center justify-between">
										<span>Order {o.id}</span>
										<span className="text-sm">{new Date(o.createdAt).toLocaleString()}</span>
									</div>
									<div className="text-sm text-luxury-gray">{o.items.length} items • {formatPrice(o.subtotal, o.currency)}</div>
									<div className="mt-2 flex gap-2 items-center">
										<select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value as any)} className="border rounded p-1 text-sm">
											<option value="pending">Pending</option>
											<option value="paid">Paid</option>
											<option value="shipped">Shipped</option>
											<option value="completed">Completed</option>
											<option value="cancelled">Cancelled</option>
										</select>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
				{tab === 'analytics' && (
					<div>
						<h2 className="text-2xl font-semibold mb-4">Sales Analytics</h2>
						<p className="text-luxury-gray">Coming soon.</p>
					</div>
				)}
			</section>

			<Footer />
		</div>
	);
};

export default Admin;


