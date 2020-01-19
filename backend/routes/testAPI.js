var express = require('express');
var router = express.Router();
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

router.post('/', async function(req, res, next) {
  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment(req.body);
    res.send(result);
}
);

router.post("/entities", async function(req, res, next) {
  // Detects the sentiment of the text
  const [result] = await client.analyzeEntities(req.body);
  res.send(result);
});

module.exports = router;