document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('contactForm');
  // Ensure the form is correctly linked and add event listener for submit
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});

// Step 1: Event listener for form submission
async function handleFormSubmit(event) {
  event.preventDefault();  // Prevent the default form submission behavior (i.e., page reload)
  console.log('Form submission started');  // Log the start of the form submission

  // Disable the submit button to prevent multiple submissions
  const submitButton = event.target.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;  // Disable the button to prevent further clicks
  }

  // Step 2: Collect form data
  const formData = {
    name: document.getElementById('name').value,  // Get the value of the 'name' input field
    email: document.getElementById('email').value,  // Get the value of the 'email' input field
    subject: document.getElementById('subject').value,  // Get the value of the 'subject' input field
    message: document.getElementById('message').value,  // Get the value of the 'message' input field
  };

  console.log('Form Data:', formData);  // Log the collected form data for debugging or review

  try {

    // Step 3: Send form data to the server using async function
    await sendFormDataToServer(formData);  
    console.log('Data saved successfully');  // Log successful data save
      // Reset the form after the toast disappears (5 seconds)
    // Step 4: Notify user of success using Toastify
    
      alert("Your message was stored successfully!")   // Success message
    
  } catch (error) {
    // Step 6: Handle any errors during form submission
    console.error('Error during submission:', error);  // Log the error to the console

    // Step 7: Notify user of failure using Toastify
    Toastify({
      text: "There was an error submitting the form. Please try again.",  // Failure message
      duration: 5000,  // How long the toast stays on screen (in milliseconds)
      close: true,  // Show a close button on the toast
      gravity: "top",  // Position of the toast on the screen (top/bottom)
      position: "center",  // Position of the toast on the screen (left/right)
      backgroundColor: "red",  // Toast background color for errors
    }).showToast();
  }
}

// Step 8: Function to send form data to the server
async function sendFormDataToServer(formData) {
  console.log('Sending data to server:', formData);  // Log the form data being sent to the server

  try {
    // Step 9: Send the data using the fetch API to the backend
    const response = await fetch('http://localhost:3000/save-data', {  // Change the URL to your server's endpoint
      method: 'POST',  // Set the HTTP method to POST for sending data
      headers: {
        'Content-Type': 'application/json',  // Tell the server that we are sending JSON data
      },
      body: JSON.stringify(formData),  // Convert the form data to a JSON string and send it as the request body
    });

    // Step 10: Check if the response was successful
    if (!response.ok) {
      throw new Error('Failed to save data');  // If the response is not OK (e.g., not status 200), throw an error
    }

    // Step 11: Parse and log the server's response (optional)
    const data = await response.json();  // Parse the JSON response from the server
    console.log('Data saved to server:', data);  // Log the server response data (optional)

  } catch (error) {
    // Step 12: Handle errors if the fetch request fails
    console.error('Error saving data to server:', error);  // Log any error that occurs during the fetch
    throw new Error('Failed to save data to server');  // Throw an error to indicate failure to the calling function
  }
}
