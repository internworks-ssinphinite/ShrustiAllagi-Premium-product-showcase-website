import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const locations = [
    {
      city: "Geneva",
      address: "12 Rue du Rhône, 1204 Geneva, Switzerland",
      phone: "+41 22 123 4567",
      hours: "Mon-Sat: 10:00 - 19:00"
    },
    {
      city: "Paris",
      address: "8 Place Vendôme, 75001 Paris, France",
      phone: "+33 1 42 60 00 00",
      hours: "Mon-Sat: 11:00 - 20:00"
    },
    {
      city: "New York",
      address: "5th Avenue, New York, NY 10022, USA",
      phone: "+1 212 753 0111",
      hours: "Mon-Sat: 10:00 - 18:00"
    },
    {
      city: "Dubai",
      address: "Dubai Mall, Downtown Dubai, UAE",
      phone: "+971 4 330 8888",
      hours: "Sun-Thu: 10:00 - 22:00"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

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
              Get in <span className="luxury-text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-luxury-cream max-w-2xl mx-auto leading-relaxed">
              Begin your journey with Lumière. Our experts are here to guide you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-32 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif text-luxury-noir mb-8">
                Schedule a <span className="luxury-text-gradient">Consultation</span>
              </h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-luxury-charcoal mb-2 tracking-wider uppercase">
                      First Name
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="bg-luxury-white border-luxury-gray/30 focus:border-luxury-gold text-luxury-noir"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-luxury-charcoal mb-2 tracking-wider uppercase">
                      Last Name
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="bg-luxury-white border-luxury-gray/30 focus:border-luxury-gold text-luxury-noir"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-luxury-charcoal mb-2 tracking-wider uppercase">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    required 
                    className="bg-luxury-white border-luxury-gray/30 focus:border-luxury-gold text-luxury-noir"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-luxury-charcoal mb-2 tracking-wider uppercase">
                    Phone
                  </label>
                  <Input 
                    type="tel" 
                    className="bg-luxury-white border-luxury-gray/30 focus:border-luxury-gold text-luxury-noir"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-luxury-charcoal mb-2 tracking-wider uppercase">
                    Preferred Location
                  </label>
                  <select className="w-full px-4 py-2 rounded-md border border-luxury-gray/30 focus:border-luxury-gold bg-luxury-white text-luxury-noir focus:outline-none focus:ring-2 focus:ring-luxury-gold/20">
                    <option>Geneva</option>
                    <option>Paris</option>
                    <option>New York</option>
                    <option>Dubai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-luxury-charcoal mb-2 tracking-wider uppercase">
                    Message
                  </label>
                  <Textarea 
                    rows={5} 
                    className="bg-luxury-white border-luxury-gray/30 focus:border-luxury-gold text-luxury-noir resize-none"
                    placeholder="Tell us about your interests..."
                  />
                </div>

                <Button variant="luxury" size="xl" className="w-full shadow-[var(--shadow-gold)]">
                  Request Consultation
                </Button>
              </form>
            </motion.div>

            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif text-luxury-noir mb-8">
                Our <span className="luxury-text-gradient">Boutiques</span>
              </h2>
              
              {locations.map((location, index) => (
                <motion.div
                  key={location.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-luxury-white p-8 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500"
                >
                  <h3 className="text-2xl font-serif text-luxury-noir mb-4 flex items-center gap-3">
                    <MapPin className="text-luxury-gold w-6 h-6" />
                    {location.city}
                  </h3>
                  <div className="space-y-3 text-luxury-gray">
                    <p className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-luxury-gold/60" />
                      {location.address}
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="w-5 h-5 flex-shrink-0 text-luxury-gold/60" />
                      {location.phone}
                    </p>
                    <p className="flex items-center gap-3">
                      <Clock className="w-5 h-5 flex-shrink-0 text-luxury-gold/60" />
                      {location.hours}
                    </p>
                  </div>
                </motion.div>
              ))}

              <div className="bg-luxury-noir p-8 rounded-lg">
                <h3 className="text-2xl font-serif text-luxury-white mb-4 flex items-center gap-3">
                  <Mail className="text-luxury-gold w-6 h-6" />
                  Direct Inquiries
                </h3>
                <p className="text-luxury-cream mb-2">
                  Email: <a href="mailto:contact@lumiere-luxury.com" className="text-luxury-gold hover:text-luxury-gold-light transition-colors">contact@lumiere-luxury.com</a>
                </p>
                <p className="text-luxury-cream text-sm">
                  We respond within 24 hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
