import { Photon } from "@generated/photon";
import express from "express";
import { GraphQLServer } from "graphql-yoga";
import { makeSchema } from "nexus";
import { nexusPrismaPlugin } from "nexus-prisma";
import { join } from "path";

import { permissions } from "./permissions";
import { types } from "./resolvers";

const photon = new Photon();

const schema = makeSchema({
  types,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    typegen: join(__dirname, "../generated/nexus-typegen.ts"),
    schema: join(__dirname, "/schema.graphql")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@generated/photon",
        alias: "photon"
      },
      {
        source: join(__dirname, "types.ts"),
        alias: "ctx"
      }
    ],
    contextType: "ctx.Context"
  }
});

const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      photon
    };
  }
});

server.express.use("/images", express.static("uploads"));
server.start(
  {
    endpoint: "/graphql",
    playground: "/graphql",
    subscriptions: false
  },
  () => console.log(`🚀 Server ready at http://localhost:4000`)
);
