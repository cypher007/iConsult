build:
	cd static/web-client/ && yarn install && yarn build
	hugo
	rm -rf public/web-client