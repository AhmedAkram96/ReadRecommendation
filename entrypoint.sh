#!/bin/sh
set -e

echo "Waiting for Postgres..."
./wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Postgres is up"

echo "Running migrations..."
npx sequelize-cli db:migrate

echo "Seeding database..."
npx sequelize-cli db:seed:all

echo "Starting app..."
exec npm start
