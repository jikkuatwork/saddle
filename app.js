document.addEventListener("alpine:init", () => {
  Alpine.store("app", {
    responseField: document.querySelector("#response-field"),
    inputField: document.querySelector("#input-field"),
    history: [],
    initialize() {
      document.addEventListener("keydown", this.logOnEnterPress.bind(this))
    },
    scrollToBottom() {
      const historyContainer = document.querySelector("#history")
      historyContainer.scrollTop = historyContainer.scrollHeight
    },
    logOnEnterPress(event) {
      if (event.key === "Enter") {
        console.log("enter")
        this.handleSend()
      }
    },
    async handleSend() {
      const input = this.inputField.value
      this.inputField.value = ""
      const message = { sender: "user", text: input }
      this.history.push(message)

      const response = await ollama.respondInChunks(input)
      const reply = { sender: "system", text: response }
      this.history.push(reply)

      // this.scrollToBottom()
    },
  })

  window.$S = Alpine.store("app")
  $S.initialize()
})
