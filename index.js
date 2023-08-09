const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const token = event["authorizationToken"];

  let permission = "Deny";

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    permission = "Allow";
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const authResponse = {
    principalId: "user",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: permission,
          Resource: process.env.AWS_RESSOURCE,
        },
      ],
    },
  };
  return authResponse;
};
