import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import signatureimg from "../../assets/signature.jpeg";
import "./QuotationTemplate.css";

const QuotationTemplate = ({ quotationDetails, userDetails }) => {
  const handleOnClick = async () => {
    try {
      const element = document.querySelector("#generate-pdf");
      const opt = {
        margin: 1,
        filename: `${userDetails?.name || "quotation"}_quotation.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate the quotation.");
    }
  };

  const totalQuantity = quotationDetails?.products?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div id="generate-pdf" className="pdf-content">
          <div className="nav-logo-container">
            <img src={logo} style={{ maxWidth: "90px" }} alt="logo" />
            <p>NAVKAR</p>
          </div>

          <div className="details">
            <div className="company-details-box">
              <p className="company-details">Contact: 02646221638</p>
              <p className="company-details">Email: shrinavkar@gmail.com</p>
              <p className="company-details">
                Address: F-7, Arunoday Complex,
                <br />
                GIDC Ankleshwar - 393002 Gujarat (India)
              </p>
            </div>

            <div className="customer-details-box">
              {userDetails ? (
                <div>
                  <p className="customer-details">Name: {userDetails?.name}</p>
                  <p className="customer-details">Email: {userDetails?.email}</p>
                  <p className="customer-details">
                    City: {userDetails?.city || "N/A"}
                  </p>
                  <p className="customer-details">
                    State: {userDetails?.state || "N/A"}
                  </p>
                  <p className="customer-details">
                    Phone No.: {userDetails?.phoneNo}
                  </p>
                </div>
              ) : (
                <p>Loading user details...</p>
              )}
            </div>
          </div>

          <table className="selected-products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Price</th>
                <th>Tax (%)</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {quotationDetails?.products?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td>₹{Number(item.price).toFixed(2)}</td>
                  <td>{item.Tax}%</td>
                  <td>₹{Number(item.totalPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-price">
            <p>
              <strong>
                Final Total: ₹{quotationDetails?.totalPrice?.toFixed(2)}
              </strong>
            </p>
          </div>

          {totalQuantity > 0 && (
            <div className="total-quantity">
              <p>Total Quantity: {totalQuantity}</p>
            </div>
          )}

          <h3 className="signature">
            Sign:{" "}
            <img src={signatureimg} alt="signature" className="signature" />
          </h3>
        </div>

        <button onClick={handleOnClick}>Download PDF</button>
      </div>
    </div>
  );
};

export default QuotationTemplate;
