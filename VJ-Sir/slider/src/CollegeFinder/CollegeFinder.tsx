import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import categorized_data from './categorized_data.json';

const CollegeFinder: React.FC = () => {
    const [examType, setExamType] = useState<string>('');
    const [institute, setInstitute] = useState<string>('');
    const [program, setProgram] = useState<string>('');
    const [quota, setQuota] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [courseDuration, setCourseDuration] = useState<string>('');
    const [rank, setRank] = useState<string>('');

    // Convert JSON object to a flat array of colleges
    const colleges = Object.values(categorized_data).flat();

    // Mapping Exam Type to College Types
    const getAllowedCollegeTypes = (exam: string) => {
        if (exam === "JEE Advanced") return ["IIT"];
        if (exam === "JEE Mains") return ["NIT", "IIIT", "GFTI"];
        return [];
    };

    const allowedCollegeTypes = getAllowedCollegeTypes(examType);

    // Filter colleges based on user input
    const filteredColleges = colleges.filter(college => {
        const userRank = Number(rank);
        return (
            (!examType || allowedCollegeTypes.includes(college.type)) &&
            (!institute || college.institute.toLowerCase().includes(institute.toLowerCase())) &&
            (!program || college.program.toLowerCase().includes(program.toLowerCase())) &&
            (!quota || college.quota.toLowerCase() === quota.toLowerCase()) &&
            (!category || college.category.toLowerCase() === category.toLowerCase()) &&
            (!courseDuration || college.courseDuration.toLowerCase() === courseDuration.toLowerCase()) &&
            (!rank || (userRank >= college.openingRank && userRank <= college.closingRank))
        );
    });

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
                        value={institute}
                        onChange={(e) => setInstitute(e.target.value)}
                    />
                </div>

                {/* Program */}
                <div className="col-md-4 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Program"
                        value={program}
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

            {/* Display filtered colleges */}
            <ul className="list-group">
                {filteredColleges.length > 0 ? (
                    filteredColleges.map((college, index) => (
                        <li key={index} className="list-group-item">
                            <strong>{college.institute}</strong> - {college.program} ({college.courseDuration})
                            <br />
                            <small>Quota: {college.quota} | Category: {college.category}</small>
                            <br />
                            <small>Rank Range: {college.openingRank} - {college.closingRank}</small>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No colleges found</li>
                )}
            </ul>
        </div>
    );
};

export default CollegeFinder;
