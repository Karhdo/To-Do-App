import express from "express";
import route from "./routes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());

// Route init
route(app);

app.listen(PORT, () => {
    console.log(`Sever running on port ${PORT}...`);
});
