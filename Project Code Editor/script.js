// Get all textareas and preview frame
const htmlInput = document.getElementById("html-code");
const cssInput = document.getElementById("css-code");
const jsInput = document.getElementById("js-code");
const previewFrame = document.getElementById("preview-frame");
const downloadBtn = document.getElementById("download-btn");

// Update preview frame in real-time
function updatePreview() {
  const html = htmlInput.value;
  const css = `<style>${cssInput.value}</style>`;
  const js = `<script>${jsInput.value}<\/script>`;
  const finalOutput = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      ${css}
    </head>
    <body>
      ${html}
      ${js}
    </body>
    </html>
  `;

  const frameDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
  frameDoc.open();
  frameDoc.write(finalOutput);
  frameDoc.close();
}

// Save code as downloadable HTML file
function downloadCode() {
  const html = htmlInput.value;
  const css = `<style>${cssInput.value}</style>`;
  const js = `<script>${jsInput.value}<\/script>`;
  const finalHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      ${css}
    </head>
    <body>
      ${html}
      ${js}
    </body>
    </html>
  `;

  const blob = new Blob([finalHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "my-code.html";
  link.click();
  URL.revokeObjectURL(url);
}

// Event listeners
htmlInput.addEventListener("input", updatePreview);
cssInput.addEventListener("input", updatePreview);
jsInput.addEventListener("input", updatePreview);
downloadBtn.addEventListener("click", downloadCode);

// Initial preview load
updatePreview();
