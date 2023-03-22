const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initCrypto, VirgilCrypto, VirgilAccessTokenSigner } = require('virgil-crypto');
const { Jwt, JwtGenerator} = require('virgil-sdk');

(async () => {
  // Initialize the crypto library
  const nodeFetch = await import('node-fetch');
  globalThis.fetch = nodeFetch.default;
  await initCrypto();

  const virgilCrypto = new VirgilCrypto();
  const privateKeyData = "MC4CAQAwBQYDK2VwBCIEIFDm7Nh2x0fduX8wDMxMIC3DP66+3DYw34gbv6xu8lv0";
  const privateKey = virgilCrypto.importPrivateKey(privateKeyData);
  const apiKeyId = "28b3087b904249c64be92f79a9e05805";
  const appId = "edc8a6762fc0461186c6c83aef48b3e3";
  const accessTokenSigner = new VirgilAccessTokenSigner(virgilCrypto);
  const jwtGenerator = new JwtGenerator({
    appId,
    apiKeyId,
    apiKey: privateKey,
    accessTokenSigner,
    millisecondsToLive: 60 * 60 * 1000, // 1 hour
  });

  function generateVirgilJwt(identity) {
    return jwtGenerator.generateToken(identity).toString();
  }

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // Create an endpoint for generating Virgil JWT tokens
  app.post('/virgil-jwt', (req, res) => {
    const identity = req.body.identity;
    const virgilJwt = generateVirgilJwt(identity);
    res.json({ virgil_jwt: virgilJwt });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();