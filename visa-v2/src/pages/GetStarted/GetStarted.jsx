import React from 'react';

const GetStarted = () => {
    return (
        <div>
            <section className="flex w-full justify-center bg-[#F5F9FF]">
                <div className="relative mx-6 w-full max-w-[800px] md:w-11/12" id="demo1">
                    <div className="my-6 flex w-full justify-center gap-x-3 px-5 py-3 text-gray-500">
                        <div className="min-w-max cursor-pointer rounded-lg px-6 py-2 text-sm primary-button">All</div>
                        <div
                            className="min-w-max cursor-pointer rounded-lg px-6 py-2 text-sm bg-[#DFDFDF] text-gray-500">Tourist
                        </div>
                        <div
                            className="min-w-max cursor-pointer rounded-lg px-6 py-2 text-sm bg-[#DFDFDF] text-gray-500">Business
                        </div>
                    </div>
                    <div className="relative flex flex-col gap-y-3 md:gap-y-6">
                        <section>
                            <section className="flex h-fit flex-col rounded-2xl bg-white text-left shadow-lg
            border border-visa-card-bg
            ">
                                <section className="flex w-full flex-col md:flex-row">
                                    <section className="flex w-full flex-col text-sm md:mr-8 md:w-2/3">
                                        <div className="
                    flex rounded-br-37xl-2 rounded-tl-2xl rounded-tr-2xl p-4 pr-12 md:rounded-tr-none
                    bg-visa-card-bg text-visa-card-text
                    "><img alt="Plane" loading="lazy" width="20" height="20" decoding="async" data-nimg="1"
                           className="mr-3 " src="/country-page/icon-plane-white.svg" style={{color: "transparent"}}/>
                                            <div className="flex flex-col"><p className="text-lg font-extrabold">Tourist
                                                Visa - Single Entry - 30 Days</p>
                                                <div className="sticker-tag mt-1"></div>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-col gap-y-3 border-b border-gainsboro-200 p-5 md:border-none">
                                            <div className="flex font-inter"><img alt="Visa Types" loading="lazy"
                                                                                  width="20" height="20"
                                                                                  decoding="async" data-nimg="1"
                                                                                  className="mr-4"
                                                                                  src="/country-page/icon-visa-type.svg"
                                                                                  style={{color: "transparent"}}/>
                                                <div className="flex w-full justify-between"><p
                                                    className="font-inter text-[15px] font-normal text-slategray-200">Visa
                                                    Types</p><p
                                                    className="font-inter text-[15px] font-bold text-[#252D3D]">eVisa</p>
                                                </div>
                                            </div>
                                            <div className="flex font-inter"><img alt="Stay duration" loading="lazy"
                                                                                  width="20" height="20"
                                                                                  decoding="async" data-nimg="1"
                                                                                  className="mr-4"
                                                                                  src="/country-page/icon-stay-duration.svg"
                                                                                  style={{color: "transparent"}}/>
                                                <div className="flex w-full justify-between"><p
                                                    className="font-inter text-[15px] font-normal text-slategray-200">Stay
                                                    duration</p><p
                                                    className="font-inter text-[15px] font-bold text-[#252D3D]">21
                                                    Days</p></div>
                                            </div>
                                            <div className="flex font-inter"><img alt="Visa validity" loading="lazy"
                                                                                  width="20" height="20"
                                                                                  decoding="async" data-nimg="1"
                                                                                  className="mr-4"
                                                                                  src="/country-page/icon-visa-validity.svg"
                                                                                  style={{color: "transparent"}}/>
                                                <div className="flex w-full justify-between"><p
                                                    className="font-inter text-[15px] font-normal text-slategray-200">Visa
                                                    validity</p><p
                                                    className="font-inter text-[15px] font-bold text-[#252D3D]">60
                                                    Days</p></div>
                                            </div>
                                            <div className="flex font-inter"><img alt="Processing time" loading="lazy"
                                                                                  width="20" height="20"
                                                                                  decoding="async" data-nimg="1"
                                                                                  className="mr-4"
                                                                                  src="/country-page/icon-processing-time.svg"
                                                                                  style={{color: "transparent"}}/>
                                                <div className="flex w-full justify-between"><p
                                                    className="font-inter text-[15px] font-normal text-slategray-200">Processing
                                                    time</p><p
                                                    className="font-inter text-[15px] font-bold text-[#252D3D]">7
                                                    Working Days</p></div>
                                            </div>
                                        </div>
                                    </section>
                                    <section
                                        className="flex w-full flex-col-reverse px-3 py-4 font-inter md:w-1/3 md:flex-col ">
                                        <div
                                            className="primary-button relative flex cursor-pointer items-center justify-center rounded-md px-7 py-3 w-full h-undefined undefined">
                                            <p className="h-fit font-semibold text-white opacity-90 text-base !font-normal bg-blue">Start
                                                Application</p></div>
                                        <div className="mt-2 flex md:mt-6">
                                            <div className="flex h-[22.5px] w-5 items-center justify-center"></div>
                                            <div className="flex flex-col gap-y-1"><p
                                                className="mb-2 font-inter text-[15px] font-normal text-slategray-200 md:mb-0">Pay
                                                us</p>
                                                <div
                                                    className="relative flex h-[1.5rem] shrink-0 font-inter text-lg font-bold leading-[100.2%] tracking-[-0.03em] text-primary-text">₹1,200
                                                    per adult
                                                </div>
                                                <p className="w-fit font-inter text-xs font-normal text-primary-text hover:underline">+₹499
                                                    (Fees+Tax)</p>
                                                <div className="mt-0">
                                                    <aside className="group relative w-fit font-inter">
                                                        <div className="flex items-center justify-center"><p
                                                            className="w-fit cursor-pointer font-inter text-xs font-normal text-primary-text hover:underline">View
                                                            details</p></div>
                                                        <div
                                                            className="absolute left-1/2 top-[50px] z-10 hidden w-[260px] shrink-0 -translate-x-1/2  transform flex-col items-start justify-start gap-[0.25rem] whitespace-nowrap  rounded-2xl border-[1px] border-solid bg-[#F4F7F9] p-4 text-[12px] text-xs drop-shadow-lg transition-[opacity,margin]  group-hover:flex max-md:-translate-x-[50px]"
                                                            style={{top: "20px"}}>
                                                            <div
                                                                className="mb-3  flex w-full shrink-0 flex-row  items-start justify-between">
                                                                <div className="flex flex-col gap-y-1">
                                                                    <div
                                                                        className="relative inline-block shrink-0 text-[14px] font-normal leading-[1.25rem] text-slategray-200">Teleport
                                                                        fees:
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-y-1">
                                                                    <div
                                                                        className="relative inline-block shrink-0  text-right text-sm font-medium leading-[1.25rem]  ">₹499
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="border-neutral-light-n40 relative box-border h-[0.06rem] w-fit border-t-[1px] border-solid"></div>
                                                            <div
                                                                className="border-neutral-light-n40 relative box-border h-[0.06rem] border-t-[1px] border-solid"></div>
                                                            <div
                                                                className="mb-3  flex w-full shrink-0 flex-row items-start justify-between">
                                                                <div className="flex flex-col">
                                                                    <div
                                                                        className="relative inline-block shrink-0 text-[14px] font-normal leading-[0.97rem] text-slategray-200">Embassy
                                                                        fees:
                                                                    </div>
                                                                    <div
                                                                        className="relative inline-block w-[150px] break-words text-xs font-normal leading-[0.97rem] text-[#8A8A8A]">Pay
                                                                        online
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="font-dm-mono flex shrink-0 flex-col items-end justify-start text-right">
                                                                    <div
                                                                        className="relative mb-2  inline-block text-sm font-medium leading-[1.25rem] last:mb-0">₹1,200 <p
                                                                        className="text-xs font-normal text-slategray-200"></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </aside>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                            </section>
                        </section>
                        <section>
                            <section className="flex h-fit flex-col rounded-2xl bg-white text-left shadow-lg

            ">
                                <section className="flex w-full flex-col md:flex-row">
                                    <section className="flex w-full flex-col text-sm md:mr-8 md:w-2/3">
                                        <div className="
                    flex rounded-br-37xl-2 rounded-tl-2xl rounded-tr-2xl p-4 pr-12 md:rounded-tr-none
                    bg-secondary-visa-card-bg text-secondary-visa-card-text
                    "><img alt="Plane" loading="lazy" width="20" height="20" decoding="async" data-nimg="1"
                           className="mr-3 invert" src="/country-page/icon-plane-white.svg"
                           style={{color: "transparent"}}/>
                                            <div className="flex flex-col"><p
                                                className="text-lg font-extrabold">Business Visa - Single Entry - 30
                                                Days</p>
                                                <div className="sticker-tag mt-1"></div>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-col gap-y-3 border-b border-gainsboro-200 p-5 md:border-none">
                                            <div className="flex font-inter"><img alt="Visa Types" loading="lazy"
                                                                                  width="20" height="20"
                                                                                  decoding="async" data-nimg="1"
                                                                                  className="mr-4"
                                                                                  src="/country-page/icon-visa-type.svg"
                                                                                  style={{color: "transparent"}}/>
                                                <div className="flex w-full justify-between"><p
                                                    className="font-inter text-[15px] font-normal text-slategray-200">Visa
                                                    Types</p><p
                                                    className="font-inter text-[15px] font-bold text-[#252D3D]">eVisa</p>
                                                </div>
                                            </div>
                                            <div className="flex font-inter"><img alt="Stay duration" loading="lazy"
                                                                                  width="20" height="20"
                                                                                  decoding="async" data-nimg="1"
                                                                                  className="mr-4"
                                                                                  src="/country-page/icon-stay-duration.svg"
                                                                                  style={{color: "transparent"}}/>
                                                <div className="flex w-full justify-between"><p
                                                    className="font-inter text-[15px] font-normal text-slategray-200">Stay
                                                    duration</p><p
                                                    className="font-inter text-[15px] font-bold text-[#252D3D]">21
                                                    Days</p></div>
                                            </div>
                                            <div className="flex font-inter"><img alt="Visa validity" loading="lazy"
                                                                                  width="20" height="20"
                                                                                  decoding="async" data-nimg="1"
                                                                                  className="mr-4"
                                                                                  src="/country-page/icon-visa-validity.svg"
                                                                                  style={{color: "transparent"}}/>
                                                <div className="flex w-full justify-between"><p
                                                    className="font-inter text-[15px] font-normal text-slategray-200">Visa
                                                    validity</p><p
                                                    className="font-inter text-[15px] font-bold text-[#252D3D]">60
                                                    Days</p></div>
                                            </div>
                                            <div className="flex font-inter"><img alt="Processing time" loading="lazy"
                                                                                  width="20" height="20"
                                                                                  decoding="async" data-nimg="1"
                                                                                  className="mr-4"
                                                                                  src="/country-page/icon-processing-time.svg"
                                                                                  style={{color: "transparent"}}/>
                                                <div className="flex w-full justify-between"><p
                                                    className="font-inter text-[15px] font-normal text-slategray-200">Processing
                                                    time</p><p
                                                    className="font-inter text-[15px] font-bold text-[#252D3D]">7
                                                    Working Days</p></div>
                                            </div>
                                        </div>
                                    </section>
                                    <section
                                        className="flex w-full flex-col-reverse px-3 py-4 font-inter md:w-1/3 md:flex-col ">
                                        <div
                                            className="primary-button relative flex cursor-pointer items-center justify-center rounded-md px-7 py-3 w-full h-undefined undefined">
                                            <p className="h-fit font-semibold text-white opacity-90 text-base !font-normal bg-blue">Start
                                                Application</p></div>
                                        <div className="mt-2 flex md:mt-6">
                                            <div className="flex h-[22.5px] w-5 items-center justify-center"></div>
                                            <div className="flex flex-col gap-y-1"><p
                                                className="mb-2 font-inter text-[15px] font-normal text-slategray-200 md:mb-0">Pay
                                                us</p>
                                                <div
                                                    className="relative flex h-[1.5rem] shrink-0 font-inter text-lg font-bold leading-[100.2%] tracking-[-0.03em] text-primary-text">₹1,200
                                                    per adult
                                                </div>
                                                <p className="w-fit font-inter text-xs font-normal text-primary-text hover:underline">+₹499
                                                    (Fees+Tax)</p>
                                                <div className="mt-0">
                                                    <aside className="group relative w-fit font-inter">
                                                        <div className="flex items-center justify-center"><p
                                                            className="w-fit cursor-pointer font-inter text-xs font-normal text-primary-text hover:underline">View
                                                            details</p></div>
                                                        <div
                                                            className="absolute left-1/2 top-[50px] z-10 hidden w-[260px] shrink-0 -translate-x-1/2  transform flex-col items-start justify-start gap-[0.25rem] whitespace-nowrap  rounded-2xl border-[1px] border-solid bg-[#F4F7F9] p-4 text-[12px] text-xs drop-shadow-lg transition-[opacity,margin]  group-hover:flex max-md:-translate-x-[50px]"
                                                            style={{top: "20px"}}>
                                                            <div
                                                                className="mb-3  flex w-full shrink-0 flex-row  items-start justify-between">
                                                                <div className="flex flex-col gap-y-1">
                                                                    <div
                                                                        className="relative inline-block shrink-0 text-[14px] font-normal leading-[1.25rem] text-slategray-200">Teleport
                                                                        fees:
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col gap-y-1">
                                                                    <div
                                                                        className="relative inline-block shrink-0  text-right text-sm font-medium leading-[1.25rem]  ">₹499
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="border-neutral-light-n40 relative box-border h-[0.06rem] w-fit border-t-[1px] border-solid"></div>
                                                            <div
                                                                className="border-neutral-light-n40 relative box-border h-[0.06rem] border-t-[1px] border-solid"></div>
                                                            <div
                                                                className="mb-3  flex w-full shrink-0 flex-row items-start justify-between">
                                                                <div className="flex flex-col">
                                                                    <div
                                                                        className="relative inline-block shrink-0 text-[14px] font-normal leading-[0.97rem] text-slategray-200">Embassy
                                                                        fees:
                                                                    </div>
                                                                    <div
                                                                        className="relative inline-block w-[150px] break-words text-xs font-normal leading-[0.97rem] text-[#8A8A8A]">Pay
                                                                        online
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="font-dm-mono flex shrink-0 flex-col items-end justify-start text-right">
                                                                    <div
                                                                        className="relative mb-2  inline-block text-sm font-medium leading-[1.25rem] last:mb-0">₹1,200 <p
                                                                        className="text-xs font-normal text-slategray-200"></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </aside>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </div>
                    <div className="my-4 flex w-full justify-center"></div>
                </div>
            </section>
        </div>
    );
};

export default GetStarted;
