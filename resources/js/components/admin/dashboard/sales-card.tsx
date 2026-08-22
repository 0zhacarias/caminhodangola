import { DashboardCard } from './dashboard-card';
import { sales } from './data';

export function SalesCard() {
    return (
        <DashboardCard className="lg:col-span-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Sales</h3>

                <div className="flex gap-3 text-[10px]">
                    <span>
                        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                        Revenue
                    </span>

                    <span>
                        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-300" />
                        Income
                    </span>
                </div>
            </div>

            <div className="mt-5 flex h-48 items-end justify-around gap-5">
                {sales.map((item) => (
                    <div
                        key={item.year}
                        className="flex h-full flex-1 items-end justify-center gap-1"
                    >
                        <div
                            className="w-4 rounded-t bg-blue-600"
                            style={{ height: `${item.revenue / 25}px` }}
                        />

                        <div
                            className="w-4 rounded-t bg-blue-300"
                            style={{ height: `${item.income / 25}px` }}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-around text-[10px] text-slate-400">
                {sales.map((item) => (
                    <span key={item.year}>{item.year}</span>
                ))}
            </div>

            <div className="mt-4 rounded border border-blue-300 p-3">
                <div className="flex justify-between text-xs">
                    <span>Monthly Target</span>
                    <span>$13,000</span>
                </div>

                <div className="mt-2 h-1 rounded bg-slate-200">
                    <div className="h-1 w-[76%] rounded bg-blue-500" />
                </div>

                <p className="mt-1 text-[10px] text-slate-400">76% achieved</p>
            </div>
        </DashboardCard>
    );
}
