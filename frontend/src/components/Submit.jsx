import React, { useState } from "react";

const Submit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        title: formData.title,
        description: formData.description,
      };

      const res = await fetch("http://localhost:5000/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit idea");
      }

      alert("Idea submitted successfully!");
      setFormData({
        name: "",
        email: "",
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting idea. Please try again.");
    }
  };

  return (
    <>
      <div className="p-6 mt-10">
        <h1 className="text-2xl font-bold mb-4">
          Here, This is an Idea Submission for Students
        </h1>
        <p className="mb-4 text-gray-700">
          Share your innovative ideas and projects. Your creativity could make a
          difference!
        </p>

        <h2 className="text-xl font-semibold mb-2">
          <span className="text-red-700">Rules & Guidelines:</span>
        </h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Submit original ideas only — plagiarism is not allowed.</li>
          <li>Provide a clear title and detailed description of your idea.</li>
          <li>Ensure your idea is practical and feasible.</li>
          <li>Be respectful — inappropriate content will be rejected.</li>
        </ul>
      </div>

      <div className="p-3 mt-5 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-cyan-600 underline">
          Submit Your Idea
        </h2>
        <br />

        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-2xl"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border bg-black text-white border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border bg-black text-white border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Idea Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border bg-black text-white border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Describe your idea..."
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full border bg-black text-white border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            Submit Idea
          </button>
        </form>
      </div>
    </>
  );
};

export default Submit;
