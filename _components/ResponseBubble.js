const ResponseBubble = ({ role, content }) => `
  <div
    class="p4 markdown-body font-inter text-white text-opacity-90 bg-white bg-opacity-10 px-4 py-4 text-sm tw-max-w-sm rounded ${
      role === "user" ? "ml-8" : "mr-8"
    }"
  >${content}</div>
  `
