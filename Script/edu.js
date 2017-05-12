module.exports=function(){
let readcodeline = require('readline').createInterface({
	input: require('fs').createReadStream('data/test.csv')
});
let flag=true;
let header=[];
let tempo=[];
let jsonarray =[];
let startindex,endindex;
let fs = require('fs');
let checkRow=["All ages","Total"];
let myarray = [];
readcodeline.on('line', function (line) {
  // console.log('Line from file:', line);
  calcpopulation(line)});

readcodeline.on("close",function()
{
	let x=startindex;
	for(let i=0;i<jsonarray[0].length;i++)
	{
		let tmp={};
		tmp["Education_catogories"]=header[x].substring(20,header[x].length);
		tmp["Total_population"]=jsonarray[0][i];
		myarray.push(tmp);
		x+=3;
	}
	console.log(myarray);
	let outputPath = JSON.stringify(myarray);
	fs.writeFileSync('output/Education.json',outputPath);
	console.log("Copied to JSON file");	
});

function calcpopulation(line)
{
	if(flag)
	{
		header=line.split(",");	
		flag=false;
	}
	else
	{
		let tempArray=[]; 
		let row = line.split(",");
		for(let i = 0; i < header.length; i++)
			if(header[i]=="Educational level - Literate without educational level - Persons")
				startindex=i;
			else if(header[i]=="Educational level - Unclassified - Persons") 
				endindex=i;
			if(row[5]==checkRow[0] && row[4]==checkRow[1])
			{
				for(let  i = startindex; i <= endindex; i+=3)
					tempArray.push(parseInt(row[i]));
				// Add object to list 
				if(jsonarray.length!=0)
					for(let j=0;j<tempArray.length;j++)
					{
						jsonarray[0][j]=jsonarray[0][j]+tempArray[j];
						
					}

					else
						jsonarray.push(tempArray);
			}
	}
}}