#!/bin/sh
# wait until MySQL is really available

maxcounter=30

counter=1
while ! nc $MYSQL_HOST $MYSQL_PORT; do
  >&2 echo "mysql is unavailable - sleeping"
  sleep 1
  counter=`expr $counter + 1`
  if [ $counter -gt $maxcounter ]; then
        >&2 echo "We have been waiting for MySQL too long already; failing."
        exit 1
    fi;
done

# Apply database migrations
echo "Apply database migrations"
npm start;