import "./App.css";
import AddUserForm from "./AddUserForm";
import Modal from "./Modal";
import React, { useEffect } from "react";
import api from "./api";
function App() {
  const [users, setUsers] = React.useState([]);
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState({
    key: "",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = React.useState(""); // For search input
  const [filteredUsers, setFilteredUsers] = React.useState([]); // Store filtered users

  const fetchLeaderBoardData = async () => {
    try {
      const userList = await api.getUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleRemoveItems = async (user) => {
    try {
      await api.deleteUser(user.id);
      // setUsers(userList);
      fetchLeaderBoardData();
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const createUser = async (formData) => {
    try {
      await api.addUser(formData);
      // setUsers(userList);
      fetchLeaderBoardData();
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsDataLoading(false);
      setIsModalOpen(false);
    }
  };
  const updatePoints = async (id, value, increment = true) => {
    try {
      await api.updateUserPoints(id, increment ? 1 : -1);
      // setUsers(userList);
      fetchLeaderBoardData();
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsDataLoading(false);
      setIsModalOpen(false);
    }
  };

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  React.useEffect(() => {
    fetchLeaderBoardData();
  }, []);
  React.useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div>
      <div className="container mx-auto w-full justify-center">
        <h1 className="text-3xl font-bold text-center mb-4">Leader board</h1>

        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5"
           
          />
        </div>

        <div className="border rounded-lg">
          <div className=" p-4 ">
            <div className="flex items-center justify-between gap-4">
              <button className=" text-white font-bold py-2 px-4 rounded-full"></button>
              <div
                className=" p-2 text-sm rounded-md w-1/2"
                onClick={() => sortData("name")}
              >
                Names{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </div>
              <div className="flex space-x-2">
                <button className=" text-white font-bold py-2 px-4 rounded-full"></button>
                <button className=" text-white font-bold py-2 px-4 rounded-full"></button>
              </div>
              <span
                className="text-sm w-1/6 text-right"
                onClick={() => sortData("points")}
              >
                Points{" "}
                {sortConfig.key === "points" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </span>
            </div>
          </div>
          {!isDataLoading
            ? filteredUsers.map((user, index) => (
                <div key={index} className="border-t-2 p-4 ">
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={() => {
                        handleRemoveItems(user);
                      }} //handleUpdatePoints(index, user.points + 1)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                      x
                    </button>
                    <div
                      className="border p-2 rounded-md w-1/2"
                      onClick={() => {
                        setSelectedUser(user);
                      }}
                    >
                      {user.name}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          updatePoints(user.id, user.points);
                        }} //handleUpdatePoints(index, user.points + 1)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          updatePoints(user.id, user.points, false);
                        }} //handleUpdatePoints(index, user.points - 1)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                      >
                        -
                      </button>
                    </div>
                    <span className="text-xl w-1/6 text-right">
                      {user.points} points
                    </span>
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          + Add User
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddUserForm onAddUser={createUser} />
        </Modal>

        <Modal isOpen={selectedUser} onClose={() => setSelectedUser(null)}>
          {selectedUser && (
            <div>
              <h2>{selectedUser.name}</h2>
              <p>
                <strong>Age:</strong> {selectedUser.age}
              </p>
              <p>
                <strong>Points:</strong> {selectedUser.points}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address}
              </p>
              {/* <button onClick={()=>{}}>Close</button> */}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
