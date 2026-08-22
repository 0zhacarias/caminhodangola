import { cn } from '@/lib/utils';
import { DashboardCard } from './dashboard-card';

const quarters = ['Q1 - $3k', 'Q2 - $4k', 'Q3 - $7k', 'Q4 - $9k'];

export function TargetCard() {
    return (
        <DashboardCard className="mt-3">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Target</h3>

                <div className="flex gap-4 text-[10px]">
                    <span>
                        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                        Sales
                    </span>

                    <span>
                        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-300" />
                        Revenue
                    </span>
                </div>
            </div>

            <div className="mt-5 h-32">
                <svg
                    viewBox="0 0 1200 180"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 140 C70 130 90 80 150 90 S220 140 280 110 S350 75 420 105 S500 135 570 95 S650 125 730 110 S800 85 860 105 S950 65 1010 70 S1080 55 1140 75 S1180 105 1200 80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-blue-600"
                    />

                    <path
                        d="M0 150 C80 150 100 140 150 135 S230 110 280 125 S350 150 420 145 S500 115 570 120 S650 80 730 110 S800 125 860 105 S950 120 1010 100 S1080 115 1140 85 S1180 65 1200 50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-blue-300"
                    />
                </svg>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {quarters.map((item, index) => (
                    <div
                        key={item}
                        className={cn(
                            'rounded border p-3',
                            index === 3 ? 'border-red-300' : 'border-blue-300',
                        )}
                    >
                        <div className="flex justify-between text-xs font-medium">
                            <span>{item}</span>
                        </div>

                        <div className="mt-2 h-1 rounded bg-slate-200">
                            <div
                                className={cn(
                                    'h-1 rounded',
                                    index === 3
                                        ? 'w-[90%] bg-red-500'
                                        : 'w-[70%] bg-blue-500',
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
