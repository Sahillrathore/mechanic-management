import jwt from "jsonwebtoken";

export const auth = (roles = []) => (req, res, next) => {

    const header = req.headers.authorization;

    if (!header) return res.status(401).json({ msg: "No token" });

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({ msg: "Forbidden" });
        }

        req.user = decoded;
        next();

    } catch {
        res.status(401).json({ msg: "Invalid token" });
    }
};
