import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../constants/users.mjs"

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    try {
        const findUser = users.find(user => user.id === id);
        if(!findUser) throw new Error("User Not Found");
        done(null,findUser)
    } catch (err) {
        done(err, null)
    }
})

export default passport.use(
    new Strategy((username, password, done) => {
        try {
            const findUser = users.find(user => user.username === username);
            if (!findUser) throw new Error("User Not Found");

            if (findUser.password !== password)
                throw new Error("username or password is invalid");

            done(null, findUser)
        } catch (error) {
            done(error, null)
        }
    })
)