import {
  UsersRound,
  Globe2,
  Landmark,
} from "lucide-react";

export function GroupTourSection() {
  return (
    <section className="bg-white py-16 px-6 md:px-32">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-yellow-500 text-lg font-semibold">
          Group Tours
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-800 my-4">
          Group tours for the curious and adventurous
        </h3>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
          Join one of our unforgettable group tours through Angola. Led by expert guides,
          our trips are designed for curious minds and bold spirits who seek authenticity,
          culture, and community — all while exploring safely and deeply.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 text-center">
        {/* Community */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <UsersRound className="w-8 h-8 text-yellow-500" />
          </div>
          <h4 className="text-xl font-semibold text-slate-800 mb-2">
            Community
          </h4>
          <p className="text-slate-600">
            Travel with like-minded people and share unforgettable moments in
            a welcoming group.
          </p>
        </div>

        {/* Solo or with others */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <Globe2 className="w-8 h-8 text-yellow-500" />
          </div>
          <h4 className="text-xl font-semibold text-slate-800 mb-2">
            Join solo or with friends
          </h4>
          <p className="text-slate-600">
            Whether you're exploring solo or bringing company, our tours welcome all — from ages 11 to 81!
          </p>
        </div>

        {/* Cultural immersion */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <Landmark className="w-8 h-8 text-yellow-500" />
          </div>
          <h4 className="text-xl font-semibold text-slate-800 mb-2">
            Cultural immersion
          </h4>
          <p className="text-slate-600">
            Go beyond surface tourism — dive deep into Angola’s history, traditions,
            and local life with our expert guides.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <a
          href={`https://wa.me/+244923469271?text=${encodeURIComponent(
            "Hi! I'm interested in joining a group tour with Caminhos D'Angola. Can you send me more info?"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-yellow-600 transition"
        >
          Join a Group Tour
        </a>
      </div>
    </section>
  );
}
