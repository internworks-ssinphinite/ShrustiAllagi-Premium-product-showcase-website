import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/catalog';
import { ecomService } from '@/services/ecomService';
import { useAuth } from '@/context/AuthContext';

const Cart = () => {
	const { items, removeFromCart, setQuantity, subtotal } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();

	function checkout() {
		if (items.length === 0) return;
		const orderItems = items.map(i => ({
			productId: i.product.id,
			name: i.product.name,
			price: i.product.price,
			quantity: i.quantity,
			currency: i.product.currency,
		}));
		const order = ecomService.createOrder(orderItems, items[0].product.currency, user?.id);
		navigate('/orders');
	}

	return (
		<div className="min-h-screen bg-luxury-white">
			<Navigation />
			<section className="pt-28 pb-8 container mx-auto px-4">
				<h1 className="text-4xl font-serif mb-6">Your Cart</h1>
				{items.length === 0 ? (
					<div className="text-luxury-gray">Your cart is empty.</div>
				) : (
					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-4">
							{items.map(i => (
								<div key={i.productId} className="flex gap-4 border rounded p-4">
									<img src={i.product.images[0]} alt={i.product.name} className="w-24 h-24 object-cover rounded" />
									<div className="flex-1">
										<div className="font-semibold">{i.product.name}</div>
										<div className="text-sm text-luxury-gray">{formatPrice(i.product.price, i.product.currency)}</div>
										<div className="mt-2 flex items-center gap-2">
											<input type="number" min={1} max={i.product.stock} value={i.quantity} onChange={e=>setQuantity(i.productId, Number(e.target.value))} className="w-20 border rounded p-1" />
											<Button variant="link" onClick={() => removeFromCart(i.productId)}>Remove</Button>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="border rounded p-4 h-fit">
							<div className="flex items-center justify-between">
								<span>Subtotal</span>
								<span className="font-semibold">{formatPrice(subtotal)}</span>
							</div>
							<Button className="w-full mt-4" variant="luxury" onClick={checkout}>Checkout</Button>
							<p className="text-xs text-luxury-gray mt-2">Demo checkout creates an order locally.</p>
						</div>
					</div>
				)}
			</section>
			<Footer />
		</div>
	);
};

export default Cart;


