FROM openjdk:8-jdk-alpine as build
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
RUN chmod +x ./gradlew
RUN ./gradlew dependencies

COPY src src
RUN ./gradlew build unpack -x test
RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*.jar)

FROM openjdk:8-jre-alpine
VOLUME /tmp
ARG DEPENDENCY=/app/build/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.oleola.server.ServerApplication"]