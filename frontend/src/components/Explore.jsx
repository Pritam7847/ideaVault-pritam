import React, { useEffect, useState } from "react";

export default function Explore() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({}); // store comment per idea

  // Fetch all ideas
  useEffect(() => {
    fetch("http://localhost:5000/api/ideas")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch ideas");
        return res.json();
      })
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Handle upvote
  const handleUpvote = (id) => {
    fetch(`http://localhost:5000/api/ideas/${id}/upvote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((updatedIdea) => {
        setIdeas((prev) =>
          prev.map((idea) => (idea._id === id ? updatedIdea : idea))
        );
      })
      .catch((err) => console.error("Upvote error:", err));
  };

  // Handle add comment
  const handleAddComment = (id) => {
    if (!commentText[id]?.trim()) return;

    fetch(`http://localhost:5000/api/ideas/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: commentText[id] }),
    })
      .then((res) => res.json())
      .then((updatedIdea) => {
        setIdeas((prev) =>
          prev.map((idea) => (idea._id === id ? updatedIdea : idea))
        );
        setCommentText((prev) => ({ ...prev, [id]: "" }));
      })
      .catch((err) => console.error("Comment error:", err));
  };

  // Handle delete idea
 const handleDelete = async (id) => {
  try {
    console.log("Deleting ID:", id); // Debug log

    const res = await fetch(`http://localhost:5000/api/ideas/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to delete idea (status ${res.status})`);
    }

    const data = await res.json();
    console.log("Delete response:", data);

    // Remove from frontend
    setIdeas((prev) => prev.filter((idea) => idea._id !== id));
  } catch (error) {
    console.error("Error in delete:", error.message);
  }
};

  if (loading)
    return (
      <div className="p-6 text-center text-lg font-semibold text-gray-700">
        Loading ideas...
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-wide">
        Explore Ideas
      </h1>
      {ideas.length === 0 ? (
        <p className="text-center text-gray-600">No ideas found.</p>
      ) : (
        ideas.map((idea) => (
          <div
            key={idea._id}
            className="bg-white rounded-xl shadow-md mb-8 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  {idea.title}
                </h2>
                {/* Delete button */}
                <button
                  className="text-red-600 hover:text-red-800 font-semibold"
                  onClick={() => handleDelete(idea._id)}
                >
                  Delete
                </button>
              </div>

              <p className="text-gray-700 mb-5 leading-relaxed">
                {idea.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                <button
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold focus:outline-none"
                  onClick={() => handleUpvote(idea._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a2 2 0 012-2h3V5a3 3 0 016 0v3h3a2 2 0 012 2v1a2 2 0 01-2 2h-3v3a3 3 0 01-6 0v-3H4a2 2 0 01-2-2v-1z" />
                  </svg>
                  <span>{idea.upvotes || 0}</span>
                  <span>Upvotes</span>
                </button>
                <span>{idea.comments?.length || 0} Comments</span>
              </div>

              {/* Comments List */}
              {idea.comments && idea.comments.length > 0 && (
                <div className="bg-gray-100 p-4 rounded-lg mb-5 max-h-48 overflow-y-auto">
                  {idea.comments.map((c, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-800 border-b border-gray-200 last:border-0 py-1"
                    >
                      {c}
                    </p>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[idea._id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({
                      ...prev,
                      [idea._id]: e.target.value,
                    }))
                  }
                  className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => handleAddComment(idea._id)}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
