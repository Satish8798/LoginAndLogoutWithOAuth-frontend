import axios from 'axios';

async function getGoogleUserDetails(tokenResponse) {
  try {
    const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      ); 
      return response;
  } catch (error) {
    console.log(error);
  }
}

export default getGoogleUserDetails