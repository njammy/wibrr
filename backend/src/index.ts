import express from "express";
import cors from "cors";
import helmet from "helmet";
import { productController } from "./controller/product.controller";


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', productController)


app.listen(3000, () => {
  console.log(`Listening on port ${3000}`);
});
