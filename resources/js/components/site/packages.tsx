import { Link } from '@inertiajs/react';
import { storageUrl } from '@/lib/utils';
import type { Pacote } from '@/types/site';

interface PackagesProps {
  pacotes: Pacote[];
}

export default function Packages({ pacotes }: PackagesProps) {
  return (
    <section className="py-16 px-6 md:px-32">
      <h2 className="text-3xl font-bold text-center mb-8">Our Packages</h2>

      <div className="grid gap-8 lg:grid-cols-3">
        {pacotes.map((pkg, index) => (
          <Link href={`/pacotes/${pkg.slug}`} key={index} className="cursor-pointer">
            <div
              className="relative h-96 border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition hover:scale-[1.02]"
            >
              <img
                src={pkg.imagem ? storageUrl(pkg.imagem) : ''}
                alt={pkg.titulo}
                className="object-cover h-full w-full absolute z-0"
              />

              <div className="p-2 pt-40 bg-gradient-to-t from-black to-transparent z-10 absolute bottom-0 w-full">
                <h3 className="text-lg font-semibold mb-2 text-slate-50">
                  {pkg.titulo}
                </h3>
                <hr className="my-2 mb-4 border-yellow-600 bg-yellow-600 h-0.5" />
                <div className="flex items-center">
                  <p className="text-sm text-slate-50 mb-4">
                    {pkg.descricao}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
