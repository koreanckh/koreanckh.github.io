---
emoji: 💻
title: Mybatis + inner clas DTO 매핑 하는 법  
date: '2022-11-15 00:00:00'
author: 막걸리에 감자전
tags: Spring Mybatis
categories: Spring
---


# 1. 문제..
Dto 대신에 매번 Map으로 사용하다보니 귀찮고 불편한 일들이 많았다..  
이번 사이드 프로젝트는 Dto로 진행을 하다보니 Mybatis에서 result mapping 시에 inner class 매핑할때 문제가 생겼다..  
~~(JPA를 제대로 사용할 줄 알면 간단하게 해결 될 일인데.. 반드시..)~~

# 2. Mybatis에서 inner class DTO에 매핑하기.
### JAVA DTO 소스
```java
public class AdminDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Performance {
        int performanceIdx;
        String kopisId;
        String name;
        String genreCode;
        String hallCode;
        String openRun;
        String poster;
        String statusCode;
        LocalDate startDate;
        LocalDate endDate;
        PerformanceMeta performanceMeta;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PerformanceMeta {
        String price;
        String casting;
        String crew;
        String enterprise;
        String story;
        String introImages;
        String schedules;
    }
}
```


### mybatis 소스
```xml
<mapper namespace="io.example.sample.dao.mybatis.AdminDao">
    <resultMap id="performanceMeta" type="io.example.sample.dto.AdminDto$Performance">
        <id property="performanceIdx" column="performance_idx"/>
        <id property="kopisId" column="kopis_id"/>
        <id property="name" column="name"/>
        <id property="genreCode" column="genre_code"/>
        <id property="hallCode" column="hall_code"/>
        <id property="openRun" column="open_run"/>
        <id property="poster" column="poster"/>
        <id property="statusCode" column="status_code"/>
        <id property="startDate" column="start_date"/>
        <id property="endDate" column="end_date"/>
        <association property="performanceMeta" javaType="io.example.sample.dto.AdminDto$PerformanceMeta">
            <result property="price" column="price"/>
            <result property="casting" column="casting"/>
            <result property="crew" column="crew"/>
            <result property="enterprise" column="enterprise"/>
            <result property="story" column="story"/>
            <result property="introImages" column="intro_images"/>
            <result property="schedules" column="schedules"/>
        </association>
    </resultMap>

    <select id="findPerformanceList" parameterType="io.example.sample.dto.AdminDto$Performance"
            resultMap="performanceMeta">
        <!--    대충 dto에 매핑되는 query    -->
    </select>
</mapper>
```

기존에는 쿼리결과값에 대한 결과값을 `resultType`을 이용해서만 받았다면, inner class 를 사용한다면 `resultMap`를 구성해 놓고 사용하면 된다. (inner class를 선택할때는 DTO 경로 뒤에 `$`사용)

```xml
<id property="performanceIdx" column="performance_idx"/>
```
`property`에는 Dto에 선언해둔 파라미터의 이름을 적고, `column`에는 query를 통해서 뽑은 컬럼 이름(alias 적용 이후)을 적어주면 된다.

```xml
<resultMap id="performanceMeta" type="io.example.sample.dto.AdminDto$Performance">
    ...
    <association property="performanceMeta" javaType="io.example.sample.dto.AdminDto$PerformanceMeta">
    ...
    </association>
</resultMap>
```
association의 `property`과 `javaType`에도 `type="io.example.sample.dto.AdminDto$Performance"`에서 선언해주었던 이름대로 해야 제대로 매핑이 되는것 같다.


마지막으로 JPA를 꼭 배워서 이런 번거로움을 해결하자.... ㅜ