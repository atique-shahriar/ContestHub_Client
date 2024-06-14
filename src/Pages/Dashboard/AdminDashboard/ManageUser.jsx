import { useQuery } from "@tanstack/react-query";
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

  const handleBlocker = (user) => {
    axiosSecure.put(`/usersActivity/${user._id}`, {activity: "Block"}).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`${user.name} is block now!`);
      }
    });
  };

  const handleUnBlocker = (user) => {
    axiosSecure.put(`/usersActivity/${user._id}`, {activity: "Unblock"}).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`${user.name} is block now!`);
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
              <th>Role</th>
              <th>Role Manage</th>
              <th>Delete</th>
              <th>Block Status</th>
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
                </td>

                <td>
                  <button
                    className="btn"
                    onClick={() => handleDeleteUser(user)}>
                    Delete
                  </button>
                </td>
                <td>
                  {user.activity == "Block" ? (
                    <>
                      <button
                        className="btn"
                        onClick={() => handleUnBlocker(user)}>
                        Unblock
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn"
                        onClick={() => handleBlocker(user)}>
                        Block
                      </button>
                    </>
                  )}
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
