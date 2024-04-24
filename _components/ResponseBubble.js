const ResponseBubble = ({ role, content }) => `
  <div
    class="markdown-body rounded-lg font-inter px-3 py-3 text-sm tw-max-w-sm rounded ${
      role === "user"
        ? "ml-8 text-black bg-white border border-gray-100"
        : "mr-8 bg-dark-100 text-white"
    }"
  >${content}</div>
  `
