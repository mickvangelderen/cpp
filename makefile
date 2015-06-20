.PHONY: all
all:
	cd mylib && make
	cd myapp && make
	myapp/myapp.exe
