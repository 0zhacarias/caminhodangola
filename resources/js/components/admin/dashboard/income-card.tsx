import { DashboardCard, DashboardCardHeader } from './dashboard-card';

export function IncomeCard() {
    return (
        <DashboardCard className="lg:col-span-3">
            <DashboardCardHeader title="Income" />

            <div className="mt-5 h-36">
                <svg
                    viewBox="0 0 400 150"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 115 C60 105, 75 110, 120 95 S180 75, 220 85 S280 40, 330 55 S370 30, 400 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-blue-400"
                    />

                    <path
                        d="M0 120 C60 110, 75 115, 120 100 S180 80, 220 90 S280 45, 330 60 S370 35, 400 25 L400 150 L0 150Z"
                        className="fill-blue-50"
                    />
                </svg>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="rounded border border-blue-300 p-2">
                    <p className="text-xs font-semibold">Q3 - $7200</p>
                    <div className="mt-2 h-1 rounded bg-blue-500" />
                </div>

                <div className="rounded border border-blue-300 p-2">
                    <p className="text-xs font-semibold">Q4 - $4800</p>
                    <div className="mt-2 h-1 rounded bg-blue-500" />
                </div>
            </div>
        </DashboardCard>
    );
}
