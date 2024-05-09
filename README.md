# CSV Upload and Data Display

This project allows users to upload CSV files, list the uploaded files, and display the data from the selected CSV file in a table format.

## Project Structure

The project consists of the following files and folders:

- **public folder**: Contains HTML files (`index.html` and `data.html`) and CSS styles (`styles.css`).
- **uploads folder**: Stores uploaded CSV files.
- **server.js**: Node.js server code to handle file uploads, file listing, and data retrieval from CSV files.
- **script.js**: JavaScript code to handle file upload functionality and display data from the selected CSV file.

## Getting Started

To run the project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running `npm install`.
4. Start the server by running `node server.js`.
5. Open your web browser and go to `http://localhost:3000`.

## Usage

### Uploading CSV Files

- Click on the "Choose File" button to select a CSV file from your computer.
- Click the "Upload" button to upload the selected file.
- The uploaded files will be listed below the upload button.

### Viewing Data

- Click on the filename of the uploaded CSV file to view its data.
- The data will be displayed in a table format.
- Use the search input box to filter data within the table.

## Technologies Used

- Node.js
- Express.js
- Multer (for file uploads)
- csv-parser (for parsing CSV files)
- HTML
- CSS
- JavaScript

## License

This project is licensed under the MIT License.
