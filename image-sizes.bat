@echo off

rem Make a copy of all png/jpg images in all subdirectories to make them small and fast to load, & medium/appropriately sized

for /d %%i in (./*) do (
    cd "%%i"

    rm -rf small
    mkdir small
    cp *.png small/
    cp *.jpeg small/
    cp *.jpg small/
    cd small && chmod -R 777 .
    magick mogrify -resize 128x128 -blur 8 *.png
    magick mogrify -resize 128x128 -blur 8 *.jpeg
    magick mogrify -resize 128x128 -blur 8 *.jpg
    cd ..
    rd /q small
    
    rm -rf medium
    mkdir medium
    cp *.png medium/
    cp *.jpeg medium/
    cp *.jpg medium/
    cd medium && chmod -R 777 .
    magick mogrify -resize 2048x1024> *.png
    magick mogrify -resize 2048x1024> *.jpeg
    magick mogrify -resize 2048x1024> *.jpg
    cd ..
    rd /q medium

    cd ..
)
