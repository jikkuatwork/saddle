const ResponseBubble = ({ sender, text }) => `
  <div
    class="p4 text-white text-opacity-90 bg-white bg-opacity-10 tw-text-md px-4 py-4 text-sm mb-4 ${
      sender === "system" ? "md:mr-48 mr-8" : "md:ml-48 ml-8"
    }"
  >${text}</div>
  `
