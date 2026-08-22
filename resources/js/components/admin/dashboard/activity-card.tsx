import { cn } from '@/lib/utils';
import { DashboardCard, DashboardCardHeader } from './dashboard-card';
import { activities } from './data';
import type { ActivityStatus } from './data';

const statusClasses: Record<ActivityStatus, string> = {
    Paid: 'bg-emerald-100 text-emerald-600',
    Issued: 'bg-blue-100 text-blue-600',
    Received: 'bg-cyan-100 text-cyan-600',
    Pending: 'bg-yellow-100 text-yellow-600',
};

export function ActivityCard() {
    return (
        <DashboardCard>
            <DashboardCardHeader title="Activity" />

            <div className="mt-4 space-y-4">
                {activities.map((activity) => (
                    <div key={activity.name} className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                            {activity.name.substring(0, 2).toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-700">
                                {activity.name}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                                {activity.action}
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                                <span className="text-[10px] text-slate-400">
                                    {activity.time}
                                </span>

                                <span
                                    className={cn(
                                        'rounded px-2 py-0.5 text-[9px]',
                                        statusClasses[activity.status],
                                    )}
                                >
                                    {activity.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
