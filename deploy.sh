rm -rf ../bigpige-excel-exporter-dist/*
cp ./composer.json ../bigpige-excel-exporter-dist
cp ./app.json ../bigpige-excel-exporter-dist
cp -a ./dist/bigpige-excel-exporter/. ../bigpige-excel-exporter-dist
cd ../bigpige-excel-exporter-dist
git add .
git commit -m "new deployment"
git push origin master
cd ../bigpige-excel-exporter
