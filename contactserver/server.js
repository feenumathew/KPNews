// Step 1: Import required dependencies
const express = require('express');  // Express framework for the server
const fs = require('fs');           // fs (file system) to read/write to files
const cors = require('cors');       // CORS middleware to handle cross-origin requests

const app = express();
const port = 3000;  // Define the port for the server to listen on

// Step 2: Middleware setup
app.use(cors());          // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json());  // Parse incoming requests with JSON payload

// Step 3: Function to read data from the data.json file
const readData = () => {
  try {
    const data = fs.readFileSync('data.json');  // Read the file synchronously
    return JSON.parse(data);  // Parse the JSON content of the file and return it
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];  // If file doesn't exist, return an empty array
    }
    throw err;  // If any other error occurs, throw it
  }
};

// Step 4: Function to write data to the data.json file
const writeData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));  // Write the data as a formatted JSON to the file
};

// Step 5: POST route to save data
app.post('/save-data', (req, res) => {
  const formData = req.body;  // Get the data from the request body
  const data = readData();    // Read the current data from the data.json file
  data.push(formData);        // Add the new data to the existing data
  writeData(data);            // Write the updated data back to the data.json file

  res.status(201).send({ message: 'Data saved successfully' });  // Respond with a success message
});

// Step 6: Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);  // Print server running message
});