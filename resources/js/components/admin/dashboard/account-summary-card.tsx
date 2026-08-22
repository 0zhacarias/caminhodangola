import { GlobeIcon, TrendingUpIcon } from 'lucide-react';
import { DashboardCard, DashboardCardHeader } from './dashboard-card';
import { accountValues, months } from './data';

export function AccountSummaryCard() {
    return (
        <DashboardCard className="lg:col-span-6">
            <DashboardCardHeader title="Account Summary" className="mb-4" />

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <div className="flex items-center gap-2">
                        <GlobeIcon className="h-7 w-7 text-blue-500" />

                        <span className="text-3xl font-semibold text-slate-800">
                            $9500
                        </span>

                        <TrendingUpIcon className="h-5 w-5 text-emerald-500" />
                    </div>

                    <p className="mt-5 text-xs leading-5 text-slate-400">
                        This dashboard unquestionably the largest visitors in
                        the world with TWO million monthly active users and many
                        daily active users.
                    </p>

                    <button
                        type="button"
                        className="mt-5 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    >
                        Download Reports
                    </button>
                </div>

                <div className="flex items-end gap-3">
                    {accountValues.map((value, index) => (
                        <div
                            key={index}
                            className="flex flex-1 flex-col items-center gap-2"
                        >
                            <span className="text-[9px] text-slate-400">
                                {value}
                            </span>

                            <div
                                className="w-full rounded-t bg-blue-500 transition hover:bg-blue-600"
                                style={{ height: `${value * 2}px` }}
                            />

                            <span className="text-[9px] text-slate-400">
                                {months[index]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardCard>
    );
}
