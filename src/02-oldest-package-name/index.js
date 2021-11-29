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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

module.exports = async function oldestPackageName() {
  // TODO
  axios
    .post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(res => {
      console.log(res);
      name(res);
    })
    .catch(err => console.error(err));
}

// Function "name" that passes in the data from the response:
function name(res) {
  const content = (res.data.content); // Printing the content of the Array
  const date = (content[0].package.date); // Going further into the array to reach the "date" field

  // Initialising empty array to push results from For Loop into it:
  const newArray = [];

  for (let i = 0; i < content.length; i++) {
    const obj = {}
    obj["date"] = content[i].package.date;
    obj["name"] = content[i].package.name;
    newArray.push(obj);
  }

  console.log(newArray.sort());

  // Sort the newArray based on the date:
  newArray.sort((function compare(a, b) {
    return new Date(a.date) - new Date(b.date)
  }));

  // Grabbing the "name" value of the oldest object in the sorted array:
  const answer = newArray[0].name;

  // Answer returns 'react-router' as instructed.
  console.log("Name of the oldest package: ", answer);

  return name
};