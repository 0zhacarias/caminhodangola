import { WalletIcon } from 'lucide-react';
import { DashboardCard } from './dashboard-card';
import { revenue } from './data';

export function RevenueCard() {
    return (
        <DashboardCard className="lg:col-span-6">
            <h3 className="font-semibold text-slate-800">Revenue</h3>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col justify-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-300">
                        <WalletIcon className="h-6 w-6 text-blue-500" />
                    </div>

                    <p className="mt-3 text-center text-xs text-slate-400">
                        Total Revenue (This Month)
                    </p>

                    <p className="text-center text-2xl font-semibold text-slate-800">
                        $4,280
                    </p>

                    <p className="text-center text-sm font-semibold text-emerald-500">
                        +6.4%
                    </p>

                    <p className="mt-2 text-center text-[10px] text-slate-400">
                        Steady growth driven by repeat customers and improved.
                    </p>

                    <div className="mt-4 rounded border border-blue-300 p-2">
                        <div className="flex justify-between text-[10px]">
                            <span>Monthly Target</span>
                            <span>$8,000</span>
                        </div>

                        <div className="mt-2 h-1 rounded bg-slate-200">
                            <div className="h-1 w-[54%] rounded bg-blue-500" />
                        </div>

                        <p className="mt-1 text-[9px] text-slate-400">
                            54% achieved
                        </p>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="h-56">
                        <svg
                            viewBox="0 0 500 220"
                            className="h-full w-full"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient
                                    id="revenueGradient"
                                    x1="0"
                                    x2="0"
                                    y1="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="currentColor"
                                        stopOpacity=".6"
                                        className="text-blue-300"
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="currentColor"
                                        stopOpacity=".05"
                                        className="text-blue-100"
                                    />
                                </linearGradient>
                            </defs>

                            <path
                                d="M0 190 C60 170, 70 145, 120 140 S180 70, 240 65 S310 30, 370 50 S430 140, 500 105 L500 220 L0 220Z"
                                fill="url(#revenueGradient)"
                            />

                            <path
                                d="M0 190 C60 170, 70 145, 120 140 S180 70, 240 65 S310 30, 370 50 S430 140, 500 105"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-blue-600"
                            />
                        </svg>
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400">
                        {revenue.map((item) => (
                            <span key={item.label}>{item.label}</span>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
