import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllTicketsRoute(app: FastifyInstance) {
  app.get("/tickets", async () => {
    const tickets = await prisma.ticket.findMany();
    return tickets;
  });
}
