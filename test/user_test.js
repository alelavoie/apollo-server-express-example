const chai = require("chai");

const expect = chai.expect;
const url = "http://localhost:5000/";
const request = require("supertest")(url);

describe("User", () => {
  before(async () => {
    await request
      .post("graphql")
      .send({ query: "mutation { seed}" })
      .expect(200);
  });

  it("Fetch current user", async () => {
    const response = await request
      .post("graphql")
      .send({ query: "{ currentUser {id name} }" })
      .expect(200);

    expect(response.body.data.currentUser.id).to.equal("1");
    expect(response.body.data.currentUser.name).to.equal("Alexandre Lavoie");
  });

  it("Fetch all users", async () => {
    const response = await request
      .post("graphql")
      .send({ query: "{ users {id name} }" })
      .expect(200);

    expect(response.body.data.users.length).to.equal(2);
    expect(response.body.data.users[1].id).to.equal("2");
    expect(response.body.data.users[1].name).to.equal(
      "Antoine Carbonneau Lavoie"
    );
  });

  it("Fetch user by id", async () => {
    const response = await request
      .post("graphql")
      .send({ query: '{ user (id: "1") {id name} }' })
      .expect(200);

    expect(response.body.data.user.id).to.equal("1");
    expect(response.body.data.user.name).to.equal("Alexandre Lavoie");
  });

  it("Fetch all forums a user is registered to", async () => {
    const response = await request
      .post("graphql")
      .send({ query: '{ user (id: "1") {forums {id name}} }' })
      .expect(200);

    expect(response.body.data.user.forums.length).to.equal(2);
    expect(response.body.data.user.forums[0].id).to.equal("1");
    expect(response.body.data.user.forums[0].name).to.equal("Forum 1");
  });
});
