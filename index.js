const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username, password } = req.body;

    // console.log(req.password)

    try {
        const response = await axios.put(
            'https://api.chatengine.io/users/',
            {
                "username": username,
                "secret": password,
                "first_name": username,
            },
            { headers: { "private-key": "5e78924d-a2a6-45e2-b36c-eeb0b51b4670" } }
        )
        return res.status(response.status).json(response.data)
    } catch (e) {
        return res.status(e.response.status).json(e.response.data)
    }

});

app.listen(process.env.PORT);
