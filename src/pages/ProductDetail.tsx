import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ProductShowcase3D } from '@/components/ProductShowcase3D';
import { ArrowLeft, Check } from 'lucide-react';
import { getProductById, formatPrice, getProductsByCategory } from '@/data/catalog';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const detailsRef = useRef(null);
  const { addToCart } = useCart();
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id]);
  const related = useMemo(() => product ? getProductsByCategory(product.categorySlug).filter(p => p.id !== product.id).slice(0, 3) : [], [product]);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-luxury-cream">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-28 pb-8 container mx-auto px-4">
        <Link to="/products">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-luxury-gray hover:text-luxury-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="tracking-wider uppercase text-sm">Back to Collection</span>
          </motion.button>
        </Link>
      </div>

      {/* Product Showcase */}
      <section className="py-12 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden shadow-[var(--shadow-luxury)] bg-luxury-cream">
                {product && (
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
              {product && product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`border rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-luxury-gold ${idx === activeImage ? 'border-luxury-gold' : 'border-transparent'}`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              ref={detailsRef}
            >
              <p className="text-sm text-luxury-gold font-semibold mb-2 tracking-wider uppercase">
                {product?.categoryName}
              </p>
              <h1 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-4">
                {product?.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-3xl font-semibold text-luxury-charcoal">
                  {product ? formatPrice(product.price, product.currency) : ''}
                </p>
                <span className={`text-sm ${product && product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {product && product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <p className="text-lg text-luxury-gray leading-relaxed mb-12">
                {product?.description}
              </p>

              <div className="flex gap-4 mb-12">
                <Button
                  variant="luxury"
                  size="xl"
                  className="flex-1 shadow-[var(--shadow-gold)]"
                  disabled={!product || product.stock === 0}
                  onClick={() => product && addToCart(product.id)}
                >
                  Add to Cart
                </Button>
                <Button variant="luxury-outline" size="xl">
                  Book Viewing
                </Button>
              </div>

              <div className="border-t border-luxury-gold/20 pt-8">
                <p className="text-sm text-luxury-gold font-semibold mb-4 tracking-wider uppercase">
                  Complimentary Services
                </p>
                <ul className="space-y-3">
                  {(product?.specifications ?? []).map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-luxury-gray"
                    >
                      <Check className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-32 bg-luxury-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-serif text-luxury-noir mb-6">
                Technical <span className="luxury-text-gradient">Specifications</span>
              </h2>
              <p className="text-xl text-luxury-gray">
                Precision engineering meets artistic excellence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {(product?.specifications ?? []).map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-luxury-cream p-6 rounded-lg border-l-4 border-luxury-gold hover:shadow-[var(--shadow-soft)] transition-shadow duration-300"
                >
                  <p className="text-luxury-charcoal font-medium">{spec}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-luxury-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif mb-6">Related Products</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map(r => (
              <Link key={r.id} to={`/product/${r.id}`} className="block border rounded overflow-hidden bg-luxury-cream">
                <img src={r.images[0]} alt={r.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="text-sm text-luxury-gold uppercase mb-1">{r.categoryName}</div>
                  <div className="font-serif text-xl">{r.name}</div>
                  <div className="text-sm text-luxury-gray">{formatPrice(r.price, r.currency)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-luxury-noir via-luxury-charcoal to-luxury-noir">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-white mb-6">
              Experience <span className="luxury-text-gradient">In Person</span>
            </h2>
            <p className="text-xl text-luxury-cream mb-12 max-w-2xl mx-auto">
              Visit one of our boutiques for an exclusive viewing of this exceptional timepiece
            </p>
            <Link to="/contact">
              <Button variant="luxury" size="xl" className="shadow-[var(--shadow-gold)]">
                Schedule Private Viewing
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
