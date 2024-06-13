import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"
import router from "./routes/index.mjs"
import "dotenv/config"
import "./strategies/local-strategies.mjs"

// Express App
const app = express();

// Middelwares
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
    }
))

// Config Passport.js
app.use(passport.initialize())
app.use(passport.session())

// Router
app.use(router)


// Listen App 
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`Error starting server: ${err}`)
    } else {
        console.log(`- ✅ Server is listening on port ${process.env.PORT}`);
    }
})