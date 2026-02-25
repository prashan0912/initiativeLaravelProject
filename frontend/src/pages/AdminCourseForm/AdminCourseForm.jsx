import { useState } from "react";
import axios from "axios";

export default function AdminCourseForm() {
  const [formData, setFormData] = useState({
    photo: null,
    title: "",
    teacher_name: "",
    teacher_info: "",
    rating: "",
    rating_count: "",
    price: ""
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:8000/api/course", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Course Created Successfully 🎉");

      setFormData({
        photo: null,
        title: "",
        teacher_name: "",
        teacher_info: "",
        rating: "",
        rating_count: "",
        price: ""
      });

      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong ");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center p-10">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          📚 Create New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Photo Upload */}
          <div>
            <label className="text-slate-300 block mb-2">Course Image</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="w-full text-white"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-40 rounded-xl object-cover"
              />
            )}
          </div>

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Teacher Name */}
          <input
            type="text"
            name="teacher_name"
            placeholder="Instructor Name"
            value={formData.teacher_name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Teacher Info */}
          <textarea
            name="teacher_info"
            placeholder="Instructor Information"
            value={formData.teacher_info}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Rating & Rating Count */}
          <div className="flex gap-4">
            <input
              type="number"
              step="0.01"
              name="rating"
              placeholder="Rating (4.50)"
              value={formData.rating}
              onChange={handleChange}
              required
              className="w-1/2 p-3 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <input
              type="number"
              name="rating_count"
              placeholder="Rating Count"
              value={formData.rating_count}
              onChange={handleChange}
              required
              className="w-1/2 p-3 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Price */}
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price (525.00)"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>

        </form>
      </div>
    </div>
  );
}