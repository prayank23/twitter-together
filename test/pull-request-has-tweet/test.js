const assert = require("assert");

process.env.GITHUB_ACTION = "twitter-together";
  assert.equal(code, 0);
  assert.deepEqual(nock.pendingMocks(), []);