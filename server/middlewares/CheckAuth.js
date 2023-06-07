import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\?s/, "");   

    if (token) {
        const decoded = jwt.verify(token, "nuggets");
            
        req.userId = decoded.id;
        next();
    } else {
        return res.json({
            message: "У вас нема доступу",
        });
    };
};

