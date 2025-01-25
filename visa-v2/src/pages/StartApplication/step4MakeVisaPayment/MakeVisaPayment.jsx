import {useRef} from 'react';
import Button from "@mui/material/Button";

const MakeVisaPayment = () => {
    const Dateref = useRef(null);
    return (
        <div className="bg-whitesmoke-900 border-b border-slategray-400 max-w-[900px] ">
            <div
                className="flex w-full cursor-pointer p-4 text-left transition duration-300 border-b border-slategray-400">
                <div className="flex w-full items-center">
          <span
              className="mr-3 flex h-6 w-6 items-center justify-center rounded border-2 border-border-neutral-light-n800 bg-border-neutral-light-n800 font-lexend text-xs font-medium text-white">
            2
          </span>
                    <span className="text-base font-bold text-neutral-light-n700">Make visa payment</span>
                </div>
            </div>

            <div className="relative bg-white p-0 pl-10 max-md:py-5 max-md:px-0 max-sm:px-0">
                <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row">
                    <div className="w-full px-1 py-5 max-md:px-7 max-sm:px-4 md:w-2/3">

                        {/* Full Payment Option */}
                        <div
                            className="mb-4 flex flex-row gap-2 rounded-xl border-2 border-primary bg-[#DEEBFF80] px-4 py-4 font-inter">
                            <label className="flex items-center justify-center">
                                <input id="full" className="h-4 w-4 border-gray-300" type="radio" value="full" checked
                                       name="plan"/>
                            </label>
                            <div className="flex w-full items-center justify-center max-sm:flex-col">
                                <div
                                    className="flex w-1/2 flex-col justify-center border-r border-neutral-light-n30 px-2 max-sm:w-full max-sm:border-b max-sm:border-r-0 max-sm:pb-2">
                                    <p className="font-lexend text-xs font-medium text-primary-text">Full payment</p>
                                    <p className="font-lexend text-[32px] font-medium text-border-neutral-light-n800">
                                        <span className="font-inter">₹</span>3998
                                    </p>
                                </div>
                                <div className="flex w-1/2 flex-col items-center p-1 font-inter max-sm:w-full">
                                    <div className="flex w-full items-start gap-2 p-1 font-inter">
                                        <p className="my-1.5 text-xs font-normal text-neutral-light-n700">Pay nothing
                                            later</p>
                                    </div>
                                    <div className="flex w-full items-start gap-2 p-1 font-inter">
                                        <p className="my-1.5 text-xs font-normal text-neutral-light-n700">Fully
                                            refundable, before visa application submission</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="w-full bg-whitesmoke-900 px-5 py-5 md:w-2/5">
                        <h5 className="font-lexend text-base font-normal text-darkslategray-600">Summary</h5>
                        <div className="border-b border-gainsboro-300 py-2">
                            <div className="mb-4 flex flex-wrap">
                                <div className="mx-auto w-full">

                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="my-1.5 flex items-center justify-between font-inter">
                                <p className="my-1.5 text-xs font-medium text-neutral-light-n800">Embassy fees</p>
                                <p className="my-1.5 text-xs font-medium text-neutral-light-n800">₹2399</p>
                            </div>
                            <div className="mt-2">
                                <p className="mt-1.5 text-xs font-normal text-neutral-light-n600">₹2399 (per traveller)
                                    x 1</p>
                            </div>
                        </div>

                        <div className="border-b border-neutral-light-n30 py-2.5">
                            <div className="flex items-center justify-between font-inter">
                                <p className="my-1 text-xs font-medium text-neutral-light-n800">Teleport fee</p>
                                <p className="my-1 text-xs font-medium text-neutral-light-n800">₹1599</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2.5 font-inter">
                            <p className="my-1.5 text-xs font-bold text-neutral-light-n800">Grand Total</p>
                            <p className="my-1.5 text-xs font-bold text-neutral-light-n800">₹3998</p>
                        </div>

                        <Button variant="contained">Pay </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeVisaPayment;