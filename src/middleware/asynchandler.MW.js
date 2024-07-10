export const asynchandler = (api) => {
    return (req, res, next) => {
        api(req,res, next).catch((error) => {
            res.json({ msg: "catch error", "err": error.message })

        })

    }
}