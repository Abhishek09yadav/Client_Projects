import axios from "axios";
import { useState } from "react";

const url = import.meta.env.VITE_API_URL;
const handlePdfDownload = async (quotation) => {
  console.log(quotation);
//   const [resData, setResData] = useState();
  const fetchQuotationDetails = async (quotation) => {
    // setLoading(true);
    // setQuotation(resData);
    try {
      const response = await axios.get(`${url}/api/quotation/${quotation.id}`);

      console.log("Quotation details:", response.data);
    } catch (error) {
      console.error("Error fetching quotation details:", error);
    }
  };
  fetchQuotationDetails(quotation);
};
export default handlePdfDownload;
