import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import LoadingModal from "../Modals/LoadingModal";
import { pushImgToStorage, putJSONandGetHash } from "../../utils/storage";
import { useProvider, useSigner, useContract } from "wagmi";
import { ARTIST_CONTRACT_ADDRESS, ARTIST_ABI } from "../../constants/index";

function NewGamer() {
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const ArtistContract = useContract({
    addressOrName: ARTIST_CONTRACT_ADDRESS,
    contractInterface: ARTIST_ABI,
    signerOrProvider: signer.data || provider,
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  //handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //error handling
    if (!image) return toast.error("Please upload an image");
    if (!name) return toast.error("Please enter a name");
    if (!bio) return toast.error("Please enter a bio");
    if (bio.length > 400) return toast.error("Bio too long");
    if (name.length > 30) return toast.error("Name too long");

    if (image && name.length >= 1 && bio.length >= 5) {
      setLoading(true);
      console.log("uploading image");
      const imgHash = await pushImgToStorage(image);
      console.log("Image hash: ", imgHash);

      //create artist object
      const artist = {
        name,
        bio,
        imgHash,
      };
      const artistHash = await putJSONandGetHash(artist);
      console.log("Artist hash: ", artistHash);
      //push hash to contract
      const txResponse = await ArtistContract.newArtistSignup(artistHash);
      await txResponse.wait();

      setName("");
      setBio("");
      setImage(null);
      setImageUrl(null);
      setLoading(false);
      toast.success("Signup successful");
    } else {
      setLoading(false);
      toast.error("Please try again");
    }
  };

  return (
    <>
      {loading ? <LoadingModal /> : null}
      <div className="min-h-screen px-4 pt-6 sm:px-6 lg:px-6">
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* Title and Logo */}
          <div>
            <img
              className="w-auto h-12 mx-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Logo"
            />
            <h2 className="mt-6 text-xl font-semibold text-center sm:text-2xl md:text-3xl text-ld">
              Sign up as an artist/creator
            </h2>
            <p className="mt-2 text-sm text-center text-ld">
              Already an artist?{" "}
              <Link to="/collection/create">
                <span className="text-indigo-500 cursor-pointer">
                  Create a collection
                </span>
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="form-css" onSubmit={handleSubmit}>
            {/* Image Input and Preview Wrapper*/}
            <div
              className={
                imageUrl
                  ? `w-[80%] flex items-center justify-between mx-auto`
                  : `flex`
              }
            >
              {/* Image Input */}
              <div className={imageUrl ? `pb-1` : `pb-1 mx-auto`}>
                {/* Upload Image Icon */}
                <div>
                  <label
                    htmlFor="profile-image"
                    className="flex flex-col items-center justify-center w-16 text-sm rounded-full cursor-pointer square aspect-square bg-slate-200 dark:bg-slate-400"
                  >
                    <FiUpload className="text-ld text-[20px]" />
                    <span className="text-ld text-[10px] cursor-pointer">
                      Upload
                    </span>
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden text-ld"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                {/* Label for upload */}
                <div className="pt-2">
                  <label
                    htmlFor=""
                    className="-ml-8 text-sm font-medium text-ld"
                  >
                    Set a Profile photo
                  </label>
                </div>
              </div>
              {/* Preview */}
              {imageUrl && (
                <div className="flex flex-col gap-2">
                  <div className=" w-16 square aspect-square rounded-full border-[3px] border-indigo-600 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <p className="text-sm font-medium text-ld">Preview</p>
                </div>
              )}
            </div>
            {/* Name Input */}
            <div className="relative bg-inherit">
              <input
                type="text"
                id="name"
                required
                className="mb-2 peer form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name" className="form-label trans">
                Enter your name
              </label>
            </div>

            {/* Bio Input */}
            <div className="relative bg-inherit">
              <textarea
                name="bio"
                id="bio"
                className="peer form-input"
                placeholder="Tell your fans about yourself"
                cols="30"
                rows="2"
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <label htmlFor="bio" className="form-label trans">
                Tell your fans about yourself
              </label>
            </div>
            <p className="-mt-4 text-xs font-medium text-indigo-700 dark:text-indigo-400">
              Max 100 words
            </p>
            {/* Signup button */}
            <button className="bttn bttn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewGamer;
