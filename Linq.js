
// better than typeof 
var toType = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

Array.prototype.SelectMany = function (keyGetter) {
    return this.map(x=>keyGetter(x)).reduce((a, b) => a.concat(b),[]);
}
Array.prototype.Max = function (keyGetter) {
    return Math.max(...this.map(x=>keyGetter(x)));
}
Array.prototype.Min = function (keyGetter) {
    return Math.min(...this.map(x=>keyGetter(x)));
}
Array.prototype.Add=function(value){
    return this.push(value);
  }
  Array.prototype.AddRange=function(values){
      return this.push(...values);
  }

Array.prototype.STDEV = function (count) {
    var array = this;
    if (!count) {
        count = this.length;
    }
    var top = 0;
    for (var i = 0; i < count; i++) {
        top = top + array[i];
    }
    var av = top / count;
    top = 0;
    for (var i = 0; i < count; i++) {
        top += (array[i] - av) * (array[i] - av);
    }
    return Math.sqrt(top / count);
}

Array.prototype.GroupBy = function (keyGetter, groupLevel) {
    if (groupLevel == undefined) groupLevel = 1;

    const map = new Map();
    this.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);

        !collection ? map.set(key, [item]) : collection.push(item);
    });

    return Array.from(map).map(x=> { return { key: x[0], values: x[1], groupLevel: groupLevel } }).filter(x=> !(x.key == "" || x.key == null));
}
Array.prototype.OrderByOrderList = function (OrderList, keyGetter){ // performans geliştirmesi yapılacak returnArray kullanılmadan...
    var returnArray = [];
    var tempObj = {};

    for (var i = 0; i < this.length; i++) 
        tempObj[keyGetter(this[i])] = this[i];
    
    for (var i = 0; i < OrderList.length; i++) 
        if (tempObj[OrderList[i]] != undefined)
            returnArray.push(tempObj[OrderList[i]]);
    
    for (var key in tempObj)
        if (returnArray.filter(a=>  keyGetter(a) == key).length < 1)
            returnArray.push(tempObj[key]);

    return returnArray;
}
Array.prototype.OrderBy = function (keyGetter)  { // stringler için çalışmıyor.. eklenecek
    return this.sort((a, b) => keyGetter(a) - keyGetter(b));  //  ('' + a.attr).localeCompare(b.attr);
}
Array.prototype.OrderByDescending = function (keyGetter) {
    return this.sort((a, b) => keyGetter(b) - keyGetter(a));
}
Array.prototype.Select = function (keyGetter) {
    return this.map(x=> keyGetter(x));
}
Array.prototype.Sum = function (keyGetter) {
    return this.reduce((a, b) => keyGetter(a) + keyGetter(b));
}
Array.prototype.Average = function (keyGetter) {
     return this.map(x=> keyGetter(x)).reduce((a, b) =>a + b,0) / (this.length || 1 );
}
Array.prototype.Average = function () {
    return this.reduce((a, b) => a + b,0) / (this.length || 1);
}
Array.prototype.Distinct = function (keyGetter) {
    return this.filter( (value,self,index) => self.map(y=> keyGetter(y)).indexOf(keyGetter(value)===index));
}
Array.prototype.Count = function () {
    return this.length;
}
Array.prototype.Count = function (keyGetter) {
    return this.filter(x=> keyGetter(x) != false).length;
}
Array.prototype.Where = function (keyGetter) {
    return this.filter(x=> keyGetter(x));
}
Array.prototype.FirstOrDefault = function () {
    return this[0] || null;
}
Array.prototype.LastOrDefault = function () {
    return this[this.length - 1] || null;
}


Array.prototype.ToArray = function () {

    if (toType(this) == "array")
        return this;
    else if (toType(this) == "object")
        return Object.entries(this);
    return [];
}


