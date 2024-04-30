document.addEventListener("alpine:init", () => {
  Alpine.store("app", {
    selectedModel: null,
    models: [],
    saddle: new Saddle({ service: "ollama", model: null }),
    isSettingsVisible: false,
    historyContainer: document.querySelector("#history"),
    responseField: document.querySelector("#response-field"),
    inputField: document.querySelector("#input-field"),
    history: [],
    async initialize() {
      this.models = await this.saddle.list()
      this.selectedModel = this.models[0]
      this.saddle = new Saddle({ service: "ollama", model: this.selectedModel })

      this.inputField.addEventListener("keydown", event => {
        if (event.keyCode === 13 && this.inputField.value.trim() !== "") {
          if (event.shiftKey) {
          } else {
            this.handleSend()
          }
        }
      })
    },
    scrollToBottom() {
      this.historyContainer.scrollTop = this.historyContainer.scrollHeight
    },
    changeModel() {
      console.log(this.selectedModel)
      this.saddle = new Saddle({
        service: "ollama",
        model: this.selectedModel,
      })
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
