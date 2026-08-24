import { MessageCircle } from "lucide-react";

export function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/+244923469271?text=${encodeURIComponent(
        "Hello! I’d love to know more about your tours in Angola!"
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
