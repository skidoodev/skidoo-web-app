export const Steps = () => {
  return (
    <section className="mx-auto max-w-6xl py-20">
      <div className="my-20 flex flex-col items-center justify-center">
        <h1 className="mx-auto text-5xl font-bold text-[#1C423C] lg:mx-20 2xl:mx-60">
          LOREM IPSUM DOLOR SIZT AMET
        </h1>
        <p className="mx-auto my-4 text-center text-xl font-semibold text-[#1C423C] lg:mx-40 2xl:mx-60">
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum Etiam
          ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
        </p>
      </div>

      <div className="container relative mx-auto flex flex-col items-center justify-between space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
        {/* Step 1 */}
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-black/25 bg-[#FBEEAF] text-2xl font-bold text-[#1C423C]">
            1
          </div>
          <h3 className="mb-2 text-2xl font-bold text-[#1C423C]">
            Integer tincidunt
          </h3>
          <p className="max-w-xs text-lg text-[#1C423C]">
            Vivamus elementum semper nisi. Aenean vulputate eleifend tellus
          </p>
        </div>

        <div className="absolute left-1/4 top-1/4 mr-12 hidden w-32 border-t border-dashed border-[#1C423C] lg:block"></div>

        {/* Step 2 */}
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-4 flex h-14  w-14 items-center justify-center rounded-full border border-black/25 bg-[#FBEEAF] text-2xl font-bold text-[#1C423C]">
            2
          </div>
          <h3 className="mb-2 text-2xl font-bold text-[#1C423C]">
            Cras dapibuys
          </h3>
          <p className="max-w-xs text-lg text-[#1C423C]">
            Donec vitae sapien ut libero venenatis faucibus
          </p>
        </div>

        <div className="absolute right-1/4 top-1/4 z-0 hidden h-1 w-32 border-t border-dashed border-[#1C423C] lg:block"></div>

        {/* Step 3 */}
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-black/25 bg-[#FBEEAF] text-2xl font-bold text-[#1C423C]">
            3
          </div>
          <h3 className="mb-2 text-2xl font-bold text-[#1C423C]">
            Quisque rutrum
          </h3>
          <p className="max-w-xs text-lg text-[#1C423C]">
            Aenean leo ligula, Etiam ultricies nisi vel augue
          </p>
        </div>
      </div>
    </section>
  );
};
