#!/bin/bash

docker build --network host --tag alpotapov/kleinstars_service:latest --platform linux/amd64 .

docker tag alpotapov/kleinstars_service registry.heroku.com/kleinstars-service/web
