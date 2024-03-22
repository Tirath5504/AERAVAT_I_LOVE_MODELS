const {google} = require('googleapis');

API_KEY = 'AIzaSyBlxPbUie1V_FMswCNV8Cq7CZwkYXkWO0o';

DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

var temp;

google.discoverAPI(DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: 'i hope you die nigger',
        },
        requestedAttributes: {
          TOXICITY: {},
        },
      };

      client.comments.analyze(
          {
            key: API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            temp = response.data;
            console.log(JSON.stringify(temp.attributeScores.TOXICITY.summaryScore.value , null, 2));
          });
    })
    .catch(err => {
      throw err;
    });
