
const highlights = [
  {
    image: "/assets/highlights/local-guides.jpg",
    title: "Experiência local autêntica",
    description:
      "Guias locais apaixonados que conhecem Angola como ninguém, oferecendo experiências reais e memoráveis.",
  },
  {
    image: "/assets/highlights/custom-itinerary.jpg",
    title: "Roteiros personalizados",
    description:
      "Escolha um dos nossos pacotes ou crie um itinerário sob medida de acordo com os seus interesses.",
  },
  {
    image: "/assets/highlights/small-groups.jpg",
    title: "Grupos pequenos e exclusivos",
    description:
      "Viagens mais íntimas e personalizadas, garantindo atenção individual e imersão cultural.",
  },
  {
    image: "/assets/highlights/safety-quality.jpg",
    title: "Qualidade e segurança",
    description:
      "Parcerias com operadores confiáveis, transporte seguro e suporte durante toda a sua jornada.",
  },
];

export default function Highlights() {
  return (
    <section className="bg-slate-100 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
          Por que escolher a Angola Trails?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Destaques que tornam sua viagem única, segura e inesquecível.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col items-start overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-800">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
