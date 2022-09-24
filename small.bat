@echo off

rem Make a copy of all png/jpg images in all subdirectories to make them small and fast to load

for /d %%i in (./*) do (
    cd "%%i"

    rm -rf small
    mkdir small
    cp *.png small/
    cp *.jpeg small/
    cp *.jpg small/
    cd small && chmod -R 777 .
    magick mogrify -resize 128x128 -blur 4 *.png
    magick mogrify -resize 128x128 -blur 4 *.jpeg
    magick mogrify -resize 128x128 -blur 4 *.jpg
    cd ..
    rd /q small


    cd ..
)
