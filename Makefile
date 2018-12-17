build:
	hugo
	cd static/web-client/ && yarn install && yarn build