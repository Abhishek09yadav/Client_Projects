import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import categorized_data from './categorized_data.json';

const CollegeFinder: React.FC = () => {
    const [rank, setRank] = useState<string>('');

    // Convert JSON object to a flat array of colleges
    const colleges = Object.values(categorized_data).flat();

    // Function to handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRank(event.target.value);
    };

    // Filter colleges based on the input rank
    const filteredColleges = rank
        ? colleges.filter(college => {
            const userRank = Number(rank);
            return userRank >= college.openingRank && userRank <= college.closingRank;
        })
        : [];

    return (
        <div className="container mt-5">
            <div className="input-group mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter your rank"
                    value={rank}
                    onChange={handleInputChange}
                />
                <div className="input-group-append">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                </div>
            </div>

            <ul className="list-group">
                {filteredColleges.length > 0 ? (
                    filteredColleges.map((college, index) => (
                        <li key={index} className="list-group-item">
                            {college.institute} - {college.program} (Rank: {college.openingRank} - {college.closingRank})
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No colleges found for the given rank</li>
                )}
            </ul>
        </div>
    );
};

export default CollegeFinder;
