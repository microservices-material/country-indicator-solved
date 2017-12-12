call pm2 flush
call pm2 delete all
call pm2 start countrySeparatedData.js
call pm2 start countryData.js