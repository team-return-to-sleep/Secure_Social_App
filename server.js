const express = require('express');
const { initCrypto, VirgilCrypto, VirgilAccessTokenSigner } = require('virgil-crypto');
const { JwtGenerator } = require('virgil-sdk');

async function getJwtGenerator() {
  await initCrypto();

  const virgilCrypto = new VirgilCrypto();
  // initialize JWT generator with your App ID and App Key ID you got in
  // Virgil Dashboard.
  return new JwtGenerator({
    appId: edc8a6762fc0461186c6c83aef48b3e3,
    apiKeyId: 13195c9d6dce22b5066c373ceb4c3e82,
    // import your App Key that you got in Virgil Dashboard from string.
    apiKey: virgilCrypto.importPrivateKey(MC4CAQAwBQYDK2VwBCIEIC4ZQOCq5pYszicaLq8kTLF+TDw5TRnFQX3AX+QvfQeE),
    // initialize accessTokenSigner that signs users JWTs
    accessTokenSigner: new VirgilAccessTokenSigner(virgilCrypto),
    // JWT lifetime - 20 minutes (default)
    millisecondsToLive:  20 * 60 * 1000
  });
}

const generatorPromise = getJwtGenerator();

app.get('/virgil-jwt', (req, res) => {
  const generator = await generatorPromise;
  // Get the identity of the user making the request (this assumes the request
  // is authenticated and there is middleware in place that populates the
  // `req.user` property with the user record).
  const virgilJwtToken = generator.generateToken(req.user.identity);
  // Send it to the authorized user
  res.json({ virgilToken: virgilJwtToken.toString() });
});