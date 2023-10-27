window.saddle = {
  model: "zephyr:latest",
  context: null,
  stream: "",
  async run(prompt) {
    this.stream = ""
    await this.postRequest(prompt).then(r =>
      this.handleStream(r, f => this.processFragment(f))
    )

    return this.stream
  },
  processFragment(fragment) {
    if (fragment.done) {
      this.context = fragment.context
    } else {
      this.stream += fragment.response
      this.stream = DOMPurify.sanitize(marked.parse(this.stream))
      return this.stream
    }
  },
  postRequest(prompt, signal = null) {
    const data = { model: this.model, context: this.context, prompt: prompt }
    const ollama_host = "localhost"
    const URL = `http://${ollama_host}:11434/api/generate`

    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: signal,
    })
  },
  async handleStream(response, callback) {
    const reader = response.body.getReader()
    let partialLine = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      const textChunk = new TextDecoder().decode(value)
      const lines = (partialLine + textChunk).split("\n")
      partialLine = lines.pop()

      for (const line of lines) {
        if (line.trim() === "") continue
        const parsedResponse = JSON.parse(line)
        callback(parsedResponse)
      }
    }

    if (partialLine.trim() !== "") {
      const parsedResponse = JSON.parse(partialLine)
      callback(parsedResponse)
    }
  },
}
