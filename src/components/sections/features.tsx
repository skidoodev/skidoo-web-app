import Image from "next/image";

export const Features = () => {
  return (
    <section className="py-20">
      <div className="my-20 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-center font-bold text-[#1C423C] mx-8 lg:mx-20 2xl:mx-60">
          DE FINIBUS BONORUM ET MALORUM
        </h1>
        <p className="my-4 text-center text-xl font-semibold text-[#1C423C] mx-8 lg:mx-40 2xl:mx-60">
          Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere possimus, omnis
          voluptas assumenda est.
        </p>
      </div>

      <div className="flex justify-center flex-wrap mx-10 gap-8">
        <div className="group">
          <div className="relative cursor-pointer overflow-hidden rounded-3xl border-2 border-[#1C423C] bg-[#FBEEAF] text-[#1C423C] transition group-hover:scale-105 sm:h-[25rem] sm:w-[22rem] sm:pr-8">
            <div className="flex h-full flex-col px-6 py-6">
              <h3 className="text-xl font-semibold sm:text-2xl">
                Finibus Bonorum et Malorum
              </h3>
              <p className="mt-2 overflow-hidden text-base leading-relaxed sm:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium.
              </p>
            </div>
            <Image
              className="absolute -right-20 top-40 mt-12 hidden rounded-t-3xl shadow-2xl transition group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-110 sm:block"
              src=""
              alt="My Projects"
              quality={95}
              width={640}
              height={360}
            />
          </div>
        </div>

        <div className="group">
          <div className="relative cursor-pointer overflow-hidden rounded-3xl border-2 border-[#1C423C] bg-[#FBEEAF] text-[#1C423C] transition group-hover:scale-105 sm:h-[25rem] sm:w-[22rem] sm:pr-8">
            <div className="flex h-full flex-col px-6 py-6">
              <h3 className="text-xl font-semibold sm:text-2xl">
                Dicta sunt explicabo
              </h3>
              <p className="mt-2 overflow-hidden text-base leading-relaxed sm:text-lg">
                eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
              </p>
            </div>
            <Image
              className="absolute -right-20 top-40 mt-12 hidden rounded-t-3xl shadow-2xl transition group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-110 sm:block"
              src=""
              alt="My Projects"
              quality={95}
              width={640}
              height={360}
            />
          </div>
        </div>

        <div className="group">
          <div className="relative cursor-pointer overflow-hidden rounded-3xl border-2 border-[#1C423C] bg-[#FBEEAF] text-[#1C423C] transition group-hover:scale-105 sm:h-[25rem] sm:w-[22rem] sm:pr-8">
            <div className="flex h-full flex-col px-6 py-6">
              <h3 className="text-xl font-semibold sm:text-2xl">
                Dignissimos ducimus
              </h3>
              <p className="mt-2 overflow-hidden text-base leading-relaxed sm:text-lg">
                At vero eos et accusamus et iusto odio qui blanditiis deleniti
                atque corrupti quos dolores et quas.
              </p>
            </div>
            <Image
              className="absolute -right-20 top-40 mt-12 hidden rounded-t-3xl shadow-2xl transition group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-110 sm:block"
              src=""
              alt="My Projects"
              quality={95}
              width={640}
              height={360}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
