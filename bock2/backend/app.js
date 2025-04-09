import "dotenv/config";
import  Fastify  from "fastify";
import { connectDB } from "./src/config/connect.js";
import {PORT} from "./src/config/config.js";
import {admin, buildAdminRouter} from "./src/config/setup.js";
import { registerRoutes } from "./src/routes/index.js";
import fastifySocketIO from "fastify-socket.io";


const start = async () => {
    await connectDB(process.env.MONGO_URI)
    const app = Fastify();

    app.register(fastifySocketIO, {
        cors:{
            origin:"*"
        },
        pingInterval:10000,
        pingTimeout:5000,
        transports:['websocket']
    })


    await registerRoutes(app);

    await buildAdminRouter(app);
    
    app.listen( {port: PORT, host:"0.0.0.0"}, (err, addr) => {
        if(err){
            console.log(err);
        }else{
            console.log(`Bock Foods started on http://localhost:${PORT}${admin.options.rootPath}`);

        }
    });

    app.ready().then(()=>{
        app.io.on("connection",(socket)=>{
            console.log("A User Connected")

            socket.on("joinRoom",(orderId)=>{
                socket.join(orderId);
                console.log(`User Joined room ${orderId}`)
            })

            socket.on('disconnect',()=>{
                console.log("User Disconnected")
            })
        })
    })
};

start();



// import "dotenv/config";
// import Fastify from "fastify";
// import fastifyCors from "@fastify/cors";
// import fastifySocketIO from "fastify-socket.io";
// import { connectDB } from "./src/config/connect.js";
// import { PORT } from "./src/config/config.js";
// import { admin, buildAdminRouter } from "./src/config/setup.js";
// import { registerRoutes } from "./src/routes/index.js";

// const start = async () => {
//     await connectDB(process.env.MONGO_URI);
//     const app = Fastify();

//     // ✅ Enable CORS to allow frontend to access backend
//     app.register(fastifyCors, {
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//     });

//     // ✅ Enable WebSockets
//     app.register(fastifySocketIO, {
//         cors: {
//             origin: "*",
//         },
//         pingInterval: 10000,
//         pingTimeout: 5000,
//         transports: ["websocket"],
//     });

//     await registerRoutes(app);
//     await buildAdminRouter(app);

//     // ✅ Ensure the server runs on 0.0.0.0 (important for AWS EC2)
//     const port = PORT || 3000;  // Use default port if PORT is not set
//     const host = "0.0.0.0";

//     app.listen({ port, host }, (err, addr) => {
//         if (err) {
//             console.error("Error starting server:", err);
//         } else {
//             console.log(`✅ Bock Foods backend started on: http://${host}:${port}${admin.options.rootPath}`);
//             console.log(`🌍 API is accessible at: http://13.232.13.43:${port}`);
//         }
//     });

//     // ✅ Handle WebSocket connections
//     app.ready().then(() => {
//         app.io.on("connection", (socket) => {
//             console.log("🟢 A User Connected");

//             socket.on("joinRoom", (orderId) => {
//                 socket.join(orderId);
//                 console.log(`🔗 User Joined Room: ${orderId}`);
//             });

//             socket.on("disconnect", () => {
//                 console.log("🔴 User Disconnected");
//             });
//         });
//     });
// };

// // Start the backend server
// start();
