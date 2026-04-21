import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

async function init() {
  const app = express();

  app.use(express.json());

  // Create Graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            say(name:String): String
        }
    `, // Schema
    resolvers: {
      Query: {
        hello: () => `Hey yo`,
        say: (_, { name }) => {
          return `Hey ${name}`;
        },
      },
    },
  });

  // Start GQL Server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Hello" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(8000, () => console.log(`Server is running at PORT 8000`));
}

init();
