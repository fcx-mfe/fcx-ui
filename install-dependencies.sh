#!/bin/bash

# Define the list of folders/projects for the container and MFEs
container_projects=("container")
mfe_projects=("nav" "home" "api-client" "products" "auth" "profile")

# Install dependencies for container projects
for project in "${container_projects[@]}"; do
  echo "Installing dependencies for $project..."
  
  # Navigate to the project directory
  cd "$project" || exit
  
  # Install dependencies
  npm install
  
  # Navigate back to the parent directory
  cd ..
done

# Install dependencies for MFE projects
for project in "${mfe_projects[@]}"; do
  echo "Installing dependencies for $project..."
  
  # Navigate to the project directory
  cd "$project" || exit
  
  # Install dependencies
  npm install
  
  # Navigate back to the parent directory
  cd ..
  
  sleep 5
done

echo "All dependencies have been installed."
