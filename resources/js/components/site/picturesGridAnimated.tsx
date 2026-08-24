import { useEffect, useMemo, useState } from "react";
import Picture1 from "../../assets/pic1.jpg";
import Picture2 from "../../assets/pic2.jpg";
import Picture3 from "../../assets/pic3.jpg";
import Picture4 from "../../assets/pic4.jpg";
import Picture5 from "../../assets/pic5.jpg";
import Picture6 from "../../assets/pic6.jpg";
import Picture7 from "../../assets/pic7.jpg";
import Picture8 from "../../assets/pic8.jpg";
import Picture9 from "../../assets/pic9.jpg";
import Picture10 from "../../assets/pic10.jpg";
import Picture11 from "../../assets/pic11.jpg";

export function PicturesGridAnimated() {
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pictures = [
    Picture1, Picture2, Picture3, Picture4,
    Picture5, Picture6, Picture7, Picture8,
    Picture9, Picture10, Picture11
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = useMemo(() => {
    const count = isMobile ? 1 : 2;
    const limitedPictures = isMobile ? pictures.slice(0, 4) : pictures;

    return Array.from({ length: count }, (_, i) =>
      limitedPictures.filter((_, index) => index % count === i)
    );
  }, [isMobile]);

  return (
    <div className="relative bg-transparent w-screen flex justify-center items-center px-8">
      <div className="py-12">
        <div className="flex flex-col md:flex-row justify-center gap-8 overflow-auto touch-auto">
          {columns.map((col, i) => (
            <div
              key={i}
              className="relative h-[20rem] md:h-[35rem] overflow-hidden 
              [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]
              flex-1"
              onMouseDown={() => setPaused(true)}
              onMouseUp={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              <div
                className={`flex flex-col ${
                  paused ? "animate-none" : "animate-infinite-scroll-vertical"
                }`}
              >
                {[...col, ...col].map((img, index) => (
                  <img
                    key={`${i}-${index}`}
                    src={img}
                    className="max-md:w-64 md:h-64 mb-4 rounded-md object-cover shadow-md"
                    alt={`Imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
