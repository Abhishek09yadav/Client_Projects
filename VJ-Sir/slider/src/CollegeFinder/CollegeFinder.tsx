import React, { useState, useMemo, useCallback } from 'react';
import { debounce } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import categorized_data from './categorized_data.json';

// Debounced input handler
const useDebouncedInput = (initialValue = '', delay = 300) => {
    const [value, setValue] = useState(initialValue);
    const debouncedSetValue = useCallback(debounce(setValue, delay), []);

    return [value, debouncedSetValue];
};

const CollegeFinder: React.FC = React.memo(() => {
    const [examType, setExamType] = useState<string>('');
    const [institute, setInstitute] = useDebouncedInput('');
    const [program, setProgram] = useDebouncedInput('');
    const [quota, setQuota] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [courseDuration, setCourseDuration] = useState<string>('');
    const [rank, setRank] = useState<string>('');

    const colleges = useMemo(() => Object.values(categorized_data).flat(), []);

    const getAllowedCollegeTypes = useCallback((exam: string) => {
        if (exam === "JEE Advanced") return ["IIT"];
        if (exam === "JEE Mains") return ["NIT"];
        return [];
    }, []);

    const allowedCollegeTypes = useMemo(() => getAllowedCollegeTypes(examType), [examType, getAllowedCollegeTypes]);

    const filteredColleges = useMemo(() => {
        const userRank = Number(rank);
        return colleges.filter(college => (
            (!examType || allowedCollegeTypes.includes(college.type)) &&
            (!institute || college.institute.toLowerCase().includes(institute.toLowerCase())) &&
            (!program || college.program.toLowerCase().includes(program.toLowerCase())) &&
            (!quota || college.quota.toLowerCase() === quota.toLowerCase()) &&
            (!category || college.category.toLowerCase() === category.toLowerCase()) &&
            (!courseDuration || college.courseDuration.toLowerCase() === courseDuration.toLowerCase()) &&
            (!rank || (userRank <= college.closingRank))
        ));
    }, [colleges, examType, allowedCollegeTypes, institute, program, quota, category, courseDuration, rank]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">College Finder</h2>
            <div className="row mb-3">
                <div className="col-md-4 mb-2">
                    <select className="form-control" value={examType} onChange={(e) => setExamType(e.target.value)}>
                        <option value="">Select Exam Type</option>
                        <option value="JEE Mains">JEE Mains</option>
                        <option value="JEE Advanced">JEE Advanced</option>
                    </select>
                </div>
                <div className="col-md-4 mb-2">
                    <input type="text" className="form-control" placeholder="Institute Name"
                           onChange={(e) => setInstitute(e.target.value)}/>
                </div>
                <div className="col-md-4 mb-2">
                    <input type="text" className="form-control" placeholder="Program"
                           onChange={(e) => setProgram(e.target.value)}/>
                </div>
                <div className="col-md-4 mb-2">
                    <select className="form-control" value={quota} onChange={(e) => setQuota(e.target.value)}>
                        <option value="">Select Quota</option>
                        <option value="AI">All India</option>
                        <option value="HS">Home State</option>
                        <option value="OS">Other State</option>
                    </select>
                </div>
                <div className="col-md-4 mb-2">
                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="GEN">General</option>
                        <option value="GEN-PWD">GEN-PWD</option>
                        <option value="GEN-EWS">GEN-EWS</option>
                        <option value="OBC-NCL">OBC-NCL</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                    </select>
                </div>
                <div className="col-md-4 mb-2">
                    <input type="number" className="form-control" placeholder="Enter Rank" value={rank}
                           onChange={(e) => setRank(e.target.value)}/>
                </div>
                <div className="col-md-4 mb-2">
                    <select className="form-control" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)}>
                        <option value="">Select Course Duration</option>
                        <option value="4 Years">4 Years</option>
                        <option value="5 Years">5 Years</option>
                    </select>
                </div>
            </div>

            {filteredColleges.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Institute</th>
                        <th>Program</th>
                        <th>Quota</th>
                        <th>Category</th>
                        <th>Course Duration</th>
                        <th>Opening Rank</th>
                        <th>Closing Rank</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredColleges.map((college, index) => (
                        <tr key={index}>
                            <td>{college.institute}</td>
                            <td>{college.program}</td>
                            <td>{college.quota}</td>
                            <td>{college.category}</td>
                            <td>{college.courseDuration}</td>
                            <td>{college.openingRank}</td>
                            <td>{college.closingRank}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-warning">No colleges found</div>
            )}
        </div>
    );
});

export default CollegeFinder;
