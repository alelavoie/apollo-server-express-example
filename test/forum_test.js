const chai = require("chai");

const expect = chai.expect;
const url = "http://localhost:5000/";
const request = require("supertest")(url);

describe("Forum", () => {

  before(async () => {
    await request
        .post("graphql")
        .send({ query: 'mutation {seed}' })
        .expect(200)
  })

  it("Fetch all forums", async ()  => {

    const response = await request
        .post("graphql")
        .send({ query: "{ forums {id name} }" })
        .expect(200)
    
    expect(response.body.data.forums.length).to.equal(2);
    expect(response.body.data.forums[0].id).to.equal("1");
    expect(response.body.data.forums[0].name).to.equal(
      "Forum 1"
    );
  });

  it("Fetch forum by ID", async () => {

    const response = await request
        .post("graphql")
        .send({ query: '{ forum (id:"2") {id name} }' })
        .expect(200)

    expect(response.body.data.forum.id).to.equal("2");
    expect(response.body.data.forum.name).to.equal(
      "Forum 2"
    );
      
  });  

  it("Create a new forum", async () =>  {
    const create_resp = await request
        .post("graphql")
        .send({ query: 'mutation { createForum(name: "My new forum") {id name}}' })
        .expect(200)
    
    expect(create_resp.body.data.createForum.id).to.equal("3");
    expect(create_resp.body.data.createForum.name).to.equal("My new forum");

    const get_resp = await request
        .post("graphql")
        .send({ query: '{ forum (id: "3") {users {id name}} }' })
        .expect(200)
    expect(get_resp.body.data.forum.users.length).to.equal(1);
    expect(get_resp.body.data.forum.users[0].id).to.equal("1");
    expect(get_resp.body.data.forum.users[0].name).to.equal(
      "Alexandre Lavoie"
    );
  });

  it("Join a forum", async () =>  {
    const create_resp = await request
        .post("graphql")
        .send({ query: 'mutation { joinForum(id: "2")}' })
        .expect(200)
    
    expect(create_resp.body.data.joinForum).to.equal("Successfully joind forum Forum 2");
  });

  it("Fetch all users registered to a forum", async () => {
    const get_resp = await request
        .post("graphql")
        .send({ query: '{ forum (id: "2") {users {id name}} }' })
        .expect(200)
    expect(get_resp.body.data.forum.users.length).to.equal(1);
    expect(get_resp.body.data.forum.users[0].id).to.equal("1");
    expect(get_resp.body.data.forum.users[0].name).to.equal(
      "Alexandre Lavoie"
    );
  });

  it("Fetch all messages in a forum", async () => {
    const get_resp = await request
        .post("graphql")
        .send({ query: '{ forum (id: "1") {messages {id text sendingTime author {name, picture}}} }' })
        .expect(200)
    expect(get_resp.body.data.forum.messages.length).to.equal(3);
    expect(get_resp.body.data.forum.messages[0].id).to.equal("2");
    expect(get_resp.body.data.forum.messages[1].id).to.equal("1");
    expect(get_resp.body.data.forum.messages[2].id).to.equal("5");
    expect(get_resp.body.data.forum.messages[0]).to.have.property("text")
    expect(get_resp.body.data.forum.messages[0]).to.have.property("sendingTime")
    expect(get_resp.body.data.forum.messages[0]).to.have.property("author")
    expect(get_resp.body.data.forum.messages[0].author).to.have.property("name")
    expect(get_resp.body.data.forum.messages[0].author).to.have.property("picture")
  });

  it("Post a message", async () => {
    const get_post = await request
        .post("graphql")
        .send({ query: 'mutation { postMessage(forum_id: "1", text:"My new message")}' })
        .expect(200)
    
    expect(get_post.body.data.postMessage).to.equal("Successfully posted message in Forum 1");

    const get_resp = await request
        .post("graphql")
        .send({ query: '{ forum (id: "1") {messages {id text sendingTime author {name, picture}}} }' })
        .expect(200)
    expect(get_resp.body.data.forum.messages.length).to.equal(4);
    expect(get_resp.body.data.forum.messages[3].text).to.equal("My new message");
    

  });

  
});
