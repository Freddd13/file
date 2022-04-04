const { getCipherInfo } = require('crypto');
const fs = require('fs');
const data = fs.readFileSync('E:/programming/web/web_test/ztree/js/test.json', 'utf8');
let myjson = JSON.parse(data).data.objects;
let after = [];
for(let item of myjson) {
  if (item.type === 'file') {
    continue;
  }
  item.cache = 0;
  delete item.size;
  delete item.pic;
  delete item.date;
  delete item.id;
  after.push(item)
}

console.log(typeof myjson)
console.log(after)
console.log(`${encodeURIComponent('/')}`)