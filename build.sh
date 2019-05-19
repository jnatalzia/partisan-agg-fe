#! /bin/bash

# Automatically exit if build fails
set -e

echo "building fe assets"
npm run build

start_go_cmd="node partisan-agg-fe.js >> /tmp/partisan-agg-fe.log &"
echo $start_go_cmd
 
./kill_fe.sh

echo "starting program"
eval "$start_go_cmd"  
