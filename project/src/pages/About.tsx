import React from 'react';
import { Building, Target, Users, Heart, Facebook, Instagram, Youtube } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const About: React.FC = () => {
  // const teamMembers = [
  //   {
  //     name: 'Balaji ',
  //     role: 'Founder & CEO',
  //     image: '/images/team-1.png',
  //     bio: 'Balaji started Sri Lakshira Silks with a passion for preserving traditional Indian craftsmanship and bringing it to a global audience.'
  //   },
  //   {
  //     name: 'Arun',
  //     role: 'Head of Design',
  //     image: '/images/team-2.png',
  //     bio: 'Sri Lakshira Silks our creative team, blending contemporary designs with timeless saree traditions.'
  //   },
  //   {
  //     name: 'Rahul',
  //     role: 'Marketing Director',
  //     image: '/images/team-3.png',
  //     bio: 'Rahul is the voice of Sri Lakshira Silks, connecting with our community and sharing our story.'
  //   }
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/9558579/pexels-photo-9558579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Artisans weaving a saree"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Sri Lakshira Silks</h1>
          <p className="text-lg md:text-xl text-gray-200">
            Weaving stories of tradition, elegance, and craftsmanship.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Our Story & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-24">
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-4">
                <Building className="h-7 w-7 md:h-8 md:w-8 text-orange-600 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Story</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
Sri Lakshira
was born from a desire to celebrate the rich heritage of Indian textiles. We started as small saree manufacture with big dream: to connect the incredible artisans from our local community with saree lovers across the globe. We believe every saree is a piece of art, a story woven in threads of tradition and passion.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-7 w-7 md:h-8 md:w-8 text-orange-600 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to empower local weavers and artisans by providing a global platform to showcase their exceptional skills. We are committed to fair trade practices, ensuring creators receive the recognition they deserve while bringing luxury at affordable price points for our customers. We aim to be the most trusted destination for authentic, handcrafted sarees that you will cherish for a lifetime, bridging the gap between traditional craftsmanship and modern elegance.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-7 w-7 md:h-8 md:w-8 text-orange-600 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To preserve the soul of Indian silk by weaving timeless elegance into every generation.
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/about.png"
              alt="Close-up of a colorful saree"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow p-6 sm:p-8 md:p-12 mb-12 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We guarantee 100% authentic, handcrafted sarees sourced directly from weavers.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Craftsmanship</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We celebrate and preserve the exquisite skills of our artisan partners.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Building className="h-7 w-7 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We are committed to the ethical treatment and empowerment of our weavers.
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="bg-white rounded-2xl shadow p-6 sm:p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">Connect With Us</h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <a 
              href="https://www.facebook.com/share/1CMnknbLvt/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                <Facebook className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Facebook</span>
            </a>

            <a 
              href="https://www.instagram.com/sri_lakshira?igsh=YThxejQxcWJ2cngw&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300 shadow-md">
                <Instagram className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600">Instagram</span>
            </a>

            <a 
              href="https://youtube.com/@srilakshira?si=7B66zeDIx6nwjbla" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-md">
                <Youtube className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">YouTube</span>
            </a>

            <a 
              href="https://chat.whatsapp.com/D6Ojb8kWuXNIDBq6azRl5f?mode=gi_t" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-md">
                <WhatsAppIcon className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
