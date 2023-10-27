document.addEventListener("alpine:init", () => {
  Alpine.store("app", {
    responseField: document.querySelector("#response-field"),
    inputField: document.querySelector("#input-field"),
    history: [],
    initialize() {
      //
    },
    scrollToBottom() {
      const historyContainer = document.querySelector("#history")
      historyContainer.scrollTop = historyContainer.scrollHeight
    },
    async handleSend() {
      const input = this.inputField.value
      this.inputField.value = ""

      const message = { sender: "user", text: input }
      this.history.push(message)

      const response = await ollama.respondInChunks(input)
      const reply = { sender: "system", text: response }

      this.history.push(reply)
    },
  })
})
