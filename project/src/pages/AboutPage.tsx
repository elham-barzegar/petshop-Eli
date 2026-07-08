import { Heart, Users, Award, PawPrint, MapPin, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dedicated to helping pet parents give their furry friends the best life possible
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Where It All Began
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Pet Shop Eli started in 2015 with a simple dream: to create a place where pet
                parents could find everything their beloved companions need under one roof.
                Founded by Eli Martinez, a lifelong animal lover and proud parent of three rescue
                dogs, our store was born from a passion for animals and a commitment to quality.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What began as a small corner shop has grown into a beloved community hub for pet
                lovers. We've helped thousands of families find the perfect products for their
                pets, from premium nutrition to cozy beds and engaging toys.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue Eli's vision: to provide exceptional products, expert advice,
                and a welcoming space where every pet and their human feels at home.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1490844/pexels-photo-1490844.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our pet store"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-bold text-amber-500">9+</p>
                <p className="text-gray-600">Years of Love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pet-First Philosophy</h3>
              <p className="text-gray-600">
                Every product we stock is carefully selected with your pet's health, happiness,
                and safety in mind. We never compromise on quality.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We partner with trusted brands and local artisans who share our commitment to
                excellence. From ingredients to craftsmanship, quality comes first.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Focus</h3>
              <p className="text-gray-600">
                We're more than a store—we're your neighbors. We support local rescues, host
                adoption events, and give back to our pet-loving community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate pet lovers dedicated to helping you and your furry friends
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Eli Martinez',
                role: 'Founder & Owner',
                image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                name: 'Sarah Chen',
                role: 'Store Manager',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                name: 'Mike Johnson',
                role: 'Pet Nutrition Expert',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                name: 'Lisa Brown',
                role: 'Customer Care Lead',
                image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Info */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visit Our Store</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We'd love to meet you and your pets in person!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">
                123 Pet Street
                <br />
                Pawsville, CA 90210
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Hours</h3>
              <p className="text-gray-600">
                Mon - Sat: 9am - 7pm
                <br />
                Sunday: 10am - 5pm
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-rose-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <PawPrint className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Bring Your Pet!</h3>
              <p className="text-gray-600">
                Leashed pets are always
                <br />
                welcome in our store
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
