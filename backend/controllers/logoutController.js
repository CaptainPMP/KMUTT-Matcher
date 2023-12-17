const logout = (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({message: "logout"})
    } catch (error) {
        console.log("logout error is:", error);
    }
}

module.exports = logout