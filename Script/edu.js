module.exports=function(){
var readcodeline = require('readline').createInterface({
	input: require('fs').createReadStream('data/test.csv')
});
var flag=true;
var header=[];
var tempo=[];
var jsonarray =[];
var startindex,endindex;
var fs = require('fs');
var checkRow=["All ages","Total"];
var myarray = [];
readcodeline.on('line', function (line) {
  // console.log('Line from file:', line);
  calcpopulation(line)});

readcodeline.on("close",function()
{
	var x=startindex;
	for(let i=0;i<jsonarray[0].length;i++)
	{
		var tmp={};
		tmp["Education_catogories"]=header[x].substring(20,header[x].length);
		tmp["Total_population"]=jsonarray[0][i];
		myarray.push(tmp);
		x+=3;
	}
	console.log(myarray);
	var outputPath = JSON.stringify(myarray);
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
		var tempArray=[]; 
		var row = line.split(",");
		for(var i = 0; i < header.length; i++)
			if(header[i]=="Educational level - Literate without educational level - Persons")
				startindex=i;
			else if(header[i]=="Educational level - Unclassified - Persons") 
				endindex=i;
			if(row[5]==checkRow[0] && row[4]==checkRow[1])
			{
				for(var  i = startindex; i <= endindex; i+=3)
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