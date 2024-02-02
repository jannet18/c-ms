import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/Client.js";
import generalRoutes from "./routes/General.js";
import salesRoutes from "./routes/Sales.js";
import managementRoutes from "./routes/Management.js";
// data imports
import User from "./models/User.js";
import Product from "./models/product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProductStat, dataProduct } from "./data/index.js";
import mongoose from "mongoose";
import path from "path";

//CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(cors());

// ROUTES

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);

// MONGO SETUP
const PORT = process.env.PORT || 9000;
const __dirname = path.resolve();
app.use(express.static(__dirname));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // add data once
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
  })
  .catch((error) => console.log(`${error}, did not connect!`));
