build/function.zip: build/bootstrap
	zip -jr build/function.zip build/bootstrap

build/bootstrap: build
	GOOS=linux GOARCH=arm64 go build -tags lambda.norpc -o build/bootstrap main.go

build:
	mkdir -p build

clean:
	rm -rf build
