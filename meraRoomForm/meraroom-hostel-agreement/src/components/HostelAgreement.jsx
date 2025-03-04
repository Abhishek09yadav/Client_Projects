import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Hostel Agreement Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Student Name"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Guardian Name"
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Bank Account Details"
          name="bankAccountDetails"
          value={formData.bankAccountDetails}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Identification Proof"
          name="identificationProof"
          value={formData.identificationProof}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
            />
          }
          label="I agree to the terms and conditions of the Hostel Agreement."
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
      <Accordion sx={{ mt: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="terms-content"
          id="terms-header"
        >
          <Typography variant="h6">Terms and Conditions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
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
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default HostelAgreementForm;
