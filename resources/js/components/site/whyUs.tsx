import {
  MapPin,
  SlidersHorizontal,
  ShieldCheck,
  Leaf,
  Users,
  Handshake,
  Smile,
} from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="py-16 px-6 md:px-32 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Caminhos D'Angola?</h2>
        <p className="text-gray-700 leading-relaxed">
          Caminhos D'Angola is built on a strong reputation for delivering exceptional service,
          backed by deep regional expertise, tailor-made experiences, and competitive pricing.
          Every travel plan we design reflects our passion for Angola — we ensure each guest
          leaves with lasting impressions, a deeper appreciation for the country, and a desire
          to return.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex items-start space-x-4">
          <MapPin className="text-yellow-500 w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Local Expertise & Authenticity</h3>
            <p className="text-gray-700">
              Our team consists of dynamic, committed local guides with deep knowledge of the regions.
              We are driven by genuine hospitality and a mission to reveal the true essence of Angola —
              from iconic sites to hidden treasures.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <SlidersHorizontal className="text-yellow-500 w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Fully Customizable Itineraries</h3>
            <p className="text-gray-700">
              We create bespoke experiences tailored to your budget, interests, and schedule.
              We work closely with you to craft unique journeys — no off-the-shelf packages.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <ShieldCheck className="text-yellow-500 w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Service, Quality & Attention to Detail</h3>
            <p className="text-gray-700">
              We're proud to provide exceptional service: reliable transportation, hand-picked
              accommodations, and a hands-on commitment to every detail — because our travelers'
              comfort and satisfaction come first.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Leaf className="text-yellow-500 w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Respect for the Land & Communities</h3>
            <p className="text-gray-700">
              We celebrate Angola's beauty, vibrant traditions, and the diversity of its communities.
              Our tours honor cultural and natural heritage, minimize impact, and support local development.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">Our Core Values</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <li className="flex items-center space-x-3">
            <Users className="text-yellow-500 w-6 h-6" />
            <span>A dedicated team: we work together with a shared purpose.</span>
          </li>
          <li className="flex items-center space-x-3">
            <Handshake className="text-yellow-500 w-6 h-6" />
            <span>Integrity: we always do what's right.</span>
          </li>
          <li className="flex items-center space-x-3">
            <Smile className="text-yellow-500 w-6 h-6" />
            <span>Genuine hospitality: we put people first.</span>
          </li>
          <li className="flex items-center space-x-3">
            <Users className="text-yellow-500 w-6 h-6" />
            <span>Inclusion: we listen, learn, and celebrate diversity.</span>
          </li>
          <li className="flex items-center space-x-3">
            <Users className="text-yellow-500 w-6 h-6" />
            <span>Quality: excellence in every detail.</span>
          </li>
          <li className="flex items-center space-x-3">
            <Leaf className="text-yellow-500 w-6 h-6" />
            <span>Community: local engagement is essential.</span>
          </li>
          <li className="flex items-center space-x-3">
            <Users className="text-yellow-500 w-6 h-6" />
            <span>Passion for Angola: it's our mission to share this country with the world.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
