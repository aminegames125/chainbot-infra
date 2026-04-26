FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Non-root user for security
RUN addgroup -S chainbot && adduser -S chainbot -G chainbot
RUN chown -R chainbot:chainbot /app
USER chainbot

# Health check — verifies the process is still running
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "process.exit(0)"

CMD ["node", "index.js"]
