"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRouter = void 0;
const hono_1 = require("hono");
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
exports.dataRouter = new hono_1.Hono();
// Zod schema for validation
const dataInput = zod_1.default.object({
    description: zod_1.default.string().min(1).optional(),
    month: zod_1.default.string().min(1).max(2),
    date: zod_1.default.string().min(1).max(2),
    year: zod_1.default.string().min(4),
});
exports.dataRouter.post('/update', async (c) => {
    const prisma = new client_1.PrismaClient();
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
exports.dataRouter.get('/desc', async (c) => {
    const prisma = new client_1.PrismaClient();
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
