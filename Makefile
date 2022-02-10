deploy-dev:
	aws s3 sync --delete ./build s3://services-online-dev-static-content

deploy-uat:
	aws s3 sync --delete ./build s3://services-online-uat-static-content

deploy-prod:
	aws s3 sync --delete ./build s3://services-online-prod-static-content

deploy-demo:
	aws s3 sync --delete ./build s3://services-online-demo-static-content
