import { cn } from '@/lib/utils';
import { DashboardCard, DashboardCardHeader } from './dashboard-card';
import { issues } from './data';
import type { IssueLevel } from './data';

const levelClasses: Record<IssueLevel, string> = {
    High: 'bg-red-100 text-red-600',
    Medium: 'bg-blue-100 text-blue-600',
    Low: 'bg-slate-100 text-slate-500',
};

export function IssuesCard() {
    return (
        <DashboardCard>
            <DashboardCardHeader title="Issues" />

            <div className="mt-4 space-y-4">
                {issues.map((issue) => (
                    <div
                        key={issue.title}
                        className="flex items-center justify-between gap-3"
                    >
                        <div>
                            <p className="text-xs text-slate-700">
                                {issue.title}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                                {issue.time}
                            </p>
                        </div>

                        <span
                            className={cn(
                                'rounded-full px-3 py-1 text-[9px] font-semibold',
                                levelClasses[issue.level],
                            )}
                        >
                            {issue.level}
                        </span>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
