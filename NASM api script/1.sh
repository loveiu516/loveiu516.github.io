#!/bin/sh
rm -rf ./cookie*
rm -rf ./temp*
mkdir ./cookie
mkdir ./temp
ip="$(cat ./ip)"

curl -s -k -D ./cookie/apiuser_cookie https://apiuser:apiuser@$ip:8443/airframe/main/v1/login -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
if [ "$sta" = "200" ]; then
echo "200 GET apiuser_cookie PASS"
else
echo "NOT 200 GET apiuser_cookie FAIL"
exit 1
fi
sta=""


curl -s -k -b ./cookie/apiuser_cookie https://$ip:8443/airframe/main/v1/user/all -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "200" ]; then
echo "200 GET user/all PASS"
else
echo "NOT 200 GET user/all FAIL"
exit 1
fi
sta=""

if [ `echo $res | jq .[0].userId` = "1" ]; then
echo "[0].userId=1 PASS"
else
echo "[0].userId=1 FAIL"
exit 1
fi
if [ `echo $res | jq .[0].username` = "\"admin\"" ]; then
echo "[0].username=admin PASS"
else
echo "[0].username=admin FAIL"
exit 1
fi

if [ `echo $res | jq .[1].userId` = "2" ]; then
echo "[1].userId=1 PASS"
else
echo "[1].userId=1 FAIL"
exit 1
fi
if [ `echo $res | jq .[1].username` = "\"monitoring\"" ]; then
echo "[1].username=monitoring PASS"
else
echo "[1].username=monitoring FAIL"
exit 1
fi
res=""