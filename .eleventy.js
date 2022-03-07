const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

function sortByOrder(values) {
  let vals = [...values];     // this *seems* to prevent collection mutation...
  return vals.sort((a, b) => Math.sign(b.data.order - a.data.order));
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function formatDate(date) {
  const d = new Date(date);
  return `${monthNames[d.getMonth()]} ${d.getDay() < 10 ? `0${d.getDate()}` : d.getDate()}, ${d.getFullYear()}`; 
}

function head(array, n) {
  if(!Array.isArray(array) || array.length === 0) {
    return [];
  }
  if( n < 0 ) {
    return array.slice(n);
  }

  return array.slice(0, n);
}

module.exports = function(config) {
  const markdownLib = markdownIt()
  .use(markdownItAnchor, {
    level: 2,
    permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
  });
  config.setLibrary('md', markdownLib);

  config.addPassthroughCopy({'./src/static/': '.'});
  config.addWatchTarget('./src/static');

  config.addFilter("sortByOrder", sortByOrder);
  config.addFilter("formatDate", formatDate);
  config.addFilter("head", head);
  
  return {
    dir: {
      input: './src',
      output: './docs',
    }
  }
}