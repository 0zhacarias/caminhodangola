import { DashboardCard } from './dashboard-card';

export function TicketsCard() {
    return (
        <DashboardCard className="lg:col-span-3">
            <h3 className="font-semibold text-slate-800">Tickets</h3>

            <div className="relative mx-auto mt-5 h-36 w-36">
                <div className="absolute inset-0 rounded-full border-[25px] border-blue-200" />

                <div className="absolute inset-[22px] rounded-full border-[20px] border-blue-500" />

                <div className="absolute inset-[43px] rounded-full border-[10px] border-blue-300" />
            </div>

            <div className="mt-3 flex justify-center gap-4 text-[10px]">
                <span>
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                    New
                </span>

                <span>
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-400" />
                    In Progress
                </span>

                <span>
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-200" />
                    Completed
                </span>
            </div>

            <div className="mt-4 text-center">
                <p className="text-2xl font-semibold text-slate-800">333</p>

                <p className="text-xs text-slate-400">
                    21% higher than last month
                </p>
            </div>
        </DashboardCard>
    );
}
