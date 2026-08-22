import { Link } from '@inertiajs/react';
import { adminNavGroups, mainNavItems } from '@/lib/admin-nav';
import { isGetHref } from '@/lib/utils';

const shortcuts = [
    ...mainNavItems.map((item) => ({ ...item, group: 'Platform' })),
    ...adminNavGroups.flatMap((group) =>
        group.items.map((item) => ({ ...item, group: group.label })),
    ),
].filter((item) => isGetHref(item.href));

export function QuickAccess() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {shortcuts.map((item) => {
                const Icon = item.icon;

                return (
                    <Link
                        key={item.title}
                        href={item.href}
                        prefetch
                        className="group block rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                    >
                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-blue-500">
                            {Icon && <Icon className="h-6 w-6" />}
                        </div>

                        <h3 className="text-sm font-semibold text-slate-700">
                            {item.title}
                        </h3>

                        <p className="mt-1 text-[11px] text-slate-400">
                            {item.group}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
}
