const axios = require("axios");

let accessToken;
let tokenExpirationTime;

async function getNewAccessToken(callback) {
  // Make the request to Twitch oauth to get access token.
  try {
    const response = await axios.post(process.env.TWITCH_AUTH_URL, {
      grant_type: process.env.TWITCH_SECRET_GRANT_TYPE,
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
    });

    accessToken = response.data.access_token;
    tokenExpirationTime =
      new Date().getTime() + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
    throw new Error("Error getting access token: ", error);
  }
}

async function checkAccessToken(req, res, next) {
  if (!accessToken || new Date().getTime() > tokenExpirationTime) {
    try {
      let newAccessToken = await getNewAccessToken();
      console.log("Using new access token");
      req.headers.authorization = `${accessToken}`;
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  } else {
    console.log("Using saved token");
    req.headers.authorization = `${accessToken}`;
    next();
  }
}

module.exports = checkAccessToken;
