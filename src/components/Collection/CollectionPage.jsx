// eslint-disable-next-line
import { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { BiGlobe } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useProvider, useAccount, useSigner, useContract } from "wagmi";
import { COLLECTION_ABI } from "../../constants/index";
import NFTCard from "../NFT/NFTCard";

function CollectionPage() {
  const { state } = useLocation();
  const { isConnected } = useAccount();
  const { contractAddress, name, imageUrl, description, link } = state.object;
  const [tokenURIs, setTokenURIs] = useState([]);
  //Contract instance
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const CollectionContract = useContract({
    addressOrName: contractAddress,
    contractInterface: COLLECTION_ABI,
    signerOrProvider: signer.data || provider,
  });
  useEffect(() => {
    const allContracts = async () => {
        if (isConnected) {
            try {
                let tokensTot = await CollectionContract.getTotalChildren();
                let toks = [];
                for (let i = 1; i <= tokensTot; i++) toks.push(i);
                setTokenURIs(toks);
            } catch (err) {
                console.log(err);
                setTokenURIs([]);
            }
      }
    };
    allContracts();
  }, [isConnected, CollectionContract]);

  return (
    <div className="min-h-screen w-full flex flex-col text-ld font-pop">
      <div className="relative w-[200px] h-[200px] mx-auto mt-12 bg-transparent rounded-full overflow-hidden">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-center object-cover absolute"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 items-center justify-center max-w-5xl mx-auto px-4">
        <div className="flex gap-2 items-center justify-center">
          <p className="text-center text-xl md:text-2xl dark:text-[#ffffff] font-medium">
            {name}
          </p>
          <MdVerified className="w-6 h-6 text-blue-600 " />
        </div>
        <p className="text-center text-sm md:text-base dark:text-[#ffffff]">
          {description}
        </p>
        <div className="flex gap-4 items-center justify-center pt-2">
          <BiGlobe className="w-6 h-6 text-slate-600 dark:text-white cursor-pointer" />
          <a href={link} target="_blank" rel="noreferrer">
            <BsTwitter className="w-6 h-6 text-blue-600 cursor-pointer" />
          </a>
        </div>
      </div>

      {/* Collection Cards if any */}
      {tokenURIs.length > 0 && (
        <>
          <div className="my-32 w-full">
            <ul className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tokenURIs.map((uri, index) => (
                <li key={index}>
                      <NFTCard uri={uri} contractAddress={contractAddress} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {/* If no collections */}
      {tokenURIs.length === 0 && (
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center mt-8">
          <h1>No collectibles yet</h1>
        </div>
      )}
    </div>
  );
}

export default CollectionPage;
