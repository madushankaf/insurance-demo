# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM ballerina/ballerina:2201.10.0 AS builder

WORKDIR /app

# Copy all source files
COPY Ballerina.toml Dependencies.toml ./
COPY *.bal ./

# Build the fat JAR
RUN bal build

# ── Stage 2: Run ──────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the compiled JAR from the builder stage
COPY --from=builder /app/target/bin/quote_api.jar quote_api.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "quote_api.jar"]
