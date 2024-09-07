import React from "react";

function AddUserForm({ onAddUser }) {
  const [formData, setFormData] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, age, address } = formData;
    // Validate input fields (optional)
    if (!name || !age  || !address) {
      alert("Please fill in all fields.");
      return;
    }

    // Pass the new user object to the onAddUser callback
    onAddUser({ ...formData, points: 0 });

    // Clear form fields (optional)
    setFormData({});
  };

  const handleFormData = (event) => {
    let tempFormData = formData;
    tempFormData[event.target.id] = event.target.value;
    setFormData(tempFormData);
  };
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Add User</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleFormData}
            className="border p-2 rounded-md w-full"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
            Age:
          </label>
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={handleFormData}
            className="border p-2 rounded-md w-full"
            placeholder="Enter age"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="points"
            className="block text-gray-700 font-bold mb-2"
          >
            Points:
          </label>
          <input
            type="number"
            id="points"
            value={formData.points}
            onChange={handleFormData}
            className="border p-2 rounded-md w-full"
            placeholder="Enter points"
            required
          />
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-bold mb-2"
          >
            Address:
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={handleFormData}
            className="border p-2 rounded-md w-full"
            rows="3"
            placeholder="Enter address"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
