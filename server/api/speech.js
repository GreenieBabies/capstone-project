const speech = require("@google-cloud/speech")
const router = require("express").Router()
const Buffer = require("buffer/").Buffer

router.post("/", async (req, res, next) => {
  try {
    const client = new speech.SpeechClient()
    const buffer = Buffer.from(req.body.audio, "base64")
    // console.log(buffer) // <Buffer 52 49 46 46 2c ... 00 26 00 12 00 ....>

    const audioBytes = buffer.toString("base64")

    const audio = {
      content: audioBytes,
    }

    const config = {
      encoding: "LINEAR16",
      // sampleRateHertz: 44100, // optional? might need to be removed
      languageCode: "en-US",
      audioChannelCount: 2, // accepting stereo input; change to 1 for mono
      enableWordConfidence: true,
    }

    const request = {
      audio,
      config,
    }

    const [response] = await client.recognize(request)
    // console.log(response) // see results, billing info from Google

    const bestTranscript = response.results
      .map((x) => {
        return x.alternatives[0].transcript
      })
      .join("\n")

    res.send(bestTranscript)
  } catch (error) {
    next(error)
  }
})

module.exports = router
