require("dotenv").config();
const express = require("express");
//object destructuring syntax
const { Configuration, OpenAIApi } = require("openai");


const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//ew instance of the OpenAI API class
const openai = new OpenAIApi(configuration);


const port = process.env.PORT || 4000;

// POST request endpoint
app.post("/ask", async (req, res) => {
  // getting prompt question from request
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");

    }

    // return the result
     const response = await openai.createCompletion({
       model: "text-davinci-003",
       prompt,

     });
    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
