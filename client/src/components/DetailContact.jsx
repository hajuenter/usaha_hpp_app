import React, { useEffect, useRef, useState } from "react";
import { Mail, Github, Instagram, User, MessageSquareText } from "lucide-react";
import { toast } from "react-toastify";

const DetailContact = () => {
  const formRef = useRef(null);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwyJVxgDNpC5wxhjsPXclCFTbGKpcazjyPc0BWCbCTTPFP_PWuezjXh5RAccJTnwAJ3Fw/exec";
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

    if (!form) {
      toast.error("Form tidak ditemukan!");
      return;
    }
    setLoading(true);
    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    })
      .then(() => {
        toast.success("Pesan berhasil dikirim!", {
          position: "top-center",
          autoClose: 3000,
        });
        form.reset();
      })
      .catch((error) => {
        toast.error("Gagal mengirim pesan!", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error("Error!", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="w-full px-4 md:px-10 lg:px-20 lg:pt-24 pt-20 bg-white">
      <h1 className="text-2xl font-semibold text-center mb-5">Hubungi Saya</h1>

      <div className="flex flex-col md:flex-row gap-10 justify-between">
        {/* Form Kontak */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 shadow-lg rounded-lg">
          <form
            ref={formRef}
            name="submit-to-google-sheet"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-700"
              >
                Nama
              </label>
              <div className="relative">
                <input
                  disabled={loading}
                  required
                  type="text"
                  id="name"
                  name="nama"
                  placeholder="Masukkan nama Anda"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <User className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <input
                  required
                  disabled={loading}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Masukkan email Anda"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Mail className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-medium text-gray-700"
              >
                Pesan
              </label>
              <div className="relative">
                <textarea
                  disabled={loading}
                  id="message"
                  required
                  name="pesan"
                  rows="5"
                  placeholder="Tulis pesan Anda..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
                <MessageSquareText className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full transition font-medium ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                "Kirim Pesan"
              )}
            </button>
          </form>
        </div>

        {/* Informasi Kontak */}
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-gray-50 p-8 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Informasi Kontak
          </h3>
          <p className="mb-4 text-gray-600">
            Anda bisa menghubungi Saya melalui informasi di bawah ini. Saya akan
            merespon secepat mungkin.
          </p>

          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <Mail className="text-blue-600 w-5 h-5" />
              <span>
                <strong>Email:</strong>{" "}
                <span className="text-blue-600 hover:underline">
                  esjeruk517@gmail.com
                </span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Github className="text-blue-600 w-5 h-5" />
              <span>
                <strong>GitHub:</strong>{" "}
                <a
                  href="https://github.com/hajuenter"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  hajuenter
                </a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="text-blue-600 w-5 h-5" />
              <span>
                <strong>Instagram:</strong>{" "}
                <a
                  href="https://instagram.com/shusui_songolas"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @shusui_songolas
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailContact;
