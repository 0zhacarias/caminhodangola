import { Bus01Icon, Calendar03Icon, FeatherIcon, LanguageSkillIcon } from "hugeicons-react";

// Replace with a valid export, for example:
export default function Topics() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        
            <div className="w-72 h-56 py-8 flex flex-col justify-center items-center border-4 gap-2 bg-slate-400/5 border-slate-400/5 p-2 rounded-xl">
              <FeatherIcon size={56} className="text-yellow-500" />
              <h6 className="text-center">This is Angola</h6>
              <p className="text-center text-sm">Explore the rich heritage and unique traditions of Angola’s indigenous communities.</p>
            </div>
            <div className="w-72 h-56 py-8 flex flex-col justify-center items-center border-4 gap-2 bg-slate-400/5 border-slate-400/5 p-2 rounded-xl">
              <Bus01Icon size={56} className="text-yellow-500" />
              <h6 className="text-center">Transportation Services</h6>
              <p className="text-center text-sm">We arrange all types of transportation tailored to your itinerary.</p>
            </div>
            <div className="w-72 h-56 py-8 flex flex-col justify-center items-center border-4 gap-2 bg-slate-400/5 border-slate-400/5 p-2 rounded-xl">
              <LanguageSkillIcon size={56} className="text-yellow-500" />
              <h6 className="text-center">English-Speaking Guides</h6>
              <p className="text-center text-sm">Enjoy fully guided tours across Angola with experienced English-speaking professionals.</p>
            </div>
            <div className="w-72 h-56 py-8 flex flex-col justify-center items-center border-4 gap-2 bg-slate-400/5 border-slate-400/5 p-2 rounded-xl">
              <Calendar03Icon size={56} className="text-yellow-500" />
              <h6 className="text-center">Custom Travel Planning</h6>
              <p className="text-center text-sm">We create flexible travel plans designed around your personal preferences and schedule.</p>
            </div>
      </div>
    </div>
  )
}