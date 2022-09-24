@echo off

rem Make a copy of all png/jpg images in all subdirectories to make them small and fast to load, & medium/appropriately sized

for /d %%i in (./*) do (
    cd "%%i"

    @REM rm -rf small
    @REM mkdir small
    @REM cp *.png small/
    @REM cp *.jpeg small/
    @REM cp *.jpg small/
    @REM cd small && chmod -R 777 .
    @REM magick mogrify -resize 128x128 -blur 8 *.png
    @REM magick mogrify -resize 128x128 -blur 8 *.jpeg
    @REM magick mogrify -resize 128x128 -blur 8 *.jpg
    @REM cd ..
    @REM rd /q small
    
    rm -rf medium
    mkdir medium
    cp *.png medium/
    cp *.jpeg medium/
    cp *.jpg medium/
    cd medium && chmod -R 777 .
    magick mogrify -resize 1500x1000^> *.png
    magick mogrify -resize 1500x1000^> *.jpeg
    magick mogrify -resize 1500x1000^> *.jpg
    cd ..
    rd /q medium

    cd ..
)
