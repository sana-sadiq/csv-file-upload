document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const uploadBtn = document.getElementById("uploadBtn");
  const fileList = document.getElementById("fileList");
  const dataDisplay = document.getElementById("dataDisplay");

  // Function to display list of uploaded files
  const displayFiles = () => {
    // Fetch list of uploaded files from the server
    fetch("/files")
      .then((response) => response.json())
      .then((files) => {
        // Clear previous file list
        fileList.innerHTML = "<h2>Uploaded Files:</h2>";
        // Iterate through each file and create clickable links
        files.forEach((file) => {
          fileList.innerHTML += `<p><a href="data.html?filename=${file}">${file}</a></p>`;
        });
      })
      .catch((error) => console.error("Error fetching files:", error));
  };

  // Function to display data from selected file in a table
  const displayData = (filename) => {
    // Fetch data from the selected file
    fetch(`/data/${filename}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract filename and data rows
        const { filename, data: rows } = data;
        // Construct HTML for the table
        let tableHTML = `<h2>Data from ${filename}:</h2>`;
        tableHTML += "<table><thead><tr>";

        // Create table headers dynamically
        Object.keys(rows[0]).forEach((header) => {
          tableHTML += `<th>${header}</th>`;
        });
        tableHTML += "</tr></thead><tbody>";

        // Populate table rows with data
        rows.forEach((row) => {
          tableHTML += "<tr>";
          Object.values(row).forEach((value) => {
            tableHTML += `<td>${value}</td>`;
          });
          tableHTML += "</tr>";
        });

        tableHTML += "</tbody></table>";
        // Display the table on the page
        dataDisplay.innerHTML = tableHTML;
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Display list of uploaded files on page load
  displayFiles();

  // Event listener for file upload button
  uploadBtn.addEventListener("click", () => {
    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("csvFile", fileInput.files[0]);

    // Send file upload request to the server
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to upload file");
        }
      })
      .then((data) => {
        console.log("File uploaded successfully:", data);
        // Refresh the file list after successful upload
        displayFiles();
      })
      .catch((error) => console.error("Error uploading file:", error));
  });

  // Event listener for file selection
  fileInput.addEventListener("change", () => {
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
      // Display data from the selected file
      displayData(selectedFile.name);
    }
  });
});
