import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { categories } from '@/data/catalog';

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const collections = categories;

  return (
    <div className="min-h-screen bg-luxury-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-luxury-noir via-luxury-charcoal to-luxury-noir">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-serif text-luxury-white mb-6">
              Our <span className="luxury-text-gradient">Collection</span>
            </h1>
            <p className="text-xl text-luxury-cream max-w-2xl mx-auto leading-relaxed">
              Discover timepieces that transcend mere functionality—each one a masterwork of artistry, 
              precision, and timeless elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-32 bg-luxury-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto" ref={ref}>
            {collections.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/category/${category.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-lg mb-6 bg-luxury-cream shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
                    <div className="aspect-square relative">
                      <div className="w-full h-full flex items-center justify-center text-luxury-gray">
                        <span className="text-3xl font-serif">{category.name}</span>
                      </div>
                      <div className="absolute inset-0 bg-luxury-noir/0 group-hover:bg-luxury-noir/20 transition-all duration-500" />
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-luxury-gold text-luxury-noir px-8 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Collection
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-luxury-noir mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-luxury-gray mb-1">{category.description}</p>
                    <p className="text-sm text-luxury-gold">Price Range: {category.priceRange}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
