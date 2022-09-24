@echo off

rem Makes a copy of all png/jpg images in all subdirectories to make them small and fast to load, & medium/appropriately sized

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
    magick mogrify -resize 512x512^> *.png
    magick mogrify -resize 512x512^> *.jpeg
    magick mogrify -resize 512x512^> *.jpg
    cd ..
    rd /q medium
    
    rm -rf large
    mkdir large
    cp *.png large/
    cp *.jpeg large/
    cp *.jpg large/
    cd large && chmod -R 777 .
    magick mogrify -resize 1500x1000^> *.png
    magick mogrify -resize 1500x1000^> *.jpeg
    magick mogrify -resize 1500x1000^> *.jpg
    cd ..
    rd /q large

    cd ..
)
