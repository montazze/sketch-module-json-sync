import fs from 'sketch-module-fs'

export function jsonFilePaths (path) {
  var filename
  var ds = NSFileManager.defaultManager().enumeratorAtPath(path)
  var paths = []
  while (filename = ds.nextObject()) {
    if (filename.pathExtension() == 'json') {
      paths.push(filename)
    }
  }
  return paths
}

export function jsonTree (jsonPaths, path) {
  var tree = {}
  for (var i = 0; i < jsonPaths.length; i++) {
    var dirs = jsonPaths[i].pathComponents()
    var p = tree
    for (var j = 0; j < dirs.length; j++) {
      var n = dirs[j]
      if (n.pathExtension() == 'json') {
        n = 'jsonFileName'
        p[n] = dirs[j]

        var filePath = path + '/' + jsonPaths[i]
        var jsonString = fs.readFile(filePath)
        var json = JSON.parse(jsonString)
        p['json'] = json
      } else {
        p[n] = p[n] || {}
      }
      p = p[n]
    }
  }
  return tree
}
