import type { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
                {children}
            </div>
        </div>
    );
}
