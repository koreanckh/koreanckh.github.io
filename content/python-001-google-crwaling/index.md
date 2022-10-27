---
emoji: 🧢
title: python으로 구글 이미지 크롤링 하는법
date: '2022-10-27 22:00:00'
author: 줌코딩
tags: python 크롤링 crawling
categories: Python
---

## 1. 크롤링을 하게 된 이유
사이드 프로젝트 중에 덤프 이미지 파일이 필요해서 구하려고 하다보니 자연스럽게 크롤링으로 이미지를 가져와야 겠다는 생각이 들었다.  
파이썬을 해본적이 없어서 여기저기 올라와 있는 글을 보며 뜨문뜨문 하다보니 여기저기 문제가 생기기도 했는데..  
유튜브를 보니 굉장히 쉬운 방법이 있길래 정리해본다.


## 2. 실패한 코드
```python
# selenium 관련 라이브러리를 불러오는 코드
from turtle import clear
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# 프로그램을 잠깐 멈추게 하기위한 라이브러리
import time

# url로 이미지를 다운받기 위한 라이브러리
import urllib.request

## SSL: CERTIFICATE_VERIFY_FAILED 에러 조치
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

### 디렉토리가 없을경우 새로 생성.
import os
def createFolder(directory) :
    try :
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print('Error : create directory :: ' + directory)

# driver로 해당 페이지로 이동 : 구글 이미지로 이동
driver.get("https://www.google.co.kr/imghp?hl=ko&ogbl")

itemList = []

## 
file = open("./itemList.txt", "r")
while True:
    line = file.readline()
    if not line:
        break
    itemList.append(line.strip());
file.close()

try:
    for item in itemList :
        # 검색창 element 찾기 / 구글 이미지 input name = q
        elem = driver.find_element(By.NAME, "q")

        elem.clear();

        # 원하는 값 입력
        elem.send_keys(item)

        # 입력한 값 전송
        elem.send_keys(Keys.RETURN)

        # 검색후 로드 될 때까지 대기
        time.sleep(3)

        i = 0
        while(i <= 4) :

            # 내가 필요한 요소 선택 : 검색한 미리보기 이미지
            images = driver.find_elements(By.CSS_SELECTOR, "#islrg > div > div > a > div > img")[i].click();

            # 미리보기 클릭하여 로드 될때까지 대기.
            time.sleep(3)
            print(driver.find_element(By.XPATH, '/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div/div/div[3]/div[2]/c-wiz/div[1]/div[1]/div/div[2]/a/img'))
            imageUrl = driver.find_element(By.XPATH, '/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div/div/div[3]/div[2]/c-wiz/div[1]/div[1]/div/div[2]/a/img').get_attribute("src") # 크게 뜬 이미지 선택하여 "src" 속성을 받아옴

            if i == 0 :
                createFolder("./img/" + item)

            urllib.request.urlretrieve(imageUrl, "./img/" + item + "/" + str(i) +".jpg")
            
            i = i + 1
            
except Exception as ex:
    print('에러발생')
    print(ex)

driver.close()
```

### (1) 계획
`selenium + chromedriver` 조합으로 하여 실제로 페이지를 작동하고 그것을 기반으로 크롤링을 하려고 했다.(크롤링 방법에 대해 몰라서 어디선가 들어본 selenium으로 시작...)  

### (2) 문제
일단 페이지 작동 및 다운로드에는 성공했는데..  
문제는 원본 이미지 다운로드를 원했는데 작은 사이즈의 썸네일 이미지가 받아지는 것이 문제였다...;  
`By.Xpath`나 `By.CSS_SELECTOR`등의 방법으로 해봤는데도 공톰점을 찾는 방식이 잘못 되었는지 원하는 사진이 다운로드 되다 말다를 반복해서 이건 아니다 싶어서 다른 방법을 찾아보았다..

초반에는 selenium 문법이 버전에 따라 바뀐다는 것을 모르고, 인터넷에 많이 떠도는 예제를 따라하다가 예전 문법인 `find_elements_by_css_selector()`을 그대로 사용해서 한참 시간을 버리기도...

## 3. 쉽게 구글 이미지 크롤링 하는법 (구글 이미지 한정)
### (1) 참고 유튜브
> https://www.youtube.com/watch?v=j5ZpgDBLQ5Q&t=508s

이걸 보니 `google-images-download` 라는 라이브러리가 있다는걸 알았고, 그래서 구글 이미지 한정으로 쉽게 크롤링 할수 있는것 같았다.

### (2) google_images_download 라이브러리 다운로드
> https://pypi.org/project/google_images_download/

여기가 공식 홈페이지인데, 다운로드 방법이나 사용 방법등이 영어로 친절하게 설명이 되어 있다.
하지만 위 공식 홈페이지에서 최신 버전으로 사용하다보면 에러가 발생할 수도 있다고 하여, 유튜브에 소개된 대로 다른 분이 올려주신 것을 다운받아 사용하였다.

### (3) 크롤링 소스

```bash
pip install git+https://github.com/Joeclinton1/google-images-download.git
```
우선은 이렇게 라이브러리를 설치해주자.


```python
## SSL: CERTIFICATE_VERIFY_FAILED 에러 조치
import ssl
ssl._create_default_https_context = ssl._create_unverified_context


from urllib import response
from google_images_download import google_images_download

def googleImageCrwaling(keyword, limit):
    response = google_images_download.googleimagesdownload()
    
    arguments = {"keywords":keyword,"limit":limit,"print_urls":True, "chromedriver" : "./chromedriver", "format" : "jpg"}
    paths = response.download(arguments)
    print(paths)


itemList = []
file = open("./itemList.txt", "r")
while True:
    line = file.readline()
    if not line:
        break
    itemList.append(line.strip());

file.close()

for item in itemList:
    googleImageCrwaling(keyword=str(item), limit=5)

```

나 같은 경우에는 원하는 인물들의 이름을 txt 파일에 넣어두고 그 파일을 읽어서 `keyword`에 담기도록 했더니 세상에 금방 다운로드가 된다 ㄷㄷ  
(chromedriver 옵션이 있지만 그걸 사용하지 않으니까 화면 로딩이 필요 없어서 더 빠른 듯 했다!)  

그리고 위 라이브러리로 다운을 받으면 워크스페이스 안에 `downloads` 디렉토리가 생기고 그 밑으로 검색 `키워드별 폴더`가 생성되어 다운로드 후에도 어떤 결과값인이 알기가 편해서 좋았다.

크롤링 하는 방법을 좀 더 익혀둬야 할 것 같다!!
