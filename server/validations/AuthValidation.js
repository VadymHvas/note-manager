export const registerValidation = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (username.length < 1 || password.length < 1) {
            return res.json({
                message: "Введіть коректні данні!",
            });
        } else if (password.length < 8) {
            return res.json({
                message: "Пароль закороткий!",
            });
        } else if (username.length < 3) {
            return res.json({
                message: "Ім'я закоротке!",
            });
        }; 
    
        next(); 
    } catch (error) {
        return res.json({
            message: "Помилка реєстрації",
        }); 
    }
};