import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { BookResolver } from "./resolvers/BookResolver";
import { UserResolver } from './resolvers/UserResolver';
import { myDataSource } from "../app-data-source";

require("dotenv").config();

import cors from "cors";

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

async function main() {
await myDataSource
        .initialize()
        .then(() => {
            console.log("\n 😻 Database connection is active!")
        })
        .catch((err:any) => {
            console.error("Error during Data Source initialization:", err)
        })

  const schema = await buildSchema({ resolvers: [BookResolver, UserResolver] });

  const server = new ApolloServer({ schema });
  await server.start();
  
  const app = express();
  app.use(cors(corsOptions));

  server.applyMiddleware({ app });
  
  await app.listen({ port: process.env.SERVER_PORT }, () =>
    console.log(`\n 🚀 Server ready at http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`)
  );    
}

main();
