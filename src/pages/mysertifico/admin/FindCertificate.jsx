import React, { useState, useMemo, useRef, useEffect } from "react";
import Sidebar from "../../../components/mysertifico/Sidebar";
import DashboardNavbar from "../../../components/mysertifico/DashboardNavbar";
import { elementsByTemplate, recipientDatabase } from "../../../data/sampleTemplateData";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/* ---------------- Preview stage ---------------- */
function PreviewStage({ certificate, elementsMap }) {
  const widthWrapperRef = useRef(null);    // measures the 58%/100% wrapper
  const [wrapperW, setWrapperW] = useState(900); // measured px width

  // measure the wrapper on mount/resize
  useEffect(() => {
    function measure() {
      if (!widthWrapperRef.current) return;
      const w = widthWrapperRef.current.clientWidth || 900;
      setWrapperW(w);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // pull template config (must exist in elementsByTemplate)
  // each template entry should be: { base_w, base_h, elements: [...] }
  const tpl = elementsMap?.[certificate?.template_code] || {};
  const base_w = tpl.base_w || 1123; 
  const base_h = tpl.base_h || 794;  
  const templateEls = Array.isArray(tpl.elements) ? tpl.elements : [];

  // orientation (derived from template, not the image to avoid load-race)
  const isPortrait = base_h >= base_w;

  // visual width toggle 
  const portraitWidth = "58%";
  const landscapeWidth = "100%";
  const wrapperWidth = isPortrait ? portraitWidth : landscapeWidth;

  // scale: wrapper width vs base_w
  const scale = wrapperW / base_w;

  return (
    <div className="p-6 flex-grow overflow-auto bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-center">
        <div id="certificate-preview" className="relative shadow-lg w-full max-w-[900px]">
          <div className="relative mx-auto w-full max-w-[900px]">
            {/* width wrapper restored (58% for portrait, 100% for landscape) */}
            <div
                ref={widthWrapperRef}
                className="relative mx-auto"
                style={{ width: wrapperWidth }}
                >
              {/* background image sized from fixed base_w/base_h times scale */}
              <img
                src={certificate.image}
                alt="Template Background"
                className="block"
                style={{
                  width: `${base_w * scale}px`,
                  height: `${base_h * scale}px`,
                }}
              />

              {/* overlay locked to base_w/base_h and uniformly scaled */}
              <div id="cert-canvas" 
              className="absolute top-0 left-0"
              style={{ width: base_w, height: base_h, 
              transform:`scale(${scale})`, 
              transformOrigin:'top left' }}
              >

                {templateEls.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center text-black">
                    <h1 className="text-3xl font-bold mb-4">{certificate.data?.Certificate_Title}</h1>
                    <p className="text-lg mb-2">{certificate.data?.Certificate_Body}</p>
                    <h2 className="text-2xl font-semibold mb-2">{certificate.data?.Recipient_Name}</h2>
                    <p className="mb-4">{certificate.data?.Event_Description}</p>
                    <p className="italic text-sm">{certificate.data?.Event_Date}</p>
                  </div>
                )}

                {templateEls
                  .filter(
                    (el) =>
                      el.element_id &&
                      (el.content || certificate.data?.[el.element_id] !== undefined)
                  )
                  .map((el, idx) => {
                    const raw = certificate.data?.[el.element_id] ?? el.content ?? "";
                    const content = String(raw).replace(
                      /{(\w+)}/g,
                      (_, k) => certificate.data?.[k] || ""
                    );
                    const alignment = (el.alignment || "center").toLowerCase();

                    const leftPx = el.position_x || 0;
                    const topPx = el.position_y || 0;

                    const style = {
                      position: "absolute",
                      top: `${topPx}px`,
                      left: `${leftPx}px`,
                      transform:
                        alignment === "center" || alignment === "centre"
                          ? "translate(-50%, -50%)"
                          : alignment === "right"
                          ? "translate(-100%, -50%)"
                          : "translateY(-50%)",
                      textAlign: alignment,
                      fontFamily: el.font_family || "Montserrat, sans-serif",
                      fontSize: el.font_size ? `${el.font_size}px` : undefined,
                      fontWeight: el.font_weight || "normal",
                      color: el.color || "#000",
                      width: el.width ? `${el.width}px` : undefined,
                      height: el.height ? `${el.height}px` : undefined,
                      whiteSpace: "pre-wrap",
                      pointerEvents: "none",
                    };

                    if (el.type === "text") {
                      return (
                        <div key={idx} style={style}>
                          {content}
                        </div>
                      );
                    }

                    if (el.type === "image") {
                      return (
                        <img
                          key={idx}
                          src={content}
                          alt={el.element_id}
                          style={style}
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      );
                    }

                    if (el.type === "qrcode") {
                      const size = Math.round(Math.max(el.width || 100, el.height || 100));
                      const qrSrc = `https://quickchart.io/qr?text=${encodeURIComponent(
                        content
                      )}&size=${size}`;
                      return (
                        <img
                          key={idx}
                          src={qrSrc}
                          alt="QR Code"
                          style={{ ...style, width: `${size}px`, height: `${size}px` }}
                        />
                      );
                    }

                    return null;
                  })}
              </div>
            </div>
            {/* /width wrapper */}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main page ---------------- */
const FindCertificate = ({ theme, onThemeToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [certificateSearch, setCertificateSearch] = useState("");
  const [filters, setFilters] = useState({
    style: "all",
    orientation: "all",
    alignment: "all",
    color: "all",
  });
  const [previewCertificate, setPreviewCertificate] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setRecipientName("");
      setNotFound(false);
      setValidationError(true);
      setPreviewCertificate(null);
      return;
    }

    setValidationError(false);

    const recipient = recipientDatabase[searchTerm];
    if (recipient) {
      setResults(recipient.certificates);
      setRecipientName(recipient.name);
      setNotFound(false);
    } else {
      setResults([]);
      setRecipientName("");
      setNotFound(true);
    }
  };

  const filteredResults = useMemo(() => {
    return results
      .filter((cert) => cert.name.toLowerCase().includes(certificateSearch.toLowerCase()))
      .filter((cert) => {
        return (
          (filters.style === "all" || cert.style === filters.style) &&
          (filters.orientation === "all" || cert.orientation === filters.orientation) &&
          (filters.alignment === "all" || cert.alignment === filters.alignment) &&
          (filters.color === "all" || cert.color === filters.color)
        );
      });
  }, [results, filters, certificateSearch]);

const handleDownloadPDF = async () => {
  if (!previewCertificate) return;

  // pick the element that is exactly the certificate (not outer modal)
  const node = document.getElementById("cert-canvas"); // or the wrapper around bg+overlay
  if (!node) return;

  try {
    const canvas = await html2canvas(node, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    // detect orientation from the canvas
    const isPortrait = canvas.height >= canvas.width;

    // A4 in points; let jsPDF handle the exact size
    const pdf = new jsPDF({
      orientation: isPortrait ? "p" : "l",
      unit: "pt",
      format: "a4",
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    // full-bleed: fill the whole page
    pdf.addImage(imgData, "PNG", 0, 0, pageW, pageH);

    pdf.save(`${previewCertificate.name}.pdf`);
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeSidebar} />
      )}

      {/* Main */}
      <div
        className={`relative min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <DashboardNavbar
          onSidebarToggle={toggleSidebar}
          theme={theme}
          onThemeToggle={onThemeToggle}
        />

        {/* Page */}
        <main className="p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Find Certificate</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Search for a recipient's certificate using their National ID.
                </p>
              </div>
            </div>

            {/* Search Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6">
              <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full sm:flex-grow">
                  <label
                    htmlFor="national-id-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    National ID
                  </label>
                  <input
                    type="text"
                    id="national-id-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                               focus:ring-primary focus:border-primary block w-full p-2.5 
                               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                               dark:text-white"
                    placeholder="e.g., 900101105555"
                    required
                  />
                  {validationError && (
                    <p className="mt-2 text-sm text-red-600">Oops! National ID cannot be empty.</p>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto justify-center text-white bg-primary hover:bg-primary-dark 
                             focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg 
                             text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                  <i className="ri-search-line mr-2 -ml-1"></i>
                  Search
                </button>
              </div>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Certificates for <span>{recipientName}</span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Found {filteredResults.length} certificate(s).
                    </p>
                  </div>
                  <div className="relative w-full md:w-72">
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      value={certificateSearch}
                      onChange={(e) => setCertificateSearch(e.target.value)}
                      placeholder="Search certificate name..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                                 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Table or no results */}
                {filteredResults.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 w-12">#</th>
                          <th scope="col" className="px-6 py-3">Certificate Name</th>
                          <th scope="col" className="px-6 py-3">Issued Date</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                          <th scope="col" className="px-6 py-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResults.map((cert, index) => (
                          <tr key={cert.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">
                              {index + 1}.
                            </td>
                            <td className="px-6 py-4">{cert.name}</td>
                            <td className="px-6 py-4">{cert.issuedDate}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 
                                              rounded-full dark:bg-green-900 dark:text-green-300">
                                {cert.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => setPreviewCertificate(cert)}
                                className="view-btn text-primary dark:text-primary-light hover:underline"
                              >
                                <i className="ri-eye-line text-lg"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No certificates match your search.
                  </p>
                )}
              </div>
            )}

            {/* Not Found */}
            {notFound && (
              <div className="text-center py-16">
                <i className="ri-user-unfollow-line text-6xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Recipient Not Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  The National ID you entered does not match any records in our database.
                </p>
              </div>
            )}

            {/* Preview Modal */}
            {previewCertificate && (
              <div
                className="fixed inset-0 bg-black/70 z-[120] flex items-center justify-center p-4 backdrop-blur-sm"
                onClick={() => setPreviewCertificate(null)}
              >
                <div
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl transform transition-all opacity-100 scale-100 flex flex-col max-h-[92vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">
                      Preview: {previewCertificate.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setPreviewCertificate(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>

                  {/* Body */}
                  <PreviewStage
                    certificate={previewCertificate}
                    elementsMap={elementsByTemplate}
                  />

                  {/* Footer */}
                  <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 gap-x-3">
                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark inline-flex items-center gap-2"
                    >
                      <i className="ri-download-2-line"></i>
                      <span>Download PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewCertificate(null)}
                      className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FindCertificate;
