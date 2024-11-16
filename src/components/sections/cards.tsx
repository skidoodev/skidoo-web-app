import { BsArrowRight } from "react-icons/bs"

const Cards = () => {
  return (
    <section className="py-20 bg-[#1C423C]">
      <div className="flex justify-center items-center flex-col my-20">
          <h1 className="text-5xl text-[#FBEEAF] text-center font-bold mx-8 lg:mx-20 2xl:mx-60">DE FINIBUS BONORUM ET MALORUM</h1>
          <p className="text-xl text-[#FBEEAF] text-center font-semibold mx-8 lg:mx-40 2xl:mx-60 my-6">Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.</p>
      </div>

      <div className="flex flex-wrap justify-center mx-10 lg:mx-40 2xl:mx-72 gap-6">
        <div className="bg-[#FBEEAF] text-[#1C423C] border-2 border-[#1C423C] overflow-hidden pr-8 relative h-[22rem] w-[20rem] transition rounded-3xl hover:scale-105">
          <div className="px-6 py-6 flex flex-col h-full">
            <h3 className="text-xl sm:text-2xl font-semibold">Finibus Bonorum et Malorum</h3>
            <p className="text-base sm:text-lg mt-2 leading-relaxed overflow-hidden">unde omnis iste natus error sit voluptatem accusantium.</p>
          </div>
        </div>

        <div className="bg-[#FBEEAF] text-[#1C423C] border-2 border-[#1C423C] overflow-hidden pr-8 relative h-[22rem] w-[20rem] transition rounded-3xl hover:scale-105">
          <div className="px-6 py-6 flex flex-col h-full">
            <h3 className="text-xl sm:text-2xl font-semibold">Dicta sunt explicabo</h3>
            <p className="text-base sm:text-lg mt-2 leading-relaxed overflow-hidden">illo inventore veritatis et quasi architecto beatae vitae dicta.</p>
          </div>
        </div>

        <div className="bg-[#FBEEAF] text-[#1C423C] border-2 border-[#1C423C] overflow-hidden pr-8 relative h-[22rem] w-[20rem] transition rounded-3xl hover:scale-105">
          <div className="px-6 py-6 flex flex-col h-full">
            <h3 className="text-xl sm:text-2xl font-semibold">Dignissimos ducimus</h3>
            <p className="text-base sm:text-lg mt-2 leading-relaxed overflow-hidden">At vero eos et accusamus et iusto odio qui blanditiis deleniti atque corrupti et quas.</p>
          </div>
        </div>

        <div className="bg-[#FBEEAF] text-[#1C423C] border-2 border-[#1C423C] overflow-hidden pr-8 relative h-[22rem] w-[20rem] transition rounded-3xl hover:scale-105">
          <div className="px-6 py-6 flex flex-col h-full">
            <h3 className="text-xl sm:text-2xl font-semibold">Finibus sunt explicabo</h3>
            <p className="text-base sm:text-lg mt-2 leading-relaxed overflow-hidden">ab illo inventore veritatis et quasi architecto sunt explicabo.</p>
          </div>
        </div>

        <div className="bg-[#FBEEAF] text-[#1C423C] border-2 border-[#1C423C] overflow-hidden pr-8 relative h-[22rem] w-[20rem] transition rounded-3xl hover:scale-105">
          <div className="px-6 py-6 flex flex-col h-full">
            <h3 className="text-xl sm:text-2xl font-semibold">Dignissimos Bonorum Malorum</h3>
            <p className="text-base sm:text-lg mt-2 leading-relaxed overflow-hidden">Sed ut perspiciatis unde omnis iste natus error accusantium.</p>
          </div>
        </div>

        <div className="bg-[#FBEEAF] text-[#1C423C] border-2 border-[#1C423C] overflow-hidden pr-8 relative h-[22rem] w-[20rem] transition rounded-3xl hover:scale-105">
          <div className="px-6 py-6 flex flex-col h-full">
            <h3 className="text-xl sm:text-2xl font-semibold">Dicta ducimus</h3>
            <p className="text-base sm:text-lg mt-2 leading-relaxed overflow-hidden">accusamus et iusto odio qui blanditiis deleniti atque corrupti quos dolores et.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="flex justify-center items-center gap-1 text-2xl text-[#1C423C] font-bold px-6 py-3 lg:px-8 lg:py-4 bg-[#FDCE00] border-[#1C423C] border-2 rounded-2xl shadow-[5px_5px_0px_0px_#FFF9E9] my-12 group hover:scale-110 transition-all">
            READ MORE <BsArrowRight className="group-hover:translate-x-1.5 transition" />
        </button>
      </div>
    </section>
  )
}

export default Cards;