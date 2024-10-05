const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/withdraw', async (req, res) => {
    const { amount, phoneNumber } = req.body;

    if (!amount || !phoneNumber) {
        return res.status(400).send('Amount and phone number are required');
    }

    try {
        const response = await axios.post('https://api.airtelmoney.com/withdrawal', { // Replace with actual endpoint
            amount: amount,
            phoneNumber: phoneNumber
        }, {
            headers: {
                'Authorization': `Bearer URL obj = new URL("https://openapiuat.airtel.africa/standard/v1/cashin/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
  new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
  response.append(inputLine);
}
in.close();
System.out.println(response.toString());`, // Replace with your API key or token
                'Content-Type': 'application/json'
            }
        });

        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
