import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export function HeroSearch() {
    const [query, setQuery] = useState('');

    return (
        <section className="bg-red-700 px-4 pt-8 pb-25 text-center lg:px-10">
            <h2 className="text-2xl font-bold text-white">
                Menus, Reservas e Configurações
            </h2>

            <div className="mx-auto mt-5 flex max-w-xl">
                <div className="relative flex-1">
                    <SearchIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Pesquisar o menu..."
                        className="h-11 w-full rounded-l-full border-0 bg-white pr-4 pl-11 text-sm outline-none"
                    />
                </div>

                <button
                    type="button"
                    className="-ml-1 rounded-r-full bg-yellow-500 px-6 text-sm font-medium text-white hover:bg-yellow -600"
                >
                    Pesquisar
                </button>
            </div>
        </section>
    );
}
