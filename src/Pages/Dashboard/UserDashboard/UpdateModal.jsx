import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const UpdateModal = ({myProfile}) => {
  const axiosSecure = useAxiosSecure();

  const handleUpdateProfileInfo = (e) => {
    const name = e.target.name.value;
    const photo = e.target.photoUrl.value;
    const address = e.target.address.value;
    const updatedInfo = {
      name: name,
      photoUrl: photo,
      address: address,
    };

    axiosSecure
      .put(`usersUpdate/${myProfile._id}`, {updatedInfo})
      .then((res) => {
        console.log(res.data);
        toast.success("Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update");
        console.error("There was an error updating the comment!", error);
      });
  };

  return (
    <div className="modal-box">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleUpdateProfileInfo}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" defaultValue={myProfile?.email} disabled />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" defaultValue={myProfile?.name} placeholder="Enter your name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Photo URL</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="photoUrl" defaultValue={myProfile?.photoUrl} placeholder="Enter your photo url" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="address" placeholder="Enter your address" />
        </div>

        <div className="w-full flex justify-center">
          <input className="px-6 text-white  bg-blue-500 hover:bg-opacity-80 hover:text-black py-2  border-2 font-medium rounded-lg" type="submit" value="Update" />
        </div>
      </form>
      <form method="dialog">
        <button className="btn btn-sm bg-blue-500 text-white hover:text-black btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>
  );
};

UpdateModal.propTypes = {
  myProfile: PropTypes.object,
};

export default UpdateModal;
