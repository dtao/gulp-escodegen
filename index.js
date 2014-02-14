var escodegen = require('escodegen'),
    through   = require('through2');

module.exports = function(options) {
  options || (options = {});

  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    try {
      var tree = JSON.parse(String(file.contents)),
          code = escodegen.generate(tree, options);
      file.contents = new Buffer(code);
      this.push(file);

    } catch (e) {
      console.warn('Error caught from escodegen.generate: ' + e);
      this.push(file);
    }

    return callback();
  });
};
