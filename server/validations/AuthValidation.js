export const registerValidation = (req, res, next) => {
    const { username, password, repeatPass } = req.body;

    if (!username || !password) {
        return res.json({
            message: "Введіть коректні дані!",
        });
    };

    if (repeatPass != password) {
        return res.json({
            message: "Паролі не співпадають!",
        });
    };

    next(); 
};

export const updateValidation = (req, res, next) => {
    const { username, password, repeatPass } = req.body;

    if (repeatPass != password) {
        return res.json({
            message: "Паролі не співпадають",
        });
    };

    next();
};