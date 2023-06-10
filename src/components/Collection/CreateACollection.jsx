/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import CollectionItemModal from "../Modals/CollectionItemModal";
import { useProvider, useSigner, useContract } from "wagmi";
import { FACTORY_ADDRESS, FACTORY_ABI } from "../../constants/index";
import { pushImgToStorage, putJSONandGetHash } from "../../utils/storage";
import LoadingModal from "../Modals/LoadingModal";
import toast from "react-hot-toast";
import MintAllModal from "../Modals/MintAllModal";

const CreateACollection = () => {
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const FactoryContract = useContract({
    addressOrName: FACTORY_ADDRESS,
    contractInterface: FACTORY_ABI,
    signerOrProvider: signer.data || provider,
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [collectionAddress, setCollectionAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMintAll, setShowMintAll] = useState(false);
  const [collectionInfo, setCollectionInfo] = useState({
    name: "",
    link: "",
    description: "",
    imgHash: "",
  });
  const { name, link, description } = collectionInfo;

  // Array to store the hashes and quantities
  // eslint-disable-next-line
  const [items, setItems] = useState([]);
  // eslint-disable-next-line
  const [quantity, setQuantity] = useState([]);

  //array to display added items to ui
  const [itemsObject, setItemsObject] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleCollectionInfoChange = (e) => {
    setCollectionInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const createCollection = async () => {
    try {
      setLoading(true);
      console.log("uploading image");

      // hashing image
      const imgHashipfs = await pushImgToStorage(image);
      console.log("Image hash: ", imgHashipfs);

      // add image hash to collectionInfo
      setCollectionInfo((prev) => ({ ...prev, imgHash: imgHashipfs }));
      console.log(imgHashipfs, collectionInfo);

      // uploading collection
      const collectionHash = await putJSONandGetHash(collectionInfo);
      console.log("Collection hash: ", collectionHash);

      const ids = [];
      for (let i = 1; i <= items.length; i++) {
        ids.push(i);
      }

      // upload artist to Fillion
      const txResponse = await FactoryContract.deployERC1155(
        collectionHash,
        items,
        ids,
        quantity
      );
      const txReceipt = await txResponse.wait();
      console.log(txReceipt.events[0].address);
      setCollectionAddress(txReceipt.events[0].address);
      setShowMintAll(true);

      setCollectionInfo({ name: "", link: "", description: "", imgHash: "" });
      setItems([]);
      setQuantity([]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setCollectionInfo({ name: "", link: "", description: "", imgHash: "" });
      setItems([]);
      setQuantity([]);
      setCollectionAddress(null);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {loading && <LoadingModal />}
      {collectionAddress && showMintAll && (
        <MintAllModal collectionAddress={collectionAddress} />
      )}
      {showForm && (
        <CollectionItemModal
          setShowForm={setShowForm}
          setItems={setItems}
          setQuantity={setQuantity}
          setItemsObject={setItemsObject}
        />
      )}
      <div className="w-full min-h-screen p-4 mx-auto text-ld md:py-20 max-w-7xl">
        <h1 className="pb-4 text-3xl tracking-tighter text-center text-indigo-700 lg:text-5xl dark:text-indigo-500">
          Create a collection
        </h1>

        <div className="mx-auto">
          {/* COLLECTION PREVIEW IMAGE */}
          <div className="w-full py-2 md:w-1/2 md:mx-auto">
            <p className="py-2 md:py-4 text-[12px]">
              <Required />
              Required fields
            </p>
            <p className="py-1 text-bold">
              <Required />
              Choose a Collection Preview Image
            </p>
            <p className="text-xs">File types supported: JPG, PNG, GIF, SVG</p>
            <div className="max-w-[200px] overflow-hidden">
              <label
                htmlFor="collection_image"
                className="cursor-pointer w-fit"
              >
                <div className="my-4 w-[200px] h-[200px] border border-dashed border-gray-500 flex items-center justify-center">
                  {!image && (
                    <span className="text-xl text-ld md:text-3xl">+</span>
                  )}
                  {image && (
                    <img
                      src={imageUrl}
                      className="inset-0 z-10 object-cover object-center w-full h-full"
                      alt=""
                    />
                  )}
                </div>
              </label>
              <input
                type="file"
                id="collection_image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Wrapper */}
          <div className="w-full space-y-4 md:w-1/2 md:mx-auto">
            {/* Collection Name */}
            <div className="">
              <label htmlFor="">
                <Required />
                Collection Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 form-input"
                value={name}
                onChange={handleCollectionInfoChange}
              />
            </div>
            {/* External Link */}
            <div className="">
              <label htmlFor="">External link</label>
              <p className="text-xs">
                Dual will include a link to this URL on this item's detail page,
                so that users can click to learn more about it. You are welcome
                to link to your own webpage with more details.
              </p>
              <input
                type="text"
                id="link"
                className="w-full mt-2 form-input"
                value={link}
                onChange={handleCollectionInfoChange}
              />
            </div>
            {/* Description */}
            <div className="">
              <label htmlFor="">
                <Required />
                Description
              </label>
              <textarea
                name=""
                id="description"
                cols="30"
                rows="10"
                className="w-full mt-2 form-input"
                placeholder="Tell us about this collection"
                value={description}
                onChange={handleCollectionInfoChange}
              ></textarea>
            </div>
          </div>
          {/* Show Form Button */}
          <div className="mt-8 lg:mt-16">
            <h1 className="pb-4 mb-6 text-3xl tracking-tighter text-center text-indigo-700 lg:text-4xl dark:text-indigo-500">
              Add Items to the collection
            </h1>
            <div className="flex items-center justify-center mx-auto">
              <button
                onClick={() => setShowForm(true)}
                className="bttn-4 bttn-primary"
              >
                Add an Item
              </button>
            </div>
          </div>
        </div>

        {/* Table of Collection Items */}

        {itemsObject.length > 0 ? ( // If there are items in the array of itemsObject
          <div className="relative my-8 overflow-x-auto shadow-md sm:rounded-lg">
            <div classNameName="text-left w-full text-3xl text-semibold text-indigo-700 dark:text-indigo-500 my-4">
              COLLECTION ITEMS
            </div>
            <table className="w-full text-sm text-left text-gray-500 table-auto dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cover Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemsObject.map((item, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className=" w-14 square aspect-square rounded-full border-[3px] border-indigo-600 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt="Preview"
                          className="object-cover object-center w-full h-full"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.itemName}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{item.qty}</td>
                    <td className="px-6 py-4">{item.price} FIL</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {items.length > 0 ? (
          <div className="flex items-center justify-center mx-auto">
            <button className="bttn-4 bttn-primary" onClick={createCollection}>
              Create Collection
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CreateACollection;

const Required = () => {
  return (
    <span className="font-bold text-indigo-700 dark:text-indigo-500">*</span>
  );
};
