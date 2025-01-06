import React from 'react';
import { SiTicktick } from "react-icons/si";
const Hero3 = () => {
    return (
        <div>

            <section className="flex flex-col items-center">
                <section
                    className="mb-16 flex w-full max-w-[1100px] flex-col items-center justify-between p-6 pt-4 md:w-11/12 md:flex-row 2xl:w-[70%]">
                    <section className="flex w-full flex-col gap-y-5 self-center"><h1
                        className="text-center text-[32px] font-bold leading-none text-gray-400 md:w-[400px] md:text-left md:text-4xl">Get
                        your Armenia visa</h1>
                        <div className="flex w-full flex-col items-center md:flex-row">
                            <div
                                className="mb-[22px] flex h-fit w-fit flex-row items-center justify-center rounded-[14px] bg-[#22A06B] p-4 pb-[14px] pt-[9px] text-white md:mr-6">
                                <img alt="timer" loading="lazy" width="36" height="36" decoding="async" data-nimg="1"
                                     className="mr-4"
                                     src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg"
                                     style={{color: "transparent"}}/><p><strong className="text-base font-extrabold">Get
                                your visa by 14 Jan 2025</strong><br/><span className="text-base font-normal">if you apply today</span>
                            </p></div>
                            <div
                                className="mb-5 flex w-full items-center justify-center md:w-fit md:flex-col xl:flex-row">
                                <div className=" relative mb-0 mr-2 h-6 w-14"><img alt="review image person 0"
                                                                                   loading="lazy" width="24" height="24"
                                                                                   decoding="async" data-nimg="1"
                                                                                   className="absolute top-0 h-6 w-6 rounded-full border border-whitesmoke-700 object-cover"
                                                                                   src="https://placehold.co/400x300"
                                                                                   style={{
                                                                                       color: "transparent",
                                                                                       left: "0px"
                                                                                   }}/><img
                                    alt="review image person 1" loading="lazy" width="24" height="24" decoding="async"
                                    data-nimg="1"
                                    className="absolute top-0 h-6 w-6 rounded-full border border-whitesmoke-700 object-cover"
                                    src="https://placehold.co/400x300"
                                    style={{color: "transparent", left: "18px"}}/><img alt="review image person 2"
                                                                                       loading="lazy" width="24"
                                                                                       height="24"
                                                                                       decoding="async" data-nimg="1"
                                                                                       className="absolute top-0 h-6 w-6 rounded-full border border-whitesmoke-700 object-cover"
                                                                                       src="https://placehold.co/400x300"
                                                                                       style={{
                                                                                           color: "transparent",
                                                                                           left: "36px"
                                                                                       }}/>
                                </div>
                                <p className="text-xs text-slategray-200">78+ applied recently</p></div>
                        </div>
                    </section>
                    <section
                        className="relative flex h-[216px] w-full flex-col self-center align-middle md:w-0 md:min-w-[386px]">
                        <img alt="Banner Image" loading="lazy" width="386" height="216" decoding="async" data-nimg="1"
                             className="h-full w-full rounded-lg border border-whitesmoke-700 object-cover"
                             src="https://images.unsplash.com/photo-1528663775703-dba64f806cd1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                        <div
                            className="absolute -left-4 top-16 flex w-fit items-center rounded-2xl border border-whitesmoke-700 bg-white pl-3 font-inter text-xs text-slategray-200 drop-shadow-2xl md:-left-16">
                            <p className="mr-2 font-inter text-base font-extrabold">98%</p>
                            <div
                                className="flex rounded-2xl border border-y-0 border-r-0 border-whitesmoke-700 px-3 py-2">
                                <SiTicktick className="font-inter text-[13px] font-medium mt-0.5 mr-1"/>
                                <p
                                    className="font-inter text-[13px] font-medium">Approval Rate</p></div>
                        </div>
                        <div hidden=""
                             className="absolute right-2 top-2 rounded-lg bg-[#F7E499] px-2 py-1 font-inter text-xs font-semibold text-[#5B4C0D]"></div>
                        <div
                            className="absolute -right-4 top-20 flex w-[146px] flex-col overflow-hidden rounded-lg border border-whitesmoke-700 bg-white drop-shadow-sm">
                            <img alt="Recommendation Image" loading="lazy" width="146" height="86" decoding="async"
                                 data-nimg="1" className="h-[86px] w-[146px] object-cover"
                                 src="data:image/jpeg;base64,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"/>
                            <p
                                className="p-2 pb-5 text-xs font-normal text-slategray-200">“Getting visa has never been
                                this easy. This is the third visa I got through Travelidea. The process is
                                seamless.”</p>
                        </div>
                    </section>
                </section>
            </section>
            <div
                className="flex-start lg:no-scrollbar top-0 z-50 flex w-full gap-x-5 bg-white px-5 text-gray-900 sticky lg:justify-center cursor-pointer"
                style={{overflowX: "scroll"}}>
                <div
                    className="mx-1.5 min-w-max border-b-2 border-transparent py-4 text-sm font-medium text-slategray-200 hover:border-primary hover:text-primary sm:text-base">Types
                    of Visa
                </div>
                <div
                    className="mx-1.5 min-w-max border-b-2 border-transparent py-4 text-sm font-medium text-slategray-200 hover:border-primary hover:text-primary sm:text-base">Process
                </div>
                <div
                    className="mx-1.5 min-w-max border-b-2 border-transparent py-4 text-sm font-medium text-slategray-200 hover:border-primary hover:text-primary sm:text-base">Document
                    Checklist
                </div>
                <div
                    className="mx-1.5 min-w-max border-b-2 border-transparent py-4 text-sm font-medium text-slategray-200 hover:border-primary hover:text-primary sm:text-base">FAQs
                </div>
            </div>
        </div>
    );
};

export default Hero3;
