# Import point cloud (particles positions and colours) from png files

## Why I create it?
I have a project that needs to display point cloud and interact with users on a website. I found the threejs can import the particle data by CSV but the file is too large for website download.

I found that if I can save the particles positions data to PNG files, the file size would be much smalled. (The R,G,B data can be converted to X,Y,Z position.)

So, I carered a small tool on [Houdini](https://github.com/rc-bellergy/houdini_bake_attributes_to_png) that can bakes particles data to PNG files. Since the normal 8-bit PNG only can has 256 variants of each channel, the resolution is too low. I bake 16-bit PNG for the position data.

Finally, this small js project can read the PNG files and convert the data to particles and display on a website.

## Setup the sample environment
``` bash
# Develop and tested on node v17.7.1
# Run the `nvm` if need:
nvm use v17.7.1

# Install dependencies (only the first time)
npm install

# Run the local server at http://localhost:8080
# Debug mode: http://localhost:8080#debug
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Preview
![](./preview.jpg)

## Project Showcases
https://ccs.city/en/chinese-cultural-club/chinese-culinary
https://ccs.city/en/chinese-cultural-club/chinese-festival
https://ccs.city/en/chinese-cultural-club/chinese-ethics

