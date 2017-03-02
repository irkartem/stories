Task: implemet auto test, and CD for out web-developer. + Environment consistency

- Codebase stored in git repo.
- All changes maked locally.
- we have full php project for deploy.
- We have permanent mysql DB.

## Deploy set of docker containers. 
We need 4 containers:
* php
* apache
* mariadb 
* mail

Not so good. 

## Deploy playbook for ansible. 


## Deploy one container
Chose the right image. Put code to container? Nope 

## Docker is not for DB. Why?


## Backward deploy 

##Immutable deploy 

## Monitoring production


##Staging 
###Test 
Run docker php7 container. 
Git clone 
open all pages 
check apache error log G


6 reasons to use Docker for Drupal deployments
https://blog.wodby.com/6-reasons-to-deploy-drupal-8-with-docker-how-to-guide-b2f073e61672#.7ycgt1o6t


CD web проекта на примере Drupal 7

* Как это было.
 VDS с LAMP для production.
 VDS с LAMP для тестирования.
 Разработчики сами все разворачивали и обновляли. Сначала на тестовом сервере, потом на боевом. 

  - Во время разворота на боевом севрере сайт работал некорректно.
  - Иногда на production не взлетало. Окружение и условия разные.
  
* Какие цели стоят, и какие проблемы решаем.
  - Организовать инфраструктуру удобную для тестирования
  - Хранить прошлые рабочие версии сайта и быстро откатываться.
  - Быстрый разворот копии на посмотреть, потестировать.

* Весь код храним в git, почему это важно если кто не понимает. 

* Где и как находится БД, почему нельзя запихать БД в контейнер.

* Варианты которые рассматривали для deploy
**Ansible playbook
**Клонировать VirtualHost
**Каждый сервис в отдельный Docker
**Все в одном docker

* Как мы реализовали все в 1 docker 

*Что тестируем автотестами

*Imutable deployment. Направление трафика. 
