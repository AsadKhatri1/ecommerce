import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
// mongodb connection
mongoose
  .connect(
    "mongodb+srv://hafizasad398:Sv31DKBZNgTitRIL@ecommerce.ucbfkvd.mongodb.net/MERN_ECOMMERCE?retryWrites=true&w=majority&appName=ecommerce"
  )
  .then(() => {
    console.log("DB connected succesfully");
  })
  .catch(() => {
    console.log("DB not connected...");
  });

cors;

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// // Define allowed origins
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://ecommerce-client-bay.vercel.app/",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // Handle preflight requests
// app.options("*", cors());
//   home testing route

app.get("/", (req, res) => res.json({ message: "Home" }));

//   user routes
app.use("/api/user", userRouter);
//   product routes
app.use("/api/product", productRouter);
//   cart routes
app.use("/api/cart", cartRouter);
//   address routes
app.use("/api/address", addressRouter);

const port = 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
