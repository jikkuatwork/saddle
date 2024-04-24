const ResponseBubble = ({ role, content }) => `
  <div
    class="markdown-body font-inter text-opacity-10 bg-dark-200 bg-opacity-10 px-3 py-3 text-sm tw-max-w-sm rounded ${
      role === "user" ? "ml-8" : "mr-8"
    }"
  >${content}</div>
  `
