
export const Explainer = () => {
  return (
    <section className="py-20 bg-[url('/background.png')]">
      <div className="flex flex-col mx-auto max-w-6xl p-6 bg-gray-50 bg-transparent">
        <h2 className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text">
          Explainer Video
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between lg:gap-20">
          <div className="flex flex-col text-center lg:text-left max-w-lg space-y-4">
            <p className="text-lg text-black leading-relaxed pt-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
          </div>

          
          <div className="relative group mt-8 lg:mt-0">
            <div className="w-[560px] h-[350px] rounded-2xl bg-gradient-to-r from-[#8711C1] to-[#2472FC] p-1 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-full h-full bg-black rounded-xl overflow-hidden relative">
                
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all">
                  <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-[#8711C1]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                
                <img
                  src="/"
                  alt="Video Thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
