ollama = {
  async respondInChunks(prompt, model = "zephyr") {
    const url = "http://localhost:11434/api/generate"
    const payload = {
      model: model,
      prompt: prompt,
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.text()
      const responses = data
        .split("\n")
        .map(r => {
          try {
            return JSON.parse(r).response
          } catch (e) {
            return null
          }
        })
        .filter(r => r !== null)
        .join("")

      return responses
    } catch (error) {
      console.error("Error:", error)
      return ""
    }
  },
}
