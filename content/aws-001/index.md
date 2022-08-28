---
emoji: 🔮
title: AWS EC2에 Spring boot 배포하기!(작성중..)
date: '2022-08-28 00:00:00'
author: 막걸리에 감자전
tags: AWS EC2
categories: AWS
---
> amazon-linux 로 생성한 EC2에서 진행하였습니다.

## 1. EC2에서 git, java 설치

- git 설치

```bash
# git 설치
sudo yum install git -y

# git 설치 확인
git version
```

- java 설치(각자 버전에 맞게)

```bash
# OpenJDK 11 설치
sudo amazon-linux-extras install java-openjdk11

# OpenJDK 11 설치 확인
java -version
```

## 2. git에서 소스 내려받기
```
git clone {repository URL}
```

## 3. 패키지 빌드

> 프로젝트 루트 디렉토리에서 실행

### (1) maven
```bash
# 메이븐 빌드
mvn package
```

maven 빌드 후에 `/target`경로에 `.jar` 확장자명으로 파일이 생성된다. 정상적으로 빌드 되었는지 실행해보자.
```bash
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### (2) gradle
```bash
# 1. "./gradlew" 파일에 대한 권한 부여
sudo chmod 777 ./gradlew

# 2. gradlew을 이용하여 빌드
./gradlew clean build
```

gradle 빌드 후에는 `/build/libs`이하에 `.jar` 파일이 생성된다. 마찬가지로 오류 없이 빌드 되는지 실행해본다.
```bash
java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
```

## 4. deploy.sh 작성

### (1) deploy.sh 샘플
```shell
#!/usr/bin/env bash

REPOSITORY=/home/{user-name}}/{project-name}

echo "> 현재 구동 중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -fl action | grep java | awk '{print $1}')

echo "현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
  echo "현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
  echo "> kill -15 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

echo "> 새 애플리케이션 배포"

# maven 이나 gradle에 따라 빌드된 jar파일이 생성되는 위치가 다르기 때문에 잘 확인해서 작성해준다.
# 아래 경로는 gradle 기준
JAR_NAME=$(ls -tr $REPOSITORY/build/libs/*.jar | tail -n 1)      # gradle ver
#JAR_NAME=$(ls -tr $REPOSITORY/target/*.jar | tail -n 1)     # maven ver

echo "> JAR NAME: $JAR_NAME"

echo "> $JAR_NAME 에 실행권한 추가"

chmod +x $JAR_NAME

echo "> $JAR_NAME 실행"

nohup java -jar $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &
```

### (2) gradle 빌드 후 서버 구동시 주의사항
gradle 빌드시에 따로 설정을 해주지 않으면 `*.jar`파일과 `*-plain.jar`파일 두개가 생긴다. `*-plain.jar`파일은 의존성이 포함되지 않은 파일이기 때문에 파일 용량도 작고 정상적으로 서버가 구동되지 않는다. 따라서 서버 실행 스크립트를 수정해주거나 gradle 빌드시에 `*-plain.jar`파일이 생성되지 않도록 `build.gradle`파일을 수정 해주어야 한다.
```gradle
jar {
    enabled = false
}
```