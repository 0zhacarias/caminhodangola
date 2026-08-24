import {
  SlidersHorizontal,
  UserRoundSearch,
  TimerReset,
  Mail,
  MessageSquare,
} from "lucide-react";

export function PrivateTourSection() {
  return (
    <section className="bg-white py-16 px-6 md:px-32">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-yellow-500 text-lg font-semibold">Private Tours</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-800 my-4">
          Personalize your trip with a private tour
        </h3>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
          At Caminhos D'Angola, we offer more than scheduled group tours – we
          create <strong>tailor-made private tours</strong> that match your
          dreams. From destination to duration, we plan everything to your
          liking.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 text-center">
        {/* Flexible */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <SlidersHorizontal className="w-8 h-8 text-yellow-500" />
          </div>
          <h4 className="text-xl font-semibold text-slate-800 mb-2">
            Flexible
          </h4>
          <p className="text-slate-600">
            Trips curated by experts for your unique needs and style. Make your
            trip truly yours.
          </p>
        </div>

        {/* Personal */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <UserRoundSearch className="w-8 h-8 text-yellow-500" />
          </div>
          <h4 className="text-xl font-semibold text-slate-800 mb-2">
            Personal
          </h4>
          <p className="text-slate-600">
            With our local guides, you’ll gain meaningful insights and travel
            safe, informed, and supported.
          </p>
        </div>

        {/* Your Own Pace */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <TimerReset className="w-8 h-8 text-yellow-500" />
          </div>
          <h4 className="text-xl font-semibold text-slate-800 mb-2">
            Your own pace
          </h4>
          <p className="text-slate-600">
            Want a packed adventure or a relaxed escape? We adapt to your rhythm
            and time.
          </p>
        </div>
      </div>

      <div className="text-center mt-12 flex items-center justify-center w-full gap-4">
        <a
          href={`https://wa.me/+244923469271?text=${encodeURIComponent(
            "Hi! I'm interested in a private tour with Caminhos D'Angola. Can you help me customize my trip?"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm items-center bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-green-600 transition"
        >
          <MessageSquare className="w-6 h-6 mr-3" aria-hidden />
          Customize Your Trip on WhatsApp
        </a>
        <a
          href={`mailto:info@caminhosdangola.com?subject=Private Tour Inquiry&body=${encodeURIComponent(
            "Hi! I'm interested in a private tour with Caminhos D'Angola. Can you help me customize my trip?"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm items-center bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-yellow-600 transition"
        >
          <Mail className="w-6 h-6 mr-3" aria-hidden />
          Customize Your Trip on Email
        </a>
      </div>
    </section>
  );
}
