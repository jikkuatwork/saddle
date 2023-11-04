document.addEventListener("alpine:init", () => {
  Alpine.store("app", {
    selectedModel: "zephyr:latest",
    models: [
      { label: "Yarn Mistral", id: "yarn-mistral:latest" },
      { label: "Zephyr", id: "zephyr:latest" },
    ],
    saddle: new Saddle({ service: "ollama", model: "zephyr:latest" }),
    isSettingsVisible: false,
    historyContainer: document.querySelector("#history"),
    responseField: document.querySelector("#response-field"),
    inputField: document.querySelector("#input-field"),
    history: [],
    initialize() {
      this.inputField.addEventListener("keydown", event => {
        if (event.keyCode === 13 && this.inputField.value.trim() !== "") {
          this.handleSend()
        }
      })
    },
    scrollToBottom() {
      this.historyContainer.scrollTop = this.historyContainer.scrollHeight
    },
    changeModel() {
      console.log(this.selectedModel)
      this.saddle = new Saddle({ service: "ollama", model: this.selectedModel })
    },
    async handleSend() {
      const input = this.inputField.value
      this.inputField.value = ""

      const message = { role: "user", content: input }
      this.history.push(message)

      const reply = { role: "system", content: "" }
      this.history.push(reply)

      this.saddle.streamer(input, response => {
        this.history[this.history.length - 1].content = response
        this.scrollToBottom()
      })
    },
  })

  window.app = Alpine.store("app")
  app.initialize()
})
