import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import france from "../../../public/france.png"
import vietnam from "../../../public/vietnam.png"
import malaysia from "../../../public/vietnam.png"
import australia from "../../../public/vietnam.png"

const Review = () => {
    return (
        <div>
            <div className="w-full bg-gradient-to-b from-neutral-50 to-slate-100 py-16 text-center">
                <div className="flex items-center justify-center gap-x-4 md:gap-x-7">
                    <FaStar   style={{ color: 'yellow',  }}  />
                    <FaStar style={{ color: 'yellow' }}  />
                    <FaStar style={{ color: 'yellow' }}  />
                    <FaStar style={{ color: 'yellow' }}  />
                    <FaStar style={{ color: 'yellow' }}  />
                </div>
                <div className="mt-6 font-lexend text-xl font-bold leading-7 text-sky-950 md:mt-10 md:text-5xl md:leading-10">
                    The 5 star visa company
                </div>
                <h3 className="my-2 font-sans text-sm font-normal leading-tight text-gray-700 md:my-8 md:text-xl">
                    Teleport is a top-rated visa <br /> company, on
                    <FaGoogle /> reviews.
                </h3>
                <section className="flex flex-col justify-center bg-undefined-100">
                    <article className="flex justify-center px-4 py-6">
                        <div className="grid grid-cols-[340px_300px_200px_200px] grid-rows-[200px_60px_170px] gap-3 overflow-y-hidden overflow-x-scroll xl:overflow-x-hidden">
                            <article className="rounded-lg border border-slate-200 bg-white row-span-2 col-span-1">
                                <div className="space-y-3 p-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <figure className="h-8 w-8">
                                                <img src="https://placehold.co/50x50" alt="profile-pic" loading="lazy" />
                                            </figure>
                                            <p className="font-lexend text-xl font-medium leading-9 text-blue-950">Swaroopa</p>
                                        </div>
                                        <div>
                                            <img src={france} alt="country-flag"  style={{maxWidth:"30px"}} loading="lazy" />
                                        </div>
                                    </div>
                                    <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                                        I was initially apprehensive to avail a service through an online platform. But, Teleport’s team exceeded my expectations. They have been extremely supportive at each and every step. I highly recommend their services.
                                    </h4>
                                </div>
                            </article>
                            <article className="rounded-lg border border-slate-200 bg-white row-span-1 col-span-2">
                                <div className="space-y-3 p-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <figure className="h-8 w-8">
                                                <img src="https://placehold.co/50x50" alt="profile-pic" loading="lazy" />
                                            </figure>
                                            <p className="font-lexend text-xl font-medium leading-9 text-blue-950">Gursimran</p>
                                        </div>
                                        <div>
                                            <img src={france} alt="country-flag" style={{maxWidth: "30px"}}
                                                 loading="lazy"/>
                                        </div>
                                    </div>
                                    <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                                        Absolutely brilliant support. Everything was seamless. Great experience overall. I availed the services for a short term Schengen visa.
                                    </h4>
                                </div>
                            </article>
                            <article className="rounded-lg border border-slate-200 bg-white row-span-1 col-span-1">
                                <div className="space-y-3 p-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <figure className="h-8 w-8">
                                                <img src="https://placehold.co/50x50" alt="profile-pic" loading="lazy" />
                                            </figure>
                                            <p className="font-lexend text-xl font-medium leading-9 text-blue-950">Hersh</p>
                                        </div>
                                        <div>
                                            <img src={vietnam} alt="country-flag" style={{maxWidth: "30px"}}
                                                 loading="lazy"/>
                                        </div>
                                    </div>
                                    <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                                        Simple, quick, affordable & efficient.
                                    </h4>
                                </div>
                            </article>
                            {/* Repeat for other testimonials */}
                            <article className="rounded-lg border border-slate-200 bg-white row-span-2 col-span-1">
                                <div className="space-y-3 p-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <figure className="h-8 w-8">
                                                <img src="https://placehold.co/50x50" alt="profile-pic" loading="lazy" />
                                            </figure>
                                            <p className="font-lexend text-xl font-medium leading-9 text-blue-950">Aditi</p>
                                        </div>
                                        <div>
                                            <img src="https://placehold.co/50x50" alt="country-flag" loading="lazy" />
                                        </div>
                                    </div>
                                    <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                                        Teleport made my visa process stress-free. Highly professional and efficient team.
                                    </h4>
                                </div>
                            </article>

                            <article className="rounded-lg border border-slate-200 bg-white row-span-1 col-span-2 h-fit">
                                <div className="space-y-3 p-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <figure className="h-8 w-8">
                                                <img src="https://placehold.co/50x50" alt="profile-pic" loading="lazy" />
                                            </figure>
                                            <p className="font-lexend text-xl font-medium leading-9 text-blue-950">Rohit</p>
                                        </div>
                                        <div>
                                            <img src="https://placehold.co/50x50" alt="country-flag" loading="lazy" />
                                        </div>
                                    </div>
                                    <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                                        Amazing service! The team guided me throughout the process and ensured everything was flawless.
                                    </h4>
                                </div>
                            </article>

                            <article className="rounded-lg border border-slate-200 bg-white row-span-1 col-span-1">
                                <div className="space-y-3 p-7">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <figure className="h-8 w-8">
                                                <img src="https://placehold.co/50x50" alt="profile-pic" loading="lazy" />
                                            </figure>
                                            <p className="font-lexend text-xl font-medium leading-9 text-blue-950">Karan</p>
                                        </div>
                                        <div>
                                            <img src="https://placehold.co/50x50" alt="country-flag" loading="lazy" />
                                        </div>
                                    </div>
                                    <h4 className="text-left font-lexend font-normal leading-relaxed text-slate-600">
                                        Efficient and quick service. Highly recommend Teleport for visa assistance.
                                    </h4>
                                </div>
                            </article>

                        </div>
                    </article>
                </section>
            </div>
        </div>
    );
};

export default Review;
