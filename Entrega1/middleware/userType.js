const IS_ADMIN = false

const isAdmin = (req, res, next) => {
    if (!IS_ADMIN) res.send({ error: "Usuario no autorizado" })
    next()
}

module.exports = isAdmin