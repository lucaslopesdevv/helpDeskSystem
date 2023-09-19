import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { getAllUsersRoute } from "./routes/users/get-all-users";
import { getAllTicketsRoute } from "./routes/tickets/get-all-tickets";
import { createUser } from "./routes/users/create-user";
import { createTicket } from "./routes/tickets/create-ticket";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(getAllUsersRoute);
app.register(getAllTicketsRoute);
app.register(createUser);
app.register(createTicket);

const portApi = 3333;

app
  .listen({
    port: portApi,
  })
  .then(() => {
    console.log(`HTTP Server Running on Port ${portApi}`);
  });
