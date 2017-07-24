#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');
const sass = require('node-sass');

const config = {
  src: './src/assets/css/stylesheets/sass/*.scss', // glob files
  dest: './static', // directory
};


function compile(src, dest) {
  return new Promise((resolve, reject) => {
    sass.render({
      file: src,
      outputStyle: 'compressed',
    }, (error, result) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      if (!error) {
        console.log(chalk.green(`Sass compile ${src} sucessfully!`));
        console.log('Write the result to file...');
        fs.writeFile(dest, result.css, (err) => {
          if (err) {
            console.log(`Write to file ${dest} completely!`);
            return reject(err);
          }
          resolve();
        });
      }
    });
  });
}

function makeTheme(src, dest) {
  const paths = glob.sync(src);
  const compileQueue = paths.map((srcPath) => {
    const filename = path.basename(srcPath);
    const destPath = path.resolve(dest, filename);
    return compile(srcPath, destPath);
  });
  Promise.all(compileQueue).then(() => {
    console.log(chalk.green('All files have compiled to css successfully!'));
  });
}

makeTheme(config.src, config.dest);
