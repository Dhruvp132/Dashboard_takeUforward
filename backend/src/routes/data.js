import { Hono } from "hono";
import z from "zod";
import { PrismaClient } from '@prisma/client';
export const dataRouter = new Hono();
// Zod schema for validation
const dataInput = z.object({
    description: z.string().min(1).optional(),
    month: z.string().min(1).max(2),
    date: z.string().min(1).max(2),
    year: z.string().min(4),
});
dataRouter.post('/update', async (c) => {
    const prisma = new PrismaClient();
    const body = await c.req.json();
    const validationResult = dataInput.safeParse(body);
    if (!validationResult.success) {
        return c.json({
            status: "failed",
            error: "wrong inputs..",
        });
    }
    const { description, month, date, year } = validationResult.data;
    try {
        // Use upsert to either update or create the row
        const data = await prisma.data.upsert({
            where: { id: 1 },
            update: {
                description: description,
                month: month,
                date: date,
                year: year,
            },
            create: {
                description: description || "",
                month: month || "",
                date: date || "",
                year: year || "",
            },
        });
        return c.json({
            status: "success",
            data,
        });
    }
    catch (e) {
        return c.json({
            status: "failed",
        });
    }
});
dataRouter.get('/desc', async (c) => {
    const prisma = new PrismaClient();
    try {
        const data = await prisma.data.findUnique({
            where: { id: 1 },
            select: {
                description: true,
                month: true,
                date: true,
                year: true,
            },
        });
        if (!data) {
            return c.json({
                status: "failed",
                error: "No data found",
            });
        }
        return c.json({
            status: "success",
            data,
        });
    }
    catch (e) {
        return c.json({
            status: "failed",
            error: "An error occurred",
        });
    }
});
