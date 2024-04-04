import fastify from "fastify";
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-bagde";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendee";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";


export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: "*", //informar front end em produção
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type"],
});

app.register(fastifySwagger, {
    swagger: {
        consumes: ["application/json"], // request content type
        produces: ["application/json"], // response content type
        info: {
            title: "Pass.in",
            description: "Especificações da documentação de APIS criada com NODE.JS no NLW Unite",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge)
app.register(checkIn);
app.register(getEventAttendees);



app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
    () => console.log("Server is running")
});

