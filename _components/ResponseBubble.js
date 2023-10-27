const ResponseBubble = ({ sender, text }) => `
  <div
    class="p4 markdown-body font-inter text-white text-opacity-90 bg-white bg-opacity-10 px-4 py-4 text-sm tw-max-w-sm rounded ${
      sender === "user" ? "ml-8" : "mr-8"
    }"
  >${text}</div>
  `
