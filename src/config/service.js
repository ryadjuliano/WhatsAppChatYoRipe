import { APP_BASE_API_URL} from './constants'

export async function GetGroupMessages(userData) {
    try {
      const response = await fetch(APP_BASE_API_URL+'/messages', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const jsonResponse = await response.json();
      return jsonResponse; // Return the JSON response
    } catch (error) {
      console.error('There was an error with the fetch operation:', error);
      throw error; o
    }
  }
  