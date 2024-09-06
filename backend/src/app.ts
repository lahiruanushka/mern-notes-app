import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./util/validateEnv";
import { requiresAuth } from "./middleware/auth";
import errorHandler from "./middleware/errorHandler";

const app = express();

// Body parser
app.use(express.json());


// Logger middleware
app.use(morgan("dev"));

// CORS configuration
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Session middleware
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

// Route handlers
app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);

// 404 handler
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Error handling middleware
app.use(errorHandler);

export default app;
