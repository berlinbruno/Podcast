FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/podcast-backend-0.0.1-SNAPSHOT.jar podcast-backend.jar
COPY src/main/resources/key.json /src/main/resources/key.json
EXPOSE 8080
ENTRYPOINT ["java","-jar","podcast-backend.jar"]