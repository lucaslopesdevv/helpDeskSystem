import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createTicket(app: FastifyInstance) {
  app.post("/createTicket", async (req, res) => {
    const bodySchema = z.object({
      title: z.string().min(1).max(50),
      description: z.string().min(5).max(100),
      user_id: z.string(),
    });

    if (!req.body) {
      res.status(400).send({
        error: "Por gentileza informar os dados do ticket",
      });
      return;
    }

    try {
      const { title, description, user_id } = bodySchema.parse(req.body);

      const ticket = await prisma.ticket.create({
        data: {
          title,
          description,
          user_id,
        },
      });

      res.send("Ticket criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar ticket:", error);
      res.status(500).send({
        error: "Erro ao criar ticket",
      });
    }
  });
}
