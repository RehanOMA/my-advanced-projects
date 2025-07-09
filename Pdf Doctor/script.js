const form = document.getElementById("pdf-form");
const fileInput = document.getElementById("pdf-upload");
const startPageInput = document.getElementById("start-page");
const endPageInput = document.getElementById("end-page");
const fileNameDisplay = document.getElementById("file-name");
const pageInfoDisplay = document.getElementById("page-info");
const output = document.getElementById("output");
const downloadLink = document.getElementById("download-link");

let loadedPdf = null;
let totalPages = 0;

// Handle file selection and preview
fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  if (!file) {
    fileNameDisplay.textContent = "No file chosen";
    pageInfoDisplay.textContent = "";
    return;
  }

  fileNameDisplay.textContent = `Selected: ${file.name}`;

  try {
    const arrayBuffer = await file.arrayBuffer();
    loadedPdf = await PDFLib.PDFDocument.load(arrayBuffer);
    totalPages = loadedPdf.getPageCount();
    pageInfoDisplay.textContent = `Total pages: ${totalPages}`;
  } catch (err) {
    console.error("Error loading PDF:", err);
    alert("Could not load PDF. Please try another file.");
    fileNameDisplay.textContent = "No file chosen";
    pageInfoDisplay.textContent = "";
    loadedPdf = null;
    totalPages = 0;
  }
});

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!loadedPdf) {
    alert("Please upload a valid PDF file first.");
    return;
  }

  const startPage = parseInt(startPageInput.value);
  const endPage = parseInt(endPageInput.value);

  // Input validation
  if (
    isNaN(startPage) ||
    isNaN(endPage) ||
    startPage < 1 ||
    endPage < startPage ||
    endPage > totalPages
  ) {
    alert(`Please enter a valid page range between 1 and ${totalPages}.`);
    return;
  }

  try {
    const newPdf = await PDFLib.PDFDocument.create();
    const pagesToCopy = [];

    for (let i = startPage - 1; i < endPage; i++) {
      pagesToCopy.push(i);
    }

    const copiedPages = await newPdf.copyPages(loadedPdf, pagesToCopy);
    copiedPages.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    output.classList.remove("hidden");
  } catch (err) {
    console.error("Error extracting pages:", err);
    alert("Something went wrong while extracting pages.");
  }
});
