export function SiolTeaserBanner() {
  return (
    <section className="my-8 sm:my-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-200/60 shadow-md aspect-[3/4] sm:aspect-[1440/620] min-h-[280px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[560px] flex flex-col items-center justify-start select-none bg-[#e9f2f1]">
          {/* Background Showcase Graphic */}
          <img
            src="/Frame 1984079653.png"
            alt="SiOL Smartphones - Something New Is Coming"
            className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
          />

          {/* Top Centered Typography & Brand Identity */}
          <div className="relative z-10 w-full flex flex-col items-center text-center pt-6 sm:pt-11 md:pt-13 lg:pt-16 px-4">
            {/* SiOL Logo */}
            <img
              src="/siol-logo-black.png"
              alt="SiOL"
              className="h-6 sm:h-9 md:h-11 lg:h-12 w-auto object-contain"
            />

            {/* Sub-headline */}
            <p className="mt-2.5 sm:mt-4 md:mt-4.5 text-xs sm:text-lg md:text-xl lg:text-[21px] font-normal text-slate-900 tracking-normal">
              Meet the new name in smartphones.
            </p>

            {/* Main Headline */}
            <h2 className="mt-1 sm:mt-1.5 md:mt-2 text-xl sm:text-4xl md:text-[42px] lg:text-[48px] font-extrabold tracking-tight text-black leading-tight">
              Something New Is Coming.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiolTeaserBanner;
