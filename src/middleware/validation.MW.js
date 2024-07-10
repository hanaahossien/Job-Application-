
const keys = ["body", "params", "query", "headers"]
export const validationMw = (schema) => {
    return (req, res, next) => {
        const err = []

        keys.forEach(key => {
            if (schema[key]) {
                const validateResult = schema[key].validate(req[key], { abortEarly: false });
                if (validateResult?.error) {
                    err.push(validateResult.error)
                }
                if (err.length) {
                    return res.json({ msg: "validation error", error: err})

                }
            }

        });
        next()
    }

}