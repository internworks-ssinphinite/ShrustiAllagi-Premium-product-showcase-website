import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ProductShowcase3D } from '@/components/ProductShowcase3D';
import { ArrowLeft, Check } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const detailsRef = useRef(null);

  // In a real app, fetch product data based on id
  const product = {
    name: "Élégance Noir",
    category: "Classic Collection",
    price: "$12,500",
    description: "The Élégance Noir represents the pinnacle of our Classic Collection—a timepiece that transcends trends and embodies eternal sophistication. Crafted with meticulous attention to detail, this masterpiece features a precision Swiss automatic movement housed in a midnight black case of exceptional elegance.",
    specifications: [
      "Swiss Automatic Movement ETA 2824-2",
      "Sapphire Crystal Glass",
      "316L Stainless Steel Case",
      "Water Resistant to 100m",
      "Power Reserve: 42 Hours",
      "Case Diameter: 42mm",
      "Leather Strap with Deployant Clasp"
    ],
    features: [
      "Hand-assembled by master watchmakers",
      "Limited production of 500 pieces annually",
      "Individually numbered certificate of authenticity",
      "Lifetime service guarantee",
      "Complimentary annual maintenance for 5 years",
      "Custom engraving available"
    ]
  };

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
            {/* 3D Viewer */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-luxury-charcoal to-luxury-noir rounded-lg overflow-hidden shadow-[var(--shadow-luxury)]">
                <ProductShowcase3D />
              </div>
              <p className="text-center text-luxury-gray text-sm mt-4">
                Drag to rotate • Scroll to zoom
              </p>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              ref={detailsRef}
            >
              <p className="text-sm text-luxury-gold font-semibold mb-2 tracking-wider uppercase">
                {product.category}
              </p>
              <h1 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold text-luxury-charcoal mb-8">
                {product.price}
              </p>
              
              <p className="text-lg text-luxury-gray leading-relaxed mb-12">
                {product.description}
              </p>

              <div className="flex gap-4 mb-12">
                <Button variant="luxury" size="xl" className="flex-1 shadow-[var(--shadow-gold)]">
                  Request This Piece
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
                  {product.features.map((feature, index) => (
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
              {product.specifications.map((spec, index) => (
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
