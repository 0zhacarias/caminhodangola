import { DownloadIcon } from 'lucide-react';
import { DashboardCard } from './dashboard-card';
import { reportItems } from './data';

export function ReportsCard() {
    return (
        <DashboardCard>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Reports</h3>

                <DownloadIcon className="h-4 w-4 text-slate-400" />
            </div>

            <div className="mt-5 space-y-3">
                {reportItems.map((report) => (
                    <div key={report.name} className="flex items-center gap-3">
                        <span className="w-24 text-right text-[10px] text-slate-500">
                            {report.name}
                        </span>

                        <div className="flex-1">
                            <div className="h-2 rounded bg-slate-100">
                                <div
                                    className="h-2 rounded bg-blue-500"
                                    style={{ width: `${report.value}%` }}
                                />
                            </div>
                        </div>

                        <span className="w-7 text-[10px] text-slate-400">
                            {report.value}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 border-t pt-5">
                <div className="text-center">
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 text-blue-500">
                        ✓
                    </div>

                    <p className="mt-2 text-xl font-semibold">98</p>

                    <p className="text-[10px] text-slate-400">Completed</p>
                </div>

                <div className="text-center">
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 text-blue-500">
                        ⏳
                    </div>

                    <p className="mt-2 text-xl font-semibold">42</p>

                    <p className="text-[10px] text-slate-400">Pending</p>
                </div>

                <div className="text-center">
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 text-blue-500">
                        +
                    </div>

                    <p className="mt-2 text-xl font-semibold">29</p>

                    <p className="text-[10px] text-slate-400">New</p>
                </div>
            </div>
        </DashboardCard>
    );
}
