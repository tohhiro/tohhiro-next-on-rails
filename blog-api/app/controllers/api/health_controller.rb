module Api
  class HealthController < ApplicationController
    def index
      render json: { status: "ok", message: "Blog API is running" }
    end
  end
end
