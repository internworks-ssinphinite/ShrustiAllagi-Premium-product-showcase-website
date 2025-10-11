import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ecomService } from '@/services/ecomService';
import { formatPrice } from '@/data/catalog';

const Orders = () => {
	const orders = ecomService.listOrders();
	return (
		<div className="min-h-screen bg-luxury-white">
			<Navigation />
			<section className="pt-28 pb-12 container mx-auto px-4">
				<h1 className="text-4xl font-serif mb-6">Your Orders</h1>
				<div className="space-y-4">
					{orders.map(o => (
						<div key={o.id} className="border rounded p-4">
							<div className="flex items-center justify-between">
								<span>Order {o.id}</span>
								<span className="text-sm">{new Date(o.createdAt).toLocaleString()}</span>
							</div>
							<div className="text-sm text-luxury-gray">{o.items.length} items • {formatPrice(o.subtotal, o.currency)} • {o.status}</div>
						</div>
					))}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Orders;


