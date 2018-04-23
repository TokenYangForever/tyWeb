#!/bin/bash
#文件名: sleep.sh
echo -n Count:
# 保存光标位置
tput sc

count=0;
while true;

do
    if [ $count -lt 40 ];
    then
        let count++;
        sleep 1;
        # 回复光标位置
        tput rc
        # tput ed
        echo -n $count;
        else exit 0;
    fi
done