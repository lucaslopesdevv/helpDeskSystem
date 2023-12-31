import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function createUser(app: FastifyInstance) {
  app.post("/createUser", async (req, res) => {
    const bodySchema = z.object({
      username: z.string().min(1).max(20),
      fullname: z.string().min(5).max(50),
      email: z.string(),
      password: z.string(),
    });

    if (!req.body) {
      res.status(400).send({
        error: "Por gentileza informar os dados do novo usuário",
      });
      return;
    }

    try {
      const { username, fullname, email, password } = bodySchema.parse(
        req.body
      );

      const user = await prisma.user.create({
        data: {
          username,
          fullname,
          email,
          password,
        },
      });

      res.send("Usuário inserido com sucesso");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).send({
        error: "Erro ao criar usuário",
      });
    }
  });
}
