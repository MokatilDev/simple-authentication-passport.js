import { Router } from "express";
import passport from "passport"


const router = Router();

router.route("/")
    .post(passport.authenticate("local"), (req, res) => {
        return res.sendStatus(200)
    });

router.route("/status")
    .get((req, res) => {
        if (!req.user) return res.sendStatus(401);
        return res.send(req.user)
    });

router.route("/logout")
    .post((req, res) => {
        if (!req.user) return res.sendStatus(401);
        req.logout((err) => {
            if (err) return res.sendStatus(400);
            res.sendStatus(200)
        })
    });

export default router