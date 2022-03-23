import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authorizationToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({ error: "Null token" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
        if (error) return res.status(401).json({ error: error.message });
        req.body.user = user;

        next();
    });
}

export { authorizationToken };
