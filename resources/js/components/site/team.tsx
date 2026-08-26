import { storageUrl } from "@/lib/utils";
import type { MembroEquipa } from "@/types/site";

interface TeamSectionProps {
  membros: MembroEquipa[];
}

export default function TeamSection({ membros }: TeamSectionProps) {
  return (
    <section className="py-16 px-6 md:px-32 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Meet the Team</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Our local, passionate team brings Angola to life — from logistics to cultural immersion.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {membros.map((member) => (
            <article
              key={member.id}
              className="bg-gray-50 border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
            >
              <div className="w-full h-64 md:h-72 lg:h-80 overflow-hidden">
                <img
                  src={member.foto ? storageUrl(member.foto) : ''}
                  alt={`${member.nome} photo`}
                  className="w-full h-full object-cover object-center rounded-t-2xl"
                  loading="lazy"
                />
              </div>

              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-800">{member.nome}</h3>
                <p className="mt-1 text-sm font-medium text-yellow-600">{member.cargo}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
