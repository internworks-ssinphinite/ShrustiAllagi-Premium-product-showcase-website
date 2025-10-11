import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CategorySlug, formatPrice, getCategoryBySlug, getProductsByCategory } from '@/data/catalog';
import { useCart } from '@/context/CartContext';

const Category = () => {
	const { slug } = useParams();
	const category = useMemo(() => getCategoryBySlug((slug as CategorySlug)), [slug]);
	const products = useMemo(() => (slug ? getProductsByCategory(slug as CategorySlug) : []), [slug]);
	const { addToCart } = useCart();

	return (
		<div className="min-h-screen bg-luxury-white">
			<Navigation />

			<section className="pt-32 pb-12 bg-gradient-to-br from-luxury-noir via-luxury-charcoal to-luxury-noir">
				<div className="container mx-auto px-4 text-center">
					<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
						<h1 className="text-5xl md:text-6xl font-serif text-luxury-white mb-4">{category?.name ?? 'Collection'}</h1>
						<p className="text-luxury-cream">{category?.description}</p>
						{category?.priceRange && (
							<p className="text-luxury-cream/80 mt-2">Price Range: {category.priceRange}</p>
						)}
					</motion.div>
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
						{products.map((p, index) => (
							<motion.div key={p.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.05 }} className="bg-luxury-cream rounded-lg overflow-hidden shadow-[var(--shadow-soft)]">
								<Link to={`/product/${p.id}`}>
									<div className="aspect-square">
										<img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
									</div>
								</Link>
								<div className="p-6">
									<p className="text-sm text-luxury-gold font-semibold mb-1 tracking-wider uppercase">{p.categoryName}</p>
									<h3 className="text-2xl font-serif text-luxury-noir mb-2">{p.name}</h3>
									<p className="text-luxury-gray mb-3 line-clamp-2">{p.description}</p>
									<div className="flex items-center justify-between">
										<span className="text-xl font-semibold text-luxury-charcoal">{formatPrice(p.price, p.currency)}</span>
										<span className={`text-sm ${p.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{p.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
									</div>
									<div className="mt-4 flex gap-3">
										<Button
											variant="luxury"
											className="flex-1"
											disabled={p.stock === 0}
											onClick={() => addToCart(p.id)}
										>
											Add to Cart
										</Button>
										<Link to={`/product/${p.id}`} className="flex-1">
											<Button variant="luxury-outline" className="w-full">View Details</Button>
										</Link>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Category;


