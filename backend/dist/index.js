"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const data_1 = require("./routes/data");
const app = new hono_1.Hono();
app.use('/*', (0, cors_1.cors)());
app.route("/api/v1/", data_1.dataRouter);
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
const port = 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
