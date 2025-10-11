import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Heritage } from '@/components/Heritage';
import { ProductShowcase3D } from '@/components/ProductShowcase3D';
import { ProductGallery } from '@/components/ProductGallery';
import { Consultation } from '@/components/Consultation';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Heritage />
      <ProductShowcase3D />
      <ProductGallery />
      <Consultation />
      <Footer />
    </div>
  );
};

export default Index;
