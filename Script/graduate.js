module.exports=function(){
var rl = require('readline').createInterface({
 input: require('fs').createReadStream('data/test.csv')
});
var fs = require('fs');
var maleindex,stateindex,femaleindex;
global.myarray = [];
rl.on('line', function (line) {
  // console.log('Line from file:', line);
  global.myarray.push(line);
  header=line.split(",");
  for(var i = 0; i < header.length; i++)
    if(header[i]=="Area Name")
      stateindex=i;
    else if(header[i]=="Educational level - Graduate & above - Males") 
      maleindex=i;
    else if(header[i]=="Educational level - Graduate & above - Females") 
      femaleindex=i;
  });

rl.on('close', function () {
    // console.log(global.myarray);
    var state=[];
    var arr=[];
    var male=[];
    var female=[];

    for (var i = 0; i < global.myarray.length; i++) {
      arr= (global.myarray[i]).split(',');
      state.push(arr[stateindex]);

    }
   // console.log(age);
   state=removeduplicate(state);
   state.splice(0,1);
   for (var i = 0; i < state.length; i++) {
    male.push(0);
    female.push(0);  }
    for(var i in global.myarray)
    {
      var temp=(global.myarray[i]).split(',');
      for(var j in state)
      {
        if(temp[stateindex]==state[j]){
          male[j]=parseInt(male[j])+parseInt(temp[maleindex]);

        }
      }
    }
    for(var i in global.myarray)
    {
      var temp=(global.myarray[i]).split(',');
      for(var j in state)
      {
        if(temp[stateindex]==state[j]){
          female[j]=parseInt(female[j])+parseInt(temp[femaleindex]);

        }
      }
    }


   //  for(var i in male)
   //  {
   // // console.log(literate[i]);
   //    //obj[age
   //  }
   //  //console.log(obj);
   obj=[];

   for( i=0;i<male.length;i++)
   {
    obj[i]={};

    obj[i]['AreaName'] = state[i];
    obj[i]['Males']=male[i];
    obj[i]['Female']=female[i];
    
  }
  console.log(obj);

  var outPath = JSON.stringify(obj);
  fs.writeFileSync('output/graduatevalue.json',outPath);
  console.log("Copied to JSON2 file");
  

   // console.log("arr"+male.length);
   // console.log(female.length);

 });

function removeduplicate(dupli) {
  var arr = [];
  for (var i=0; i< dupli.length; i++) {
    if(arr.indexOf(dupli[i]) == -1) {
      arr.push(dupli[i]);
    }
  }
//  console.log(arr);

return arr;
}}