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
echo $sta
echo "NOT 200 GET apiuser_cookie FAIL"
exit 1
fi
sta=""


timestamp=`date +%s`
json={\"username\":\"Api$timestamp\",\"password\":\"Api\",\"userGroup\":\"admin\",\"enabled\":true}
curl -s -k -b ./cookie/apiuser_cookie -X POST https://$ip:8443/airframe/main/v1/user/create/local -d $json -H 'Content-Type: application/json' -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "200" ]; then
echo "200 POST /create/local PASS"
else
echo $sta
echo "NOT 200 POST /create/local FAIL"
exit 1
fi
sta=""

userId="$(cat ./temp/res.txt| jq .userId)"
echo userId=$userId

curl -s -k -D ./cookie/Api$timestamp\_cookie https://Api$timestamp:Api@$ip:8443/airframe/main/v1/login -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
if [ "$sta" = "200" ]; then
echo "200 GET Api$timestamp"_cookie" PASS"
else
echo $sta
echo "NOT 200 GET Api$timestamp"_cookie" FAIL"
exit 1
fi
sta=""

json={\"displayName\":\"newuser\"}
curl -s -k -b ./cookie/Api$timestamp\_cookie -X PUT https://$ip:8443/airframe/main/v1/user/current -d $json -H 'Content-Type: application/json' -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "204" ]; then
echo "204 POST /user/current PASS"
else
echo $sta
echo "NOT 204 POST /user/current FAIL"
exit 1
fi
sta=""

curl -s -k -b ./cookie/Api$timestamp\_cookie https://$ip:8443/airframe/main/v1/user/current -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "200" ]; then
echo "200 GET /user/current PASS"
else
echo "NOT 200 GET /user/current FAIL"
exit 1
fi
sta=""


if [ `echo $res | jq .userId` = $userId ]; then
echo ".userId=$userId PASS"
else
echo ".userId=$userId FAIL"
exit 1
fi
if [ `echo $res | jq .username` = \"Api$timestamp\" ]; then
echo ".username=Api$timestamp PASS"
else
echo ".username=Api$timestamp FAIL"
exit 1
fi
if [ `echo $res | jq .userGroup` = \"admin\" ]; then
echo ".userGroup=admin PASS"
else
echo ".userGroup=admin FAIL"
exit 1
fi
if [ `echo $res | jq .enabled` = "true" ]; then
echo ".enabled=true PASS"
else
echo ".enabled=true FAIL"
exit 1
fi
if [ `echo $res | jq .displayName` = \"newuser\" ]; then
echo ".displayName=newuser PASS"
else
echo ".displayName=newuser FAIL"
exit 1
fi

curl -s -k -b ./cookie/apiuser_cookie -X DELETE https://$ip:8443/airframe/main/v1/user/$userId -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "204" ]; then
echo "204 use apiuser_cookie DELETE /user/$userId PASS"
else
echo $sta
echo "NOT 204 use apiuser_cookie DELETE /user/$userId FAIL"
exit 1
fi
sta=""
timestamp=""
userId=""