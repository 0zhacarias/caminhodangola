import { PicturesGridAnimated } from "./picturesGridAnimated";

export default function Highlights() {
  return (
    <div className="p-16 flex flex-col justify-center items-center">
      <div className="flex items-center w-full gap-4 my-8">
        <hr className="flex-grow border-yellow-500" />
        <h6 className="text-xs uppercase text-yellow-600 whitespace-nowrap">
          UNVEILING ANGOLA’S TREASURES
        </h6>
        <hr className="flex-grow border-yellow-500" />
      </div>

      <h6 className="text-xl font-bold">
        Top picks from those who’ve explored with us
      </h6>
      <p className="w-4/5 my-4 text-center">
        Wander through the remote dunes of Namibe, feel the power of Calandula’s
        majestic waterfalls, or step back in time in the historic capital of
        M’Banza Congo. These standout locations have captured the hearts of many
        — come see why they’re among our most visited spots.
      </p>
      <div className="flex my-8">
        
        <PicturesGridAnimated />
        
      </div>
    </div>
  );
}
