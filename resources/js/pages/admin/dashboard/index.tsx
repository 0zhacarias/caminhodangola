import { Head } from '@inertiajs/react';
import { AccountSummaryCard } from '@/components/admin/dashboard/account-summary-card';
import { ActivityCard } from '@/components/admin/dashboard/activity-card';
import { ChatButton } from '@/components/admin/dashboard/chat-button';
import { HeroSearch } from '@/components/admin/dashboard/hero-search';
import { IncomeCard } from '@/components/admin/dashboard/income-card';
import { IssuesCard } from '@/components/admin/dashboard/issues-card';
import { QuickAccess } from '@/components/admin/dashboard/quick-access';
import { ReportsCard } from '@/components/admin/dashboard/reports-card';
import { RevenueCard } from '@/components/admin/dashboard/revenue-card';
import { SalesCard } from '@/components/admin/dashboard/sales-card';
import { TargetCard } from '@/components/admin/dashboard/target-card';
import { TicketsCard } from '@/components/admin/dashboard/tickets-card';
import { dashboard } from '@/routes/admin';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-full rounded-lg bg-slate-100 text-slate-700">
                <HeroSearch />

<section className="px-4 -mt-6 pb-10 lg:px-7">
                    <QuickAccess />
                    </section>
                <section className="-mt-12 px-4 pb-10 lg:px-7 hidden">

                    <div className="mt-3 grid gap-3 lg:grid-cols-12">
                        <AccountSummaryCard />
                        <IncomeCard />
                        <TicketsCard />
                    </div>

                    <div className="mt-3 grid gap-3 lg:grid-cols-12">
                        <RevenueCard />
                        <SalesCard />
                    </div>

                    <TargetCard />

                    <div className="mt-3 grid gap-3 lg:grid-cols-3">
                        <ActivityCard />
                        <IssuesCard />
                        <ReportsCard />
                    </div>
                </section>

                <ChatButton />
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
