# Compiling C++ applications and libraries

This repository shows you how simple it can be to create c++ executables, static and shared libraries. 

I created some simple makefiles. You can compile makefiles on windows using MinGW and MSYS. I recommend using the get-mingw application for this while carefully reading the getting started guide.

There are also CMake files to generate instructions on how to build the project for different tools. CMake itself doesn't compile the code. On Windows you can download [msbuild](https://www.google.nl/search?q=Microsoft+Build+Tools) to compile the generated solution. On Linux you will probably compile it using the generated makefiles and g++. 

## Building with the makefiles

Start the command line, navigate to the project folder and run `make`. 

## Building with CMake

Start the command line, navigat to the project folder and run

```bash
mkdir build
cd build
cmake ../myapp
```

Now compile the project with the right build tools. For example on Windows:
```cmd
msbuild.exe myapp.sln
```
