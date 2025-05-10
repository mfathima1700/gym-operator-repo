// utils/googleApi.js (or wherever you manage API calls)
"ues client";

export const loadGoogleAPI = () => {
    return new Promise((resolve, reject) => {
      // Load the Google API client and the Google Auth2 library
      gapi.load('client:auth2', () => {
        // Initialize the client with your API key, client ID, and calendar scope
        gapi.client.init({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/calendar',
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
          ],
        })
          .then(() => {
            console.log('Google API Client initialized');
            resolve(); // Resolve when the API is initialized
          })
          .catch((error) => {
            console.error('Error initializing Google API client:', error);
            reject(error); // Reject on failure
          });
      });
    });
  };
  