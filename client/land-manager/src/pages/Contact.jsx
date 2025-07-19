import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for your message! We'll be in touch soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">Contact Us</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form - Left */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-md rounded">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info and Socials - Right */}
        <div className="bg-gray-100 p-6 rounded shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">How to Reach Us</h3>
            <p className="text-gray-700 mb-4">
              Need help or have inquiries? We're happy to assist you. Use the form or reach us through our channels below.
            </p>
            <p className="text-sm text-gray-600 mb-2"><strong>Email:</strong> support@landwise.co.ke</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Phone:</strong> +254 712 345 678</p>
            <p className="text-sm text-gray-600"><strong>Location:</strong> Siaya, Kenya</p>
          </div>

          {/* Social Media Icons */}
          <div className="mt-10">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Follow Us</h4>
            <div className="flex space-x-4 text-xl text-green-700">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
