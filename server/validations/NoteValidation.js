export const createNoteValidation = (req, res, next) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.json({
            message: "Введіть коректні дані",
        });
    };

    if (title.length > 50) {
        return res.json({
            message: "Заголовок не може бути більш ніж 50 символів",
        });
    };

    if (body.length > 500) {
        return res.json({
            message: "Опис не може бути більш ніж 500 символів",
        });
    };

    next();
};