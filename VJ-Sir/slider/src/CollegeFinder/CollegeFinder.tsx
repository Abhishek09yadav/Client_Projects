import React, { useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import { FixedSizeList as List } from 'react-window';
import 'bootstrap/dist/css/bootstrap.min.css';
import categorized_data from './categorized_data.json';

// Debounced input handler
const useDebouncedInput = (initialValue = '', delay = 300) => {
    const [value, setValue] = useState(initialValue);
    const debouncedSetValue = useCallback(debounce(setValue, delay), []);

    return [value, debouncedSetValue];
};

// Row component for virtualization
const Row = ({ index, style, data }) => (
    <div style={style} className="list-group-item">
        <strong>{data[index].institute}</strong> - {data[index].program} ({data[index].courseDuration})
        <br />
        <small>Quota: {data[index].quota} | Category: {data[index].category}</small>
        <br />
        <small>Rank Range: {data[index].openingRank} - {data[index].closingRank}</small>
    </div>
);

const CollegeFinder: React.FC = React.memo(() => {
    // State for filters
    const [examType, setExamType] = useState<string>('');
    const [institute, setInstitute] = useDebouncedInput('');
    const [program, setProgram] = useDebouncedInput('');
    const [quota, setQuota] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [courseDuration, setCourseDuration] = useState<string>('');
    const [rank, setRank] = useState<string>('');

    // Convert JSON object to a flat array of colleges
    const colleges = useMemo(() => Object.values(categorized_data).flat(), []);

    // Mapping Exam Type to College Types
    const getAllowedCollegeTypes = useCallback((exam: string) => {
        if (exam === "JEE Advanced") return ["IIT"];
        if (exam === "JEE Mains") return ["NIT", "IIIT", "GFTI"];
        return [];
    }, []);

    const allowedCollegeTypes = useMemo(() => getAllowedCollegeTypes(examType), [examType, getAllowedCollegeTypes]);

    // Filter colleges based on user input
    const filteredColleges = useMemo(() => {
        const userRank = Number(rank);
        return colleges.filter(college => {
            return (
                (!examType || allowedCollegeTypes.includes(college.type)) &&
                (!institute || college.institute.toLowerCase().includes(institute.toLowerCase())) &&
                (!program || college.program.toLowerCase().includes(program.toLowerCase())) &&
                (!quota || college.quota.toLowerCase() === quota.toLowerCase()) &&
                (!category || college.category.toLowerCase() === category.toLowerCase()) &&
                (!courseDuration || college.courseDuration.toLowerCase() === courseDuration.toLowerCase()) &&
                (!rank || (userRank <= college.closingRank))
            );
        });
    }, [colleges, examType, allowedCollegeTypes, institute, program, quota, category, courseDuration, rank]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">College Finder</h2>
            <div className="row mb-3">
                {/* Exam Type */}
                <div className="col-md-4 mb-2">
                    <select className="form-control" value={examType} onChange={(e) => setExamType(e.target.value)}>
                        <option value="">Select Exam Type</option>
                        <option value="JEE Mains">JEE Mains</option>
                        <option value="JEE Advanced">JEE Advanced</option>
                    </select>
                </div>

                {/* Institute Name */}
                <div className="col-md-4 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Institute Name"
                        onChange={(e) => setInstitute(e.target.value)}
                    />
                </div>

                {/* Program */}
                <div className="col-md-4 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Program"
                        onChange={(e) => setProgram(e.target.value)}
                    />
                </div>

                {/* Quota */}
                <div className="col-md-4 mb-2">
                    <select className="form-control" value={quota} onChange={(e) => setQuota(e.target.value)}>
                        <option value="">Select Quota</option>
                        <option value="AI">All India</option>
                        <option value="HS">Home State</option>
                        <option value="OS">Other State</option>
                    </select>
                </div>

                {/* Category */}
                <div className="col-md-4 mb-2">
                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="GEN">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="EWS">EWS</option>
                    </select>
                </div>

                {/* Rank */}
                <div className="col-md-4 mb-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Rank"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                    />
                </div>

                {/* Course Duration */}
                <div className="col-md-4 mb-2">
                    <select className="form-control" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)}>
                        <option value="">Select Course Duration</option>
                        <option value="4 Years">4 Years</option>
                        <option value="5 Years">5 Years</option>
                    </select>
                </div>
            </div>

            {/* Display filtered colleges using virtualization */}
            {filteredColleges.length > 0 ? (
                <List
                    height={400} // Height of the list
                    itemCount={filteredColleges.length} // Total number of items
                    itemSize={100} // Height of each row
                    width={'100%'} // Width of the list
                    itemData={filteredColleges} // Data to render
                >
                    {Row}
                </List>
            ) : (
                <div className="list-group-item">No colleges found</div>
            )}
        </div>
    );
});

export default CollegeFinder;