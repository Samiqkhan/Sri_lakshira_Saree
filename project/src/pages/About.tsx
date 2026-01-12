import React from 'react';
import { Building, Target, Users, Heart } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Balaji ',
      role: 'Founder & CEO',
      image: '/images/team-1.png',
      bio: 'Balaji started Sri Lakshira with a passion for preserving traditional Indian craftsmanship and bringing it to a global audience.'
    },
    {
      name: 'Sri Lakshira',
      role: 'Head of Design',
      image: '/images/team-2.png',
      bio: 'Sri Lakshira our creative team, blending contemporary designs with timeless saree traditions.'
    },
    {
      name: 'Rahul',
      role: 'Marketing Director',
      image: '/images/team-3.png',
      bio: 'Rahul is the voice of Sri Lakshira, connecting with our community and sharing our story.'
    }
  ];

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
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Sri Lakshira</h1>
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
                Founded in 2024 in the heart of T.Kavundampalayam, Tamil Nadu, Sri Lakshira was born from a desire to celebrate the rich heritage of Indian textiles. We started as a small boutique with a big dream: to connect the incredible artisans from our local community with saree lovers across the globe. We believe every saree is a piece of art, a story woven in threads of tradition and passion.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-7 w-7 md:h-8 md:w-8 text-orange-600 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to empower local weavers and artisans by providing a platform to showcase their exceptional skills. We are committed to fair trade practices, ensuring that the creators of these beautiful garments receive the recognition and compensation they deserve. We aim to be the most trusted destination for authentic, handcrafted sarees that you will cherish for a lifetime.
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

        {/* Meet the Team Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow-lg overflow-hidden text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
