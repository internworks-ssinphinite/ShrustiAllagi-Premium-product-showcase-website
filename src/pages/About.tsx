import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Heritage } from '@/components/Heritage';
import { Award, Users, Globe, Heart } from 'lucide-react';
import heritageBg from '@/assets/heritage-bg.jpg';

const About = () => {
  const valuesRef = useRef(null);
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Unwavering commitment to masterful craftsmanship and precision"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Every piece created with dedication and artistic vision"
    },
    {
      icon: Users,
      title: "Legacy",
      description: "Generations of expertise passed down through time"
    },
    {
      icon: Globe,
      title: "Global Vision",
      description: "Bringing timeless luxury to connoisseurs worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heritageBg} 
            alt="Heritage Workshop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-noir/70 via-luxury-noir/50 to-luxury-noir/70" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-7xl font-serif text-luxury-white mb-6">
              Our <span className="luxury-text-gradient">Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-luxury-cream max-w-3xl mx-auto leading-relaxed">
              A legacy of excellence spanning over a century—where tradition meets innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <Heritage />

      {/* Values Section */}
      <section className="py-32 bg-gradient-to-br from-luxury-noir via-luxury-charcoal to-luxury-noir">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-white mb-6">
              Our <span className="luxury-text-gradient">Values</span>
            </h2>
            <p className="text-xl text-luxury-cream max-w-2xl mx-auto">
              The principles that guide every decision, every design, every masterpiece
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto" ref={valuesRef}>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-luxury-gold/20 border-2 border-luxury-gold mb-6 group-hover:bg-luxury-gold group-hover:scale-110 transition-all duration-500">
                  <value.icon className="w-10 h-10 text-luxury-gold group-hover:text-luxury-noir transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-serif text-luxury-white mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-luxury-cream leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-32 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-8">
                The Art of <span className="luxury-text-gradient">Craftsmanship</span>
              </h2>
              <p className="text-xl text-luxury-gray leading-relaxed mb-8">
                Each timepiece is the result of over 300 hours of meticulous work by our master artisans. 
                From the initial design sketch to the final polish, every step is guided by an unwavering 
                commitment to perfection.
              </p>
              <p className="text-xl text-luxury-gray leading-relaxed">
                We source only the finest materials—Swiss movements, rare metals, and ethically sourced 
                gemstones—to create pieces that will be treasured for generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
