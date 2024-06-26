// helper for session
const withAuth = (req, res, next) => {
    if(!req.session.logged_in) {
        res.redirect('/login');
    } next();
}

module.exports = withAuth;