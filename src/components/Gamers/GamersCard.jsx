import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { getJSONFromCID } from "../../utils/storage";

function GamersCard({ artist }) {
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  let { artistAddress, artistDetails, dateJoined, id } = artist;
  //convert id from hex to int
  let idHex = id.toHexString();
  let idInt = parseInt(idHex.substring(2), 16);
  //convert dateJoined from hex to int
  dateJoined = dateJoined.toHexString();
  dateJoined = parseInt(dateJoined.substring(2), 16);
  //convert dateJoined from epoch to date
  dateJoined = new Date(dateJoined * 1000);
  dateJoined = dateJoined.toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      //fetch artist's name, bio, and profile picture from IPFS using artistDetails as the hash
      try {
        let res = await fetch(
          `https://ipfs.io/ipfs/${artistDetails}/file.json`
        ).then((res) => res.json());
        setName(res?.name);
        setBio(res?.bio);
        setImageUrl(res?.imgHash);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [artistDetails]);

  const object = {
    artistAddress,
    dateJoined,
    idInt,
    name,
    imageUrl,
    bio,
  };

  return (
    <div className=" dark:bg-inherit flex flex-col gap-2 relative w-full h-[300px] sm:h-[380px] rounded-lg overflow-hidden trans shadow-md cursor-pointer border-2 border-transparent dark:border-slate-700">
      <div className="w-full h-[55%] sm:h-[65%]">
        <img
          src={
            imageUrl
              ? `https://ipfs.io/ipfs/${imageUrl}`
              : "https://ipfs.io/ipfs/bafybeih2y7l7drbfuh45yjdqjgrucfjampulfen2kwefkwcfe3emsz2exu"
          }
          alt=""
          className="object-cover object-center w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-2 p-4">
        <p className="text-center text-base font-semibold text-indigo-700 dark:text-[#ffffff] flex items-center gap-2 pb-2">
          {name}
        </p>
        <Link
          to={{
            pathname: `/gamer/${artistAddress}`,
          }}
          state={{ object }}
          className="bttn bttn-artist text-indigo-500 hover:text-[#ffffff] trans "
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default GamersCard;
