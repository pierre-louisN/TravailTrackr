#!/bin/bash

for file in *.pdf; do
    if [ "$file" != "output.pdf" ]; then
        ps2pdf -dPDFSETTINGS=/prepress "$file" "temp_output.pdf"
        mv "temp_output.pdf" "$file"
    fi
done

#To compress every file in the folder and keep the names intact
# To launch the file in the terminal: ./convert_pdfs.sh
