import axios from "axios";
import ReactDOM from "react-dom/client";
import html2pdf from "html2pdf.js";
import QuotationTemplate from "./QuotationTemplate";

const url = import.meta.env.VITE_API_URL;

const handlePdfDownload = async (quotation) => {
  try {
    const response = await axios.get(`${url}/api/quotation/${quotation.id}`);
    const quotationDetails = response.data;
    console.log("user details ->>", quotationDetails.user);

    // Create hidden container
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-10000px";
    container.style.left = "-10000px";
    document.body.appendChild(container);
    
    const root = ReactDOM.createRoot(container);
    root.render(
      <QuotationTemplate
        quotationDetails={quotationDetails}
        userDetails={quotationDetails?.user}
        isDownloadMode={true} // optional prop to hide button if needed
      />
    );

    // Wait for DOM to update
    setTimeout(async () => {
      const element = container.querySelector("#generate-pdf");
      if (!element) {
        console.error("PDF content element not found.");
        return;
      }

      const opt = {
        margin: 1,
        filename: `${quotation.userName}_quotation.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();

      // Cleanup
      root.unmount();
      document.body.removeChild(container);
    }, 500); // Allow some time for images to load/render
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

export default handlePdfDownload;
