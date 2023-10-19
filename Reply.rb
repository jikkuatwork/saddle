require "net/http"
require "json"

class Reply
  def initialize(model)
    @model = model
  end

  def respond(prompt)
    uri = URI("http://localhost:11434/api/generate")
    header = { 'Content-Type': "application/json" }

    payload = {
      model: @model,
      prompt: prompt,
    }

    request = Net::HTTP::Post.new(uri, header)
    request.body = payload.to_json

    response = Net::HTTP.start(uri.hostname, uri.port) do |http|
      http.request(request)
    end

    response.body
  end

  def respond_as_text(prompt)
    respond(prompt)
      .split("\n")
      .map { |r| JSON.parse(r)["response"] }
      .join("")
  end
end
