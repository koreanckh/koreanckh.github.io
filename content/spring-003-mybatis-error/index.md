---
emoji: 💻
title: Mybatis + DTO 매핑이 꼬이고 자꾸 에러 나는 문제(@Builder 사용중 에러..) 
date: '2022-09-20 00:00:00'
author: 막걸리에 감자전
tags: Spring Swagger Openapi
categories: Spring
---


# 1. Mybatis + DTO 매핑시 문제
JPA공부를 하며 사이드 프로젝트를 하려고 하고 있었는데, 급하게 시간을 맞춰야 하는 일정이 생겨서 JPA로 작업하던 것을 놔두고 급하게 Mybatis로 개발을 시작했다. 문제없이 작업을 하고 있었는데 갑자기 Mybatis에서 `resultType='**Dto'`로 하면서 매핑이 제대로 되지 않는 문제가 생겼다.  
```javas
@Data
@Builder
public class PerformanceDto {

	private int idx;
	private String name;
	private String genreCode;
	private String statusCode;
	
	이하 기타 ...
}
```

처음에는 에러가 발생한게 아니라 매핑이 꼬인것처럼 원하는 데이터가 dto 파라미터와 제대로 매핑이 되지 않았었다.

이상하다 싶어서 `select name from table`로 컬럼 하나만 호출 해봤더니 `DataIntegrityViolationException 'name' cannot be decoded as Integer` 또는 `IndexOutOfBoundsException` 라며 에러가 떴다.

그래서 Dto에 타입 설정을 잘못 했나 싶어서 봤더니 String으로 했음에도 Integer로 디코딩에 실패했다는 에러가 자꾸 발생하였다..


# 2. 원인? 해결?
문제는 `@Builder`때문이었다!
@Builder를 선언해주게 되면 Dto의 기본 생성자가 사라지게 된다고 한다.
따라서 명시적으로 기본생성자를 만들어주거나 `@NoArgsConstructor`나 `@AllArgsConstructor` 어노테이션을 붙여주니 정상적으로 이용할 수 있게 되었다.  
급한 마음에 어노테이션을 일단 마구 가져다 썼는데, 공식문서를 한번쯤은 읽어보고 사용해야겠다!
  
그럼 이제 얼른 마저 만들러 가야겠다...



