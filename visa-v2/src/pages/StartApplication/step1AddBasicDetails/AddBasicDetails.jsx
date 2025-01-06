import React from 'react';

const AddBasicDetails = () => {
    return (
        <div>
            <div
                className="flex w-full cursor-pointer p-4 text-left transition duration-300 border-b-[1px] border-slategray-400"
                id="Basic">
                <div className="flex w-full"><span
                    className="mr-3 flex h-6 w-6 items-center justify-center rounded border-2 text-xs font-medium border-border-neutral-light-n800 bg-border-neutral-light-n800 text-white">1</span><span
                    className="text-base font-bold text-neutral-light-n700">Add basic details</span></div>
            </div>
            {/*    header ends above*/}
            <p className="mb-4 font-lexend text-base font-bold text-darkslategray-600">1. Add your tentative travel
                dates</p>
            <div className="mb-4 rounded-[8px] bg-yellow-100 min-w-1 p-3  text-xs text-neutral-light-n800">
                These dates
                can be approximate and are only required to get you a visa. You may make changes later as per visa issuance period.
            </div>
        </div>
    );
};

export default AddBasicDetails;
