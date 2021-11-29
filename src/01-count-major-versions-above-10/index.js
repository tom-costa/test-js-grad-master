const axios = require("axios");

/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

module.exports = async function countMajorVersionsAbove10() {

  axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true
    })
    .then(res => {
      console.log(res);
      count(res);
    })
    .catch(err => console.error(err));
}

function count(res) {
  const content = (res.data.content);
  console.log(content); // Logging the full Object/ Array

  // Testing that I can pass 1 instance and data type of output:
  const versionNumber = (content[0].package.version);
  console.log(parseFloat(versionNumber)); // Converting the string to a number
  console.log(typeof (parseFloat(versionNumber))); // Double checking it IS a number

  // Initialising empty array to push results from For Loop into it:
  const newArray = [];

  for (let i = 0; i < content.length; i++) {
    const versions = content[i].package.version;

    if (parseFloat(versions) > 10) {
      newArray.push(versions);
    }

  }
  const answer = newArray.length;
  console.log("Versions higher than 10: ", answer);

  return count
};