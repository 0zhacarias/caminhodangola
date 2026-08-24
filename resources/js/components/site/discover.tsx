import Picture6 from "../../assets/places/serra.jpg";

export default function Discover() {
  return (
    <div className="max-md:p-8 p-16 flex flex-wrap flex-col justify-center items-center">
      <div className="flex items-center w-full gap-4 my-8">
        <hr className="flex-grow border-yellow-500" />
        <h6 className="text-xs uppercase text-yellow-600 whitespace-nowrap">
          WHY ANGOLA
        </h6>
        <hr className="flex-grow border-yellow-500" />
      </div>


      <div className="flex flex-wrap my-8 gap-8">
        <div className="md:w-1/2 flex flex-col justify-center items-center gap-2">
          <img
            className="w-full md:w-[32rem] rounded-xl border-yellow-500/20 border-4"
            src={Picture6}
            alt=""
          />
        </div>
        <div className="flex-1 max-md:py-8 flex flex-col gap-4">
          <h4 className="font-semibold text-2xl">
            Africa’s Hidden Giant, Now More Open Than Ever
          </h4>
          <p className="text-justify xl:w-2/3">
            Long known as one of Africa’s best-kept secrets, Angola is a vast
            and diverse country that is only just beginning to step into the
            international spotlight. Once scarred by a long and difficult civil
            war and years of political isolation, Angola was for many years a
            challenging destination for travelers. But today, the country is
            undergoing a remarkable transformation, rebuilding with vision, and
            opening its doors to the world like never before.
            <br /><br />
            One of the most significant steps in this new chapter is Angola’s
            bold move to lift visa requirements for citizens of over 98
            countries. What was once a bureaucratic obstacle for many
            international visitors has now become an open invitation. This
            groundbreaking change makes Angola one of the most accessible
            destinations in Africa today, a game changer for travelers eager to
            explore off-the-beaten-path adventures.
            <br /><br />
            From the golden dunes of the Namib Desert and the mystical rock
            formations of Kamilunga canyon, to the lush highlands of Huíla and
            the untouched beaches of Cabo Ledo, Angola offers nature in its
            purest form. Beyond its landscapes lies a rich cultural mosaic, made
            up of over 40 ethnic groups with unique traditions, music, crafts,
            and cuisine. Cities like Luanda pulse with creativity and
            resilience, while villages across the country offer intimate,
            authentic cultural encounters.
            <br /><br />
            Though Angola may still be building its tourism infrastructure, it
            offers something rare: genuine discovery. With private guided tours,
            you’ll not only explore the country’s dramatic scenery but also
            engage deeply with its people, stories, and soul.
            <br /><br />
            Today, Angola is not just open it’s ready. For travelers seeking
            more than a vacation those who crave meaningful immersion, raw
            beauty, and unforgettable experiences, Angola is calling louder
            than ever before.
          </p>
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
