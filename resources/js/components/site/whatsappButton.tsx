import { MessageCircle } from "lucide-react";
import { useWhatsapp } from "@/lib/whatsapp";

export function WhatsappButton() {
  const whatsapp = useWhatsapp();

  return (
    <a
      href={whatsapp.link()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
