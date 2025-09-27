#!/bin/bash

# FloTechPack Deployment Script
echo "🚀 FloTechPack Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the FloTechPack directory"
    exit 1
fi

# Build the project
echo "📦 Building FloTechPack..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""

# Show deployment options
echo "🌐 Choose your deployment option:"
echo "1. Vercel (Recommended - Fastest)"
echo "2. Netlify"
echo "3. GitHub Pages"
echo "4. Manual upload"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "📥 Installing Vercel CLI..."
            npm i -g vercel
            vercel --prod
        fi
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=dist
        else
            echo "📥 Installing Netlify CLI..."
            npm i -g netlify-cli
            netlify deploy --prod --dir=dist
        fi
        ;;
    3)
        echo "🚀 Deploying to GitHub Pages..."
        if command -v gh-pages &> /dev/null; then
            npm run deploy
        else
            echo "📥 Installing gh-pages..."
            npm install --save-dev gh-pages
            npm run deploy
        fi
        ;;
    4)
        echo "📁 Manual deployment:"
        echo "   Upload the contents of the 'dist' folder to your hosting provider"
        echo "   The dist folder contains all the built files ready for deployment"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📖 Check DEPLOYMENT.md for detailed instructions"
