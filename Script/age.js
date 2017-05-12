module.exports=function(){
let readcodeline = require('readline').createInterface({
 input: require('fs').createReadStream('data/test.csv')
});
let file = require('fs');//Given file stream
let ageindex,literateindex;

let myarray = [];
let checkRow=["All ages","Total"];
let header='';

//Reading the file line by line
//Getting header values

readcodeline.on('line', function (line) {
  myarray.push(line);
  header=line.split(","); 
  console.log(header)
  for(let i = 1; i < header.length; i++)
    if(header[i]=="Age-group")
      ageindex=i;
    else if(header[i]=="Literate - Persons") 
      literateindex=i;

  });
readcodeline.on('close', function () {
  let age=[];
  let arr=[];
  let literatevalue=[];

  for (let i = 1; i <myarray.length; i++) {
    arr= (myarray[i]).split(',');
    age.push(arr[ageindex]);

  }

  age=removeduplicate(age);
  age.splice(0,1);
  for (let i = 0; i < age.length; i++) {
    literatevalue.push(0);
  }
  for(let i in myarray)
  {
    let temp=(myarray[i]).split(',');
      // Calculating array values

      for(let j in age)
      {
        if(temp[ageindex]==age[j]){
          literatevalue[j]=parseInt(literatevalue[j])+parseInt(temp[literateindex]); 
        }
      }
    }
    myobj =[];
    for( i=0;i<literatevalue.length;i++)
    {
      myobj[i]={};
      //obj[age[i]]=literate[i];
      myobj[i]["Age"]=age[i];
      myobj[i]["Population"]=literatevalue[i];
    }
   // console.log( myobj);
    
    // Convert object to string, write json to file

    let outputPath = JSON.stringify(myobj);
    file.writeFileSync('output/ageconvertor.json',outputPath);
   // console.log("Copied to JSON1 file");

  });
//Remove dupicate the age value


function removeduplicate(duplicate) {   
  let arr = [];
  for (let i=0; i< duplicate.length; i++) {
    if(arr.indexOf(duplicate[i]) == -1) {
      arr.push(duplicate[i]);
    }
  }
//  console.log(arr);

return arr;
}}