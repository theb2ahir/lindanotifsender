const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3000;

// Service account JSON
const serviceAccount = require("./linda-shop-2835e-534738c73dfe.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

// Endpoint pour envoyer notification
app.post("/sendNotif", async (req, res) => {
    const { token, title, body } = req.body;

    try {
        await admin.messaging().send({
            token: token,
            notification: { title, body },
        });
        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});

app.listen(port, () => console.log(`Notification server running on port ${port}`));
