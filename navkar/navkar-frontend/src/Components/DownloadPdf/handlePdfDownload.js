const url = process.env.REACT_APP_API_URL
const handlePdfDownload = async (quotation) => {
    try {

        const response = await fetch(`${url}${quotation.link}`);
        console.log('res', response)
        if (!response.ok) {
            throw new Error(`Failed to download PDF: ${response.statusText}`);
        }
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = `Quotation_${quotation.uploadedAt}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading the PDF:', error);
    }
};
export default handlePdfDownload