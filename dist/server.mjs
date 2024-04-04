import {
  registerForEvent
} from "./chunk-JO73VX5Z.mjs";
import {
  checkIn
} from "./chunk-LZ2PAGYL.mjs";
import {
  createEvent
} from "./chunk-LIE7EPLC.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-V3UG3GQ3.mjs";
import {
  getEventAttendees
} from "./chunk-TOLYBDA7.mjs";
import {
  getEvent
} from "./chunk-5NKTL4VV.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
  //informar front end em produção
  // methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type"],
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    // request content type
    produces: ["application/json"],
    // response content type
    info: {
      title: "Pass.in",
      description: "Especifica\xE7\xF5es da documenta\xE7\xE3o de APIS criada com NODE.JS no NLW Unite",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.listen({ port: 3e3, host: "0.0.0.0" }).then(() => {
  () => console.log("Server is running");
});
export {
  app
};
