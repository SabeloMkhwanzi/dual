import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProvider, useSigner, useContract } from "wagmi";
import { COLLECTION_ABI } from "../../constants/index";
import { getJSONFromFileinCID } from "../../utils/storage";

const CollectionCard = ({ contract }) => {
  // eslint-disable-next-line
  const [details, setDetails] = useState({});

  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const ERC1155Contract = useContract({
    addressOrName: contract,
    contractInterface: COLLECTION_ABI,
    signerOrProvider: signer.data || provider,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const _details = await ERC1155Contract.contractHash();
      const data = await getJSONFromFileinCID(_details);
      setDetails(data);
    };
    fetchDetails();
  }, [ERC1155Contract, details]);

  const object = {
    contractAddress: contract,
    name: details.name,
    imageUrl: details.imgHash
      ? `https://ipfs.io/ipfs/${details.imgHash}`
      : "https://ipfs.io/ipfs/bafkreihnw3llk4qrssj7zx5rojeszg7mcridxamu523ad2a5twfp7b2r2e",
    description: details.description,
    link: details.link ?? "www.google.com",
  };

  return (
    <figure className="relative bg-gray-200 dark:bg-gray-600 w-full h-[450px] flex flex-col items-center flex-wrap overflow-hidden rounded-md">
      <div className="h-[70%] w-full">
        <img
          src="https://ipfs.io/ipfs/bafkreihnw3llk4qrssj7zx5rojeszg7mcridxamu523ad2a5twfp7b2r2e"
          alt="collection"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="w-full p-4 ">
        <p className="my-2 text-xl text-center">{details.name}</p>
        {/* <p>{details.description}</p> */}
        <Link
          to={{
            pathname: `/gamer/collection/${contract}`,
          }}
          state={{ object }}
          className="bttn bttn-primary text-indigo-500 hover:text-[#ffffff] trans "
        >
          View Collection
        </Link>
      </div>
    </figure>
  );
};

export default CollectionCard;
