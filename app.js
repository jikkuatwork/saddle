document.addEventListener("alpine:init", () => {
  Alpine.store("app", {
    responseField: document.querySelector("#response-field"),
    inputField: document.querySelector("#input-field"),
    initialize() {
      document.addEventListener("keydown", this.logOnEnterPress.bind(this))
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
      const response = await ollama.respondInChunks(input)
      this.responseField.innerText = response
    },
  })

  window.$S = Alpine.store("app")
  $S.initialize()
})
