const { handler } = require("./index");
const { parseQuery } = require("./helper");

describe("basic tests", () => {
  test("handler function exists", () => {
    expect(typeof handler).toBe("function");
  });
});

describe("test query parser", () => {
  test("parser querystring works", () => {
    const queryString = "zip[contain]=0692&state[eq]=CT&primary_city[eq]=Stamford";
    const queryStringResponse = parseQuery(queryString);
    
    expect(queryStringResponse).toMatchObject({
      zip: expect.any(Object),
      state: expect.any(Object),
      primary_city: expect.any(Object),
    });
    
  });
});
