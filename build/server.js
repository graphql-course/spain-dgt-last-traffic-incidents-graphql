"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
class Server {
    constructor(schema) {
        this.DEFAULT_PORT_SERVER = process.env.PORT || 3003;
        if (schema === undefined) {
            throw new Error("Need GraphQL Schema to work in API GraphQL");
        }
        this.schema = schema;
        this.initialize();
    }
    initialize() {
        this.configExpress();
        this.configApolloServer();
        this.configRoutes();
        this.createServer();
    }
    configExpress() {
        this.app = express_1.default();
        this.app.use(cors_1.default());
        this.app.use(compression_1.default());
    }
    configApolloServer() {
        const server = new apollo_server_express_1.ApolloServer({
            schema: this.schema,
            introspection: true,
            playground: true,
            validationRules: [graphql_depth_limit_1.default(4)]
        });
        server.applyMiddleware({ app: this.app });
    }
    configRoutes() {
        this.app.use("/hello", (_, res) => {
            res.send("Bienvenidos/as al curso de GraphQL desde 0");
        });
        this.app.use("/", graphql_playground_middleware_express_1.default({
            endpoint: "/graphql",
        }));
    }
    createServer() {
        this.httpServer = http_1.createServer(this.app);
    }
    listen(callback) {
        this.httpServer.listen(this.DEFAULT_PORT_SERVER, () => {
            callback(+this.DEFAULT_PORT_SERVER);
        });
    }
}
exports.default = Server;
