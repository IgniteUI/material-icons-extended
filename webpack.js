import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

webpack(webpackConfig, (err, stats) => {
  const info = stats.toJson();

  if(err || stats.hasErrors()) {
    console.error(info.errors);
  }
 
  if(stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log('Successfully built library.');
});
