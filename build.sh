#!/bin/bash

echo "[Starting Build]"
rm -rf dist/
mkdir -p dist/

echo "Packaging Frontend ..."
cd frontend/
npm run build &> /dev/null
mv dist/ ../dist/frontend

echo "Packaging Backend ..."
cd ../backend/
source venv/bin/activate
pip freeze > requirements.txt

cp -R ./ ../dist/backend
rm -rf ../dist/backend/venv/ ../dist/backend/**/__pycache__/

echo "Creating install script ..."
echo "sudo apt install python3-pip -y

# Python setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt" > ../dist/install.sh

echo "Done."