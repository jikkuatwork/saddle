window.saddle = {
  model: "zephyr:latest",
  port: "11434",
  api() {
    return `http://localhost:${this.port}/api/generate`
  },
  context: null,
  stream: "",
  async streamer(prompt, cummilatorCallback, contextCallback = () => null) {
    this.stream = ""
    await this.send(prompt).then(r =>
      this.handleStream(r, fragment => {
        if (fragment.done) {
          this.context = fragment.context
          contextCallback(this.context)
        } else {
          this.stream += fragment.response
          const formattedText = DOMPurify.sanitize(marked.parse(this.stream))
          cummilatorCallback(formattedText)
        }
      })
    )
  },
  async run(prompt) {
    this.stream = ""
    await this.send(prompt).then(r =>
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
  send(prompt, signal = null) {
    const data = { model: this.model, context: this.context, prompt: prompt }

    return fetch(this.api(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: signal,
    })
  },
  async handleStream(stream, callback) {
    const reader = stream.body.getReader()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const text = new TextDecoder().decode(value)

      text.split("\n").forEach(t => {
        if (t.trim() !== "") {
          const parsed = JSON.parse(t)
          callback(parsed)
        }
      })
    }
  },
}
