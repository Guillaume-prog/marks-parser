#!/bin/bash

# Prerequisites
sudo apt install python3-pip -y

# Python setup
cd backend/
python3 -m venv venv
source venv/bin/activate

pip install tabula-py numpy pandas PyPDF2 bottle
