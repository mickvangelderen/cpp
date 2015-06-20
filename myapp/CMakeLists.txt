cmake_minimum_required (VERSION 3.2)

project(myapp)

include_directories("${PROJECT_SOURCE_DIR}/../mylib")

add_subdirectory("../mylib" "mylib/")

add_executable(myapp myapp.cpp)

target_link_libraries(myapp mylib)