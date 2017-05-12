module.exports=function(){
let rl = require('readline').createInterface({
 input: require('fs').createReadStream('data/test.csv')
});
let fs = require('fs');
let maleindex,stateindex,femaleindex;
global.myarray = [];
rl.on('line', function (line) {
  // console.log('Line from file:', line);
  global.myarray.push(line);
  header=line.split(",");
  for(let i = 0; i < header.length; i++)
    if(header[i]=="Area Name")
      stateindex=i;
    else if(header[i]=="Educational level - Graduate & above - Males") 
      maleindex=i;
    else if(header[i]=="Educational level - Graduate & above - Females") 
      femaleindex=i;
  });

rl.on('close', function () {
    // console.log(global.myarray);
    let state=[];
    let arr=[];
    let male=[];
    let female=[];

    for (let i = 0; i < global.myarray.length; i++) {
      arr= (global.myarray[i]).split(',');
      state.push(arr[stateindex]);

    }
   // console.log(age);
   state=removeduplicate(state);
   state.splice(0,1);
   for (let i = 0; i < state.length; i++) {
    male.push(0);
    female.push(0);  }
    for(let i in global.myarray)
    {
      let temp=(global.myarray[i]).split(',');
      for(let j in state)
      {
        if(temp[stateindex]==state[j]){
          male[j]=parseInt(male[j])+parseInt(temp[maleindex]);

        }
      }
    }
    for(let i in global.myarray)
    {
      let temp=(global.myarray[i]).split(',');
      for(let j in state)
      {
        if(temp[stateindex]==state[j]){
          female[j]=parseInt(female[j])+parseInt(temp[femaleindex]);

        }
      }
    }


   //  for(let i in male)
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

  let outPath = JSON.stringify(obj);
  fs.writeFileSync('output/graduatevalue.json',outPath);
  console.log("Copied to JSON2 file");
  

   // console.log("arr"+male.length);
   // console.log(female.length);

 });

function removeduplicate(dupli) {
  let arr = [];
  for (let i=0; i< dupli.length; i++) {
    if(arr.indexOf(dupli[i]) == -1) {
      arr.push(dupli[i]);
    }
  }
//  console.log(arr);

return arr;
}}