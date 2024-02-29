build/function.zip: build/package
	cd build/package && zip -r ../function.zip . && cd ../.. && zip build/function.zip handler.py

build/package: build
	pip install \
--platform manylinux2014_aarch64 \
--target=build/package \
--implementation cp \
--python-version 3.12 \
--only-binary=:all: --upgrade \
"fastapi[all]" mangum

build:
	mkdir -p build/package

clean:
	rm -rf build
