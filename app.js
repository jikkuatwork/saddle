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
      const response = await this.replyAsText(input)
      this.responseField.innerText = response
    },
    async replyAsText(prompt, model = "zephyr") {
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
  })

  window.$S = Alpine.store("app")
})

// $S.init()
