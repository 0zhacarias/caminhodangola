import { BookOpen, Target, Eye, Flag } from "lucide-react";

export function AboutUs() {


  return (
    <section className="py-16 px-6 md:px-32 bg-white text-slate-900">
      {/* Header / Intro */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 leading-relaxed">
          Wherever your adventure leads across Angola, Angola Trails is here to
          ensure your journey is as enriching and unforgettable as the
          destination itself. As a leading local travel agency rooted in
          Angolan culture, we specialize in crafting personalized itineraries
          that go beyond sightseeing — connecting you with the people,
          traditions, and stories that make Angola unique. From comfortable
          transportation and handpicked local accommodations to immersive
          cultural encounters and private guided tours, every detail is
          thoughtfully designed to offer you a deeper, more authentic travel
          experience from start to finish.
        </p>
      </div>

      {/* Who Are We / What Makes Us Unique */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Who Are We?</h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>A lot like you.</strong>
            <br />
            We are a team passionate about travel, culture, and nature,
            dedicated to making every detail of your experience in Angola
            unforgettable. As travelers and local hosts, we understand that
            planning a dream trip can be just as challenging as it is exciting.
            We also know that, without proper care, a trip may not go as
            expected — and that’s exactly why we’re here: to ensure your journey
            through Angola is safe, inspiring, and truly unique.
          </p>

          <h4 className="text-xl font-semibold mt-6">What Makes Us Unique?</h4>
          <p className="text-gray-700 leading-relaxed">
            At Angola Trails, we don’t just offer tours — we create meaningful
            connections. What sets us apart is our deep local knowledge, our
            passion for storytelling, and our commitment to cultural immersion.
            We work hand in hand with local communities to ensure every journey
            supports and celebrates Angola’s diverse heritage. Our itineraries
            are guided by locals who not only know the terrain but carry the
            spirit of their land. Whether you’re sharing a traditional meal
            with a village elder, learning local crafts, or exploring sacred
            natural sites, each experience is designed to be personal,
            respectful, and unforgettable.
          </p>

          <p className="text-gray-700 leading-relaxed italic mt-4">
            We believe true travel happens when you step off the beaten path and
            into the heart of a place.
          </p>
        </div>

        {/* Icons / Short highlights (replacing original story/mission/vision/goals blocks) */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-start gap-4">
            <BookOpen className="text-yellow-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold">Local Roots</h4>
              <p className="text-gray-700">
                Deeply rooted in Angolan culture, our team brings first-hand
                knowledge and authentic connections to every itinerary.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Target className="text-yellow-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold">Tailored Experiences</h4>
              <p className="text-gray-700">
                Personalized trips designed to reveal Angola’s hidden gems and
                cultural richness — not just the highlights.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Eye className="text-yellow-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold">Respectful Immersion</h4>
              <p className="text-gray-700">
                We design experiences that are respectful to communities and
                environments while allowing deep cultural exchange.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Flag className="text-yellow-500 w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold">Sustainable Goals</h4>
              <p className="text-gray-700">
                We partner with local communities to create tourism that brings
                tangible benefits and promotes sustainable development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
