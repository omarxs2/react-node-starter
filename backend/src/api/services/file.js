const fs = require('fs');
const { NFS_FOLDER } = require('../../config/vars');

const getFile = (pathname, mimeType, res) => {
  if (!fs.statSync(NFS_FOLDER).isDirectory()) {
    res.status(404).end(`File ${pathname} is not exist!`);
  }
  fs.existsSync(NFS_FOLDER + pathname, (exist) => {
    if (!exist) {
      res.status(404).end(`File ${pathname} is not found!`);
    }
  });

  fs.readFile(NFS_FOLDER + pathname, (err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.setHeader('Content-Type', mimeType);
      res.end(data);
    }
  });
};

module.exports = { getFile };
