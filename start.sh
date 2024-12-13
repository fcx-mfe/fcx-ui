#!/bin/bash

# Define the list of folders/projects
projects=("container")

# Change directory to each project and start it
for project in "${projects[@]}"; do
  echo "Starting $project..."
  
  # Navigate to the project directory
  cd "$project" || exit

  # Start the project (assumes `npm start` is used)
  npm run start &
  
  # Navigate back to the parent directory
  cd ..
done


# Define the list of folders/projects
projects=("nav" "home" "api-client" "products" "auth" "profile")

# Change directory to each project and start it
for project in "${projects[@]}"; do
  echo "Starting $project..."
  
  # Navigate to the project directory
  cd "$project" || exit

  # Start the project (assumes `npm start` is used)
  npm run start:standalone &
  
  # Navigate back to the parent directory
  cd ..

  sleep 5
done

# Wait for all background processes to finish
wait

echo "All projects have been started."
