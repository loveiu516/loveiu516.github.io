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
json={\"username\":\"Api$timestamp\",\"password\":\"Api\",\"enabled\":false}
curl -s -k -b ./cookie/apiuser_cookie -X POST https://$ip:8443/airframe/main/v1/user/create/local -d $json -H 'Content-Type: application/json' -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "400" ]; then
echo "400 POST /create/local PASS"
else
echo $sta
echo "NOT 400 POST /create/local FAIL"
exit 1
fi
sta=""
chk="{\"message\":\"[userGroup.empty] userGroup is required\"}"
if [ "$res" = "$chk" ]; then
echo res=$chk PASS
else
echo res=$chk FAIL
exit 1
fi

timestamp=`date +%s`
json={\"password\":\"Api\",\"userGroup\":\"admin\",\"enabled\":false}
curl -s -k -b ./cookie/apiuser_cookie -X POST https://$ip:8443/airframe/main/v1/user/create/local -d $json -H 'Content-Type: application/json' -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "400" ]; then
echo "400 POST /create/local PASS"
else
echo $sta
echo "NOT 400 POST /create/local FAIL"
exit 1
fi
sta=""
chk="{\"message\":\"[username.empty] username is required\"}"
if [ "$res" = "$chk" ]; then
echo res=$chk PASS
else
echo res=$chk FAIL
exit 1
fi

timestamp=`date +%s`
json={\"username\":\"Api$timestamp\",\"password\":\"Api\",\"userGroup\":\"admin\"}
curl -s -k -b ./cookie/apiuser_cookie -X POST https://$ip:8443/airframe/main/v1/user/create/local -d $json -H 'Content-Type: application/json' -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "400" ]; then
echo "400 POST /create/local PASS"
else
echo $sta
echo "NOT 400 POST /create/local FAIL"
exit 1
fi
sta=""
chk="{\"message\":\"[enabled.empty] enabled is required\"}"
if [ "$res" = "$chk" ]; then
echo res=$chk PASS
else
echo res=$chk FAIL
exit 1
fi

timestamp=`date +%s`
json={\"username\":\"Api$timestamp\",\"userGroup\":\"admin\",\"enabled\":false}
curl -s -k -b ./cookie/apiuser_cookie -X POST https://$ip:8443/airframe/main/v1/user/create/local -d $json -H 'Content-Type: application/json' -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "400" ]; then
echo "400 POST /create/local PASS"
else
echo $sta
echo "NOT 400 POST /create/local FAIL"
exit 1
fi
sta=""
chk="{\"message\":\"[password.empty] password is required\"}"
if [ "$res" = "$chk" ]; then
echo res=$chk PASS
else
echo res=$chk FAIL
exit 1
fi

# timestamp=`date +%s`
# json={\"username\":\"Api$timestamp\",\"password\":\"Api\",\"userGroup\":\"notExistUserGroup\",\"enabled\":false}
# curl -s -k -b ./cookie/apiuser_cookie -X POST https://$ip:8443/airframe/main/v1/user/create/local -d $json -H 'Content-Type: application/json' -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
# sta="$(cat ./temp/sta.txt)"
# res="$(cat ./temp/res.txt)"
# if [ "$sta" = "400" ]; then
# echo "400 POST /create/local PASS"
# else
# echo $sta
# echo "NOT 400 POST /create/local FAIL"
# exit 1
# fi
# sta=""
# chk="{\"message\":\"Group name [notExistUserGroup] is not found.\"}"
# if [ "$res" = "$chk" ]; then
# echo res=$chk PASS
# else
# echo res=$chk FAIL
# exit 1
# fi


timestamp=`date +%s`
json={\"username\":\"Api$timestamp\",\"password\":\"Api\",\"userGroup\":\"admin\",\"enabled\":false}
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

curl -s -k -b ./cookie/apiuser_cookie -X POST https://$ip:8443/airframe/main/v1/user/create/local -d $json -H 'Content-Type: application/json' -w "%{http_code}" -o ./temp/res.txt > ./temp/sta.txt
sta="$(cat ./temp/sta.txt)"
res="$(cat ./temp/res.txt)"
if [ "$sta" = "400" ]; then
echo "400 POST /create/local PASS"
else
echo $sta
echo "NOT 400 POST /create/local FAIL"
exit 1
fi
sta=""
chk="{\"message\":\"User [Api$timestamp] already exist, ignore creating user account.\"}"
if [ "$res" = "$chk" ]; then
echo res=$chk PASS
else
echo res=$chk FAIL
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