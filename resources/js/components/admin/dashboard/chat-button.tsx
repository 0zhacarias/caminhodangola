import { MessageSquareIcon } from 'lucide-react';

export function ChatButton() {
    return (
        <button
            type="button"
            className="fixed right-5 bottom-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
        >
            <MessageSquareIcon className="h-5 w-5" />
        </button>
    );
}
