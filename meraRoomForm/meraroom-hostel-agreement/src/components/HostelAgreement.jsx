import React, { useState } from 'react';

const HostelAgreementForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    bankAccountDetails: '',
    identificationProof: '',
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agreement) {
      console.log('Form submitted:', formData);
      // Handle form submission logic here
    } else {
      alert('Please agree to the terms and conditions.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hostel Agreement Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Guardian Name:</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bank Account Details:</label>
          <input
            type="text"
            name="bankAccountDetails"
            value={formData.bankAccountDetails}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Identification Proof:</label>
          <input
            type="text"
            name="identificationProof"
            value={formData.identificationProof}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">
              I agree to the terms and conditions of the Hostel Agreement.
            </span>
          </label>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="text-gray-700">
        <h3 className="font-bold">Terms and Conditions:</h3>
        <ul className="list-disc list-inside">
          <li>The refund of the security deposit will be made to the student's father, mother, or legal guardian's bank account. The student must provide proper bank details and identification proof.</li>
          <li>In case of any complaints regarding the refund of the security deposit, students/parents can contact the Hostel Association. If a valid complaint is raised, the district administration will take necessary action against the hostel.</li>
          <li>This Easy Exit Policy applies only to hostels registered under the Mera Room and approved by the district administration.</li>
          <li>If a student damages hostel property or equipment or property of other student, they will be responsible for compensating for the damage. A minimum fine of ₹1000 will be imposed, along with necessary corrective action.</li>
          <li>Parents or guardians must accompany students during hostel admission. Only male guardians (father or brother) are allowed in boys' hostels, and only female guardians (mother or sister) are allowed in girls' hostels.</li>
          <li>If a student wishes to change their hostel due to personal reasons, they will be responsible for the financial implications. The hostel management will not bear any costs related to shifting.</li>
          <li>The use of electrical appliances like heating rods, room heaters, and gas stoves is strictly prohibited. If any of these appliances are found, a fine of ₹5000 will be imposed, and the student must vacate the hostel room.</li>
          <li>If a student is absent for more than 30 days without prior notice, their room will be considered vacant, and the hostel management has the right to allot it to another student.</li>
          <li>In case of any emergency (such as a medical situation), hostel management must be informed immediately. The hostel management will not bear any medical expenses; students will be responsible for their own treatment costs.</li>
          <li>For female students: If a female student faces any issue or problem, it must be reported to the hostel warden. Parents must also be informed in such cases.</li>
          <li>Students must register their entry using a biometric machine at the hostel entrance. If a student fails to enter using biometric registration, the hostel management will not be responsible for their safety. This system is implemented for security purposes.</li>
          <li>Students leaving the hostel in the middle of the session must inform the hostel management in writing one month in advance.</li>
          <li>The student will be responsible for the safety of their personal belongings. The hostel management will not be responsible for any loss or theft.</li>
          <li>Students must enter the hostel before the scheduled deadline in the evening. In case of delay, they must inform the hostel management in advance.</li>
          <li>In case of any complaints related to the hostel, the student must first inform the hostel management. If the issue is not resolved, they can contact the Mera Room.</li>
          <li>The entry of outsiders into the hostel without prior permission is strictly prohibited. If found, respected parents will be informed.</li>
          <li>Any dispute will be resolved within the jurisdiction of Kota.</li>
          <li>Note: The student and the hostel management must follow the above rules and conditions within 24 hours of admission. In case of any dispute regarding these rules, the final decision will be made by the District Collector, Kota, and the Kota Hostel Association.</li>
        </ul>
      </div>
    </div>
  );
};

export default HostelAgreementForm;
