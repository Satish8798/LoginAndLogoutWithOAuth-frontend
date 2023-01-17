import axios from 'axios';

//function used for getting google user details
async function getGoogleUserDetails(tokenResponse) {
  try {

    // requesting the google api for user details using access token
    const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      ); 

      // returning the response
      return response;
  } catch (error) {
    console.log(error);
  }
}

export default getGoogleUserDetails