import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "./../assets/assets";
import { TypeAnimation } from "react-type-animation";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useLoading } from "../contexts/LoadingContext";

const Hero = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const { handleImageLoad, setLoadingComplete } = useLoading();
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const imageSources = [
    assets.hero,
    assets.gmb1,
    assets.gmb2,
    assets.gmb3,
    assets.gmb4,
    assets.gmb5,
  ];

  useEffect(() => {
    let loadedCount = 0;

    const checkImageLoad = () => {
      loadedCount++;
      setImagesLoaded(loadedCount);

      if (loadedCount === imageSources.length) {
        // Semua gambar telah dimuat
        setTimeout(() => {
          setLoadingComplete();
        }, 500); // Delay sedikit untuk smooth transition
      }
    };

    // Preload semua gambar
    imageSources.forEach((src) => {
      const img = new Image();
      img.onload = checkImageLoad;
      img.onerror = checkImageLoad; // Tetap hitung meskipun error
      img.src = src;
    });
  }, [imageSources, setLoadingComplete]);

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/calculate");
    } else {
      toast.error("Silakan login terlebih dahulu");
    }
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="mt-14 pt-5 pb-10 w-full px-4 md:px-10 lg:px-12 flex flex-col md:flex-row items-center lg:gap-10 justify-between lg:mt-20 lg:pb-20">
          <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0 ease-in-out relative animate-float">
            {/* SVG Background */}
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute z-0 pointer-events-none w-[460px] h-[390px] -top-9 -right-8 lg:w-[800px] lg:h-[655px] lg:-top-20 lg:-right-20"
            >
              <path
                fill="#0F62FE"
                d="M44.5,-15C53.7,14.1,54.7,45.3,38.1,58.7C21.6,72.2,-12.3,68,-36.5,50.4C-60.7,32.8,-75,1.9,-67.3,-25.1C-59.6,-52,-29.8,-75,-6.1,-73.1C17.6,-71.1,35.2,-44.1,44.5,-15Z"
                transform="translate(100 100)"
              />
            </svg>

            {/* Gambar di atas SVG */}
            <img
              src={assets.hero}
              alt="Hero"
              className="w-[80%] max-w-md object-contain relative z-10 drop-shadow-xl transition-transform duration-700 hover:-translate-y-2 hover:scale-105"
              onLoad={() => handleImageLoad(assets.hero)}
              onError={() => handleImageLoad(assets.hero)}
            />
          </div>

          {/* Kanan - Teks dan Tombol */}
          <div className="w-full md:w-1/2 text-center z-10 md:text-left">
            <h1 className="text-4xl mt-3 lg:mt-0 mb-2 lg:mb-3 md:text-5xl font-bold text-gray-800 leading-tight text-center md:text-left">
              <span className="block text-2xl">Selamat Datang di</span>
              <TypeAnimation
                sequence={["Hajeunter Work", 2000, "", 1000]}
                speed={50}
                deletionSpeed={40}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="text-blue-600 block"
              />
            </h1>

            <p className="text-gray-600 text-lg mb-4">
              Ayo mulai usaha Anda dengan lebih baik.{" "}
              <br className="hidden md:block" />
              Kami membantu Anda menghitung, mengelola, dan memahami data dengan
              lebih mudah dan cepat.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full cursor-pointer transition"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="w-full px-4 lg:px-28 mt-10 text-center">
          <h1 className="text-2xl font-semibold mb-8">
            PARA PENGUSAHA PERNAH BERKATA
          </h1>

          <div className="space-y-16">
            {/* Quote 1 */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-left md:text-left gap-6">
              <img
                src={assets.gmb1}
                alt="Benjamin Franklin"
                className="animate-float w-48 h-48 md:w-60 md:h-60 object-cover rounded-none mx-auto md:mx-0"
                onLoad={() => handleImageLoad(assets.gmb1)}
                onError={() => handleImageLoad(assets.gmb1)}
              />
              <div>
                <p className="italic text-gray-700 mb-2">
                  "Seseorang yang gagal merencanakan, sedang merencanakan untuk
                  gagal."
                </p>
                <p className="font-semibold text-gray-800">
                  – Benjamin Franklin
                </p>
              </div>
            </div>

            {/* Tambahkan onLoad dan onError untuk gambar lainnya juga */}
            {/* Quote 2 (reverse) */}
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start text-left gap-6">
              <img
                src={assets.gmb3}
                alt="Henry David Thoreau"
                className="animate-float w-48 h-48 md:w-60 md:h-60 object-cover rounded-none mx-auto md:mx-0"
                onLoad={() => handleImageLoad(assets.gmb3)}
                onError={() => handleImageLoad(assets.gmb3)}
              />
              <div>
                <p className="italic text-gray-700 mb-2">
                  "Sukses biasanya datang kepada mereka yang terlalu sibuk
                  mencarinya."
                </p>
                <p className="font-semibold text-gray-800">
                  – Henry David Thoreau
                </p>
              </div>
            </div>

            {/* Quote 3 */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-left gap-6">
              <img
                src={assets.gmb5}
                alt="Peter Drucker"
                className="animate-float w-48 h-48 md:w-60 md:h-60 object-cover rounded-none mx-auto md:mx-0"
                onLoad={() => handleImageLoad(assets.gmb5)}
                onError={() => handleImageLoad(assets.gmb5)}
              />
              <div>
                <p className="italic text-gray-700 mb-2">
                  "Rencana hanyalah niat baik kecuali jika segera diubah menjadi
                  tindakan sekarang."
                </p>
                <p className="font-semibold text-gray-800">– Peter Drucker</p>
              </div>
            </div>

            {/* Quote 4 (reverse) */}
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start text-left gap-6">
              <img
                src={assets.gmb4}
                alt="Antoine de Saint-Exupéry"
                className="animate-float w-48 h-48 md:w-60 md:h-60 object-cover rounded-none mx-auto md:mx-0"
                onLoad={() => handleImageLoad(assets.gmb4)}
                onError={() => handleImageLoad(assets.gmb4)}
              />
              <div>
                <p className="italic text-gray-700 mb-2">
                  "Tujuan tanpa rencana hanyalah harapan."
                </p>
                <p className="font-semibold text-gray-800">
                  – Antoine de Saint-Exupéry
                </p>
              </div>
            </div>

            {/* Quote 5 */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-left gap-6">
              <img
                src={assets.gmb2}
                alt="Mark Twain"
                className="animate-float w-48 h-48 md:w-60 md:h-60 object-cover rounded-none mx-auto md:mx-0"
                onLoad={() => handleImageLoad(assets.gmb2)}
                onError={() => handleImageLoad(assets.gmb2)}
              />
              <div>
                <p className="italic text-gray-700 mb-2">
                  "Rahasia memulai adalah dengan memecah tugas kompleks menjadi
                  bagian kecil dan memulai dari yang pertama."
                </p>
                <p className="font-semibold text-gray-800">– Mark Twain</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
