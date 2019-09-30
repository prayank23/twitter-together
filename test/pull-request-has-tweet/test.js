const nock = require("nock");
const tap = require("tap");
process.env.GITHUB_EVENT_NAME = "pull_request";
process.env.GITHUB_TOKEN = "secret123";
process.env.GITHUB_EVENT_PATH = require.resolve("./event.json");
process.env.GITHUB_REF = "";
process.env.GITHUB_WORKSPACE = "";
process.env.GITHUB_WORKFLOW = "";
process.env.GITHUB_ACTION = "";
process.env.GITHUB_ACTOR = "";
process.env.GITHUB_REPOSITORY = "";
process.env.GITHUB_SHA = "";
nock("https://api.github.com", {
    authorization: "token secret123"
  .get("/repos/gr2m/twitter-together/pulls/123/files")
      status: "added",
      filename: "tweets/hello-world.tweet"
  ]);
nock("https://api.github.com", {
    accept: "application/vnd.github.diff",
    authorization: "token secret123"
  .get("/repos/gr2m/twitter-together/pulls/123")
  .reply(
    200,
    `diff --git a/tweets/progress.tweet b/tweets/progress.tweet
+Hello, world!`
  );
nock("https://api.github.com")
  .post("/repos/gr2m/twitter-together/check-runs", body => {
    tap.equal(body.name, "twitter-together");
    tap.equal(body.head_sha, "0000000000000000000000000000000000000002");
    tap.equal(body.status, "completed");
    tap.equal(body.conclusion, "success");
      title: "Preview: 1 tweet(s)",
      summary: "### ✅ Valid\n\n> Hello, world!"
    });
    return true;
  .reply(201);
process.on("exit", code => {
  tap.equal(code, 0);
  tap.deepEqual(nock.pendingMocks(), []);
});
require("../../lib");