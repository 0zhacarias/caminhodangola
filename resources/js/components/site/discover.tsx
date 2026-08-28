import { usePage } from '@inertiajs/react';
import { storageUrl } from '@/lib/utils';
import type { PorqueAngola } from '@/types/site';
import Picture6 from '../../assets/places/serra.jpg';

const TITULO_PADRAO = 'Africa’s Hidden Giant, Now More Open Than Ever';

export default function Discover() {
    const itens =
        usePage<{ porques_angola?: PorqueAngola[] }>().props.porques_angola ??
        [];

    const item = itens[0] ?? null;

    return (
        <div className="flex flex-col flex-wrap items-center justify-center p-16 max-md:p-8">
            <div className="my-8 flex w-full items-center gap-4">
                <hr className="flex-grow border-yellow-500" />
                <h6 className="text-xs whitespace-nowrap text-yellow-600 uppercase">
                    WHY ANGOLA
                </h6>
                <hr className="flex-grow border-yellow-500" />
            </div>

            <div className="my-8 flex flex-wrap gap-8">
                <div className="flex flex-col items-center justify-center gap-2 md:w-1/2">
                    <img
                        className="w-full rounded-xl border-4 border-yellow-500/20 md:w-[32rem]"
                        src={item?.imagem ? storageUrl(item.imagem) : Picture6}
                        alt={item?.titulo ?? ''}
                    />
                </div>
                <div className="flex flex-1 flex-col gap-4 max-md:py-8">
                    <h4 className="text-2xl font-semibold">
                        {item?.titulo ?? TITULO_PADRAO}
                    </h4>
                    {item ? (
                        <p className="text-justify whitespace-pre-line xl:w-2/3">
                            {item.descricao}
                        </p>
                    ) : (
                        <p className="text-justify xl:w-2/3">
                            Long known as one of Africa’s best-kept secrets,
                            Angola is a vast and diverse country that is only
                            just beginning to step into the international
                            spotlight. Once scarred by a long and difficult
                            civil war and years of political isolation, Angola
                            was for many years a challenging destination for
                            travelers. But today, the country is undergoing a
                            remarkable transformation, rebuilding with vision,
                            and opening its doors to the world like never
                            before.
                            <br />
                            <br />
                            One of the most significant steps in this new
                            chapter is Angola’s bold move to lift visa
                            requirements for citizens of over 98 countries. What
                            was once a bureaucratic obstacle for many
                            international visitors has now become an open
                            invitation. This groundbreaking change makes Angola
                            one of the most accessible destinations in Africa
                            today, a game changer for travelers eager to explore
                            off-the-beaten-path adventures.
                            <br />
                            <br />
                            From the golden dunes of the Namib Desert and the
                            mystical rock formations of Kamilunga canyon, to the
                            lush highlands of Huíla and the untouched beaches of
                            Cabo Ledo, Angola offers nature in its purest form.
                            Beyond its landscapes lies a rich cultural mosaic,
                            made up of over 40 ethnic groups with unique
                            traditions, music, crafts, and cuisine. Cities like
                            Luanda pulse with creativity and resilience, while
                            villages across the country offer intimate,
                            authentic cultural encounters.
                            <br />
                            <br />
                            Though Angola may still be building its tourism
                            infrastructure, it offers something rare: genuine
                            discovery. With private guided tours, you’ll not
                            only explore the country’s dramatic scenery but also
                            engage deeply with its people, stories, and soul.
                            <br />
                            <br />
                            Today, Angola is not just open it’s ready. For
                            travelers seeking more than a vacation those who
                            crave meaningful immersion, raw beauty, and
                            unforgettable experiences, Angola is calling louder
                            than ever before.
                        </p>
                    )}
                    {/* 
          <div className="flex flex-wrap gap-2">
            <img
              className="md:w-64 rounded-xl border-yellow-500/20 border-4"
              src={Picture8}
              alt=""
            />
            <img
              className="md:w-64 rounded-xl border-yellow-500/20 border-4"
              src={Picture9}
              alt=""
            />
          </div>*/}
                </div>
            </div>
        </div>
    );
}
