export function SiolTeaserBanner() {
  return (
    <section className="my-6 sm:my-12">
      <div className="w-full max-w-[1536px] mx-auto px-3 sm:px-4 lg:px-5 xl:px-6">
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-200/60 shadow-md sm:aspect-[1440/620] lg:aspect-[2.33/1] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[560px] flex flex-col items-center justify-between sm:justify-start select-none bg-[#e9f2f1]">
          {/* Top Centered Typography & Brand Identity */}
          <div className="relative z-10 w-full flex flex-col items-center text-center pt-5 sm:pt-11 md:pt-13 lg:pt-16 px-4">
            {/* SiOL Logo */}
            <img
              src="/siol-logo-black.png"
              alt="SiOL"
              className="h-5 sm:h-9 md:h-11 lg:h-12 w-auto object-contain"
            />

            {/* Sub-headline */}
            <p className="mt-2 sm:mt-4 md:mt-4.5 text-xs sm:text-lg md:text-xl lg:text-[21px] font-normal text-slate-900 tracking-normal">
              Meet the new name in smartphones.
            </p>

            {/* Main Headline */}
            <h2 className="mt-1 sm:mt-1.5 md:mt-2 text-xl sm:text-4xl md:text-[42px] lg:text-[48px] font-extrabold tracking-tight text-black leading-tight">
              Something New Is Coming.
            </h2>
          </div>

          {/* Background Showcase Graphic - 100% visible on mobile with h-auto and object-contain, overlaid on desktop */}
          <div className="relative sm:absolute sm:inset-0 w-full flex items-end justify-center pointer-events-none mt-3 sm:mt-0">
            <img
              src="/Frame 1984079653.png"
              alt="SiOL Smartphones - Something New Is Coming"
              className="w-full h-auto sm:h-full object-contain sm:object-cover object-bottom pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiolTeaserBanner;
