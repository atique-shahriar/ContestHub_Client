import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const roles = ["Admin", "User", "Creator"];

  const {data: users = [], refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
    console.log(user);
    Swal.fire({
      title: "Are you sure to delete this one?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`users/${user._id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User is deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleMakeAdmin = (user) => {
    axiosSecure.put(`/users/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`${user.name} is an admin now!`);
      }
    });
  };

  const handleRoleChange = (e, user) => {
    const selectedRole = e.target.value;
    console.log(e.target.value);
    console.log(user.name);
    axiosSecure.put(`/users/${user._id}`, {role: selectedRole}).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`${user.name} is ${selectedRole} now!`);
      }
    });
  };

  return (
    <div>
      <h3 className="text-center text-3xl">Total Users: {users.length}</h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role == "Admin" ? "Admin" : user.role == "Creator" ? "Creator" : "User"}</td>
                <td>
                  <button
                    className="text-2xl bg-blue-500 text-white p-2 rounded-md"
                    onClick={() => handleMakeAdmin(user)}>
                    <FaUsers></FaUsers>
                  </button>
                </td>
                <td>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => handleRoleChange(e, user)}
                    value={user.role}>
                    <option
                      value={user.role}
                      disabled>
                      {user.role}
                    </option>

                    {roles
                      .filter((role) => role !== user.role)
                      .map((role) => (
                        <option
                          key={role}
                          value={role}>
                          {role}
                        </option>
                      ))}
                  </select>

                  <button
                    className="btn"
                    onClick={() => handleDeleteUser(user)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
