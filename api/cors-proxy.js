// api/cors-proxy.js
const fetch = require("node-fetch");

module.exports = async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        res.status(400).send("Please provide a URL to fetch");
        return;
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            },
        });
        const data = await response.text();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    } catch (error) {
        res.status(500).send(`Error fetching URL: ${error.message}`);
    }
};