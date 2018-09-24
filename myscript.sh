#!/bin/bash

# Start the first process
(rabbitmq-server start) &
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start my_1_process: $status"
  exit $status
fi

# Start the 2nd process
(node server.js) &
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start my_2_process: $status"
  exit $status
fi

# Start the 3rd process
(sleep 20s; python chat1.py) 
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start my_3_process: $status"
  exit $status
fi


