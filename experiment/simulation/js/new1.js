//on click of next button
var mpointer=0;
var repeat =0;
var flag=0;
var flag_1=0;

//Variables
var idInput = null, checkUnit = null, textDisplay = null;
var compareVal = 0, qCount = 0, resultCount = 0 ;
var ansDisplay = 0;


//Questions object
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		if(simsubscreennum == 8){
			if(soilType == "Fine grained soil")
				questions.ans1 = 3;
			else if(soilType == "Sandy soil")
				questions.ans1 = 2;
		}
		else
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");

		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");

		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},2500);
	}
}

function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}


//To insert input and check button
function userCalculation(elem)
{
	ansDisplay++;
	var inputVal = document.createElement("input");
	var checkVal = document.createElement("input");
	var rightVal = document.createElement("span");
	inputVal.setAttribute("type","text");
	inputVal.setAttribute("id","res"+ansDisplay);
	inputVal.setAttribute("oninput","checkInputValid(this)");
	rightVal.setAttribute("id","rightAns"+ansDisplay);
	inputVal.classList.add("inputStyle");
	checkVal.setAttribute("type","button");
	checkVal.setAttribute("id","chk"+ansDisplay);
	checkVal.setAttribute("style","cursor:pointer");
	checkVal.setAttribute("onclick","checkResult();");
	checkVal.setAttribute("value","CHECK");
	elem.appendChild(inputVal);
	elem.appendChild(rightVal);
	elem.appendChild(checkVal);
	// elem.setAttribute("onmouseover","formulaDisplay(event,this);");
	// elem.setAttribute("onmouseout","formulaDisplayClose();");
}
function checkResult()
{
	var idd = document.getElementById("res"+ansDisplay);
	var idd1 = document.getElementById("chk"+ansDisplay);
	var ansId = document.getElementById("rightAns"+ansDisplay);
	if(simsubscreennum == 4)
	{
		compareVal = values[lnt][8];
		checkUnit = "m<sup>3</sup>/sec";
	}
	if(simsubscreennum == 5)
	{
		compareVal = values[lnt][5];
		checkUnit = "m<sup>3</sup>/sec";
	}

	else if(simsubscreennum == 6 && resultCount == 0)
	{
		compareVal = values[lnt][11];
		checkUnit = "%";
	}
	else if(simsubscreennum == 6 && resultCount == 1)
	{
		compareVal = values[lnt][12];
		checkUnit = "%";
	}
	else if(simsubscreennum == 6 && resultCount == 2)
	{
		compareVal = values[lnt][9];
		checkUnit = "";
	}
	else if(simsubscreennum == 6 && resultCount == 3)
	{
		compareVal = values[lnt][10];
		checkUnit = "";
	}

	if(!idd.value  || !idd.value!=" ")
	{
		// idd.setAttribute("placeholder","Please enter value");
	}
	else if(Math.round(idd.value) != Math.round(compareVal))
	{
		// console.log(2);
		qCount++;
		// blinkStop();
		ansId.classList.remove("resultStyle");
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			idd1.parentNode.removeChild(idd1);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= compareVal+checkUnit;
			goToNextFunction();
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		idd1.parentNode.removeChild(idd1);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= compareVal+checkUnit+"<span style='color:green;font-size:20px;'>&#10004;</span>";
		goToNextFunction();
	}
}
function goToNextFunction()
{
	if(simsubscreennum == 4)
	{
		qCount = 0;
		document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 5)
	{
		qCount = 0;
		document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 6 && resultCount == 0)
	{
		resultCount = 1;
		qCount = 0;
		document.getElementById('can6-6').innerHTML = "Rankine's efficiency = ";
		idInput = document.getElementById('can6-6');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 6 && resultCount == 1)
	{
		resultCount = 2;
		qCount = 0;
		document.getElementById('can6-7').innerHTML = "Lift to fall ratio =  ";
		idInput = document.getElementById('can6-7');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 6 && resultCount == 2)
	{
		qCount = 0;
		resultCount = 3;
		document.getElementById('can6-8').innerHTML = "Lift to fall ratio =  ";
		idInput = document.getElementById('can6-8');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 6 && resultCount == 3)
	{
		qCount = 0;
		resultCount = 0;
		lnt+=1;
		step6();
		document.getElementById('nextButton').style.visibility="visible";
	}
}
// function formulaDisplay(event,ele)
// {
// 	var xx = event.pageX;
// 	var yy = event.pageY;
// 	xx = xx -  100;
// 	yy = yy - 50;
// 	if(ele.id == "can4-6")
// 		textDisplay = "Q (m<sup>3</sup>/sec) = (A * H)/Time ";
// 	if(ele.id == "can5-6")
// 		textDisplay = "q (m<sup>3</sup>/sec) = (A * H)/Time";
// 	if(ele.id == "can6-5")
// 		textDisplay = "&eta;<sub>A</sub>(%) = (q * H<sub>d</sub>)/(Q+q)H<sub>s</sub> ";
// 	if(ele.id == "can6-6")
// 		textDisplay = "&eta;<sub>R</sub> (%)  = q (H<sub>d</sub>-H<sub>s</sub>)/(Q * H<sub>s</sub>)";
// 	if(ele.id == "can6-7")
// 		textDisplay = "Lift to Fall Ratio =[(H<sub>d</sub> - H<sub>s</sub> ) / H<sub>s</sub>]";
// 	if(ele.id == "can6-8")
// 		textDisplay = "Lift to Fall Ratio =[ H<sub>d</sub> / H<sub>s</sub>)]";
//
//
// 	document.getElementById("formula").style = "position:absolute;visibility:visible;background-color:black;color:white;border-radius:5px;padding:5px;left:"+xx+"px;top:"+yy+"px;";
// 	document.getElementById("formula").innerHTML = textDisplay;
// }
//
// function formulaDisplayClose()
// {
// 	document.getElementById("formula").innerHTML = "";
// 	document.getElementById("formula").style.visibility = "hidden";
// }
function navNext()
{

for (temp = 0; temp <= 7 ; temp++)
{
document.getElementById('canvas'+temp).style.visibility="hidden";
}

simsubscreennum+=1;
document.getElementById('canvas'+(simsubscreennum)).style.visibility="visible";
document.getElementById('nextButton').style.visibility="hidden";
magic();
}


//Move pointing finger with mouse
$(document).mousemove(function(e)
{

if(simsubscreennum==1 && mpointer==0)
{
if(e.pageX<800 && e.pageY<600)
{
document.getElementById('onarm').style.visibility="visible";

 $("#onarm").css({left:e.pageX, top:e.pageY});
}


}

else if(simsubscreennum!=1)
{
	document.getElementById('onarm').style.visibility="hidden";
}


});
//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
if (document.getElementById('arrow1').style.visibility=="hidden")
document.getElementById('arrow1').style.visibility="visible";
else
document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction()
{
clearInterval(myInt);
document.getElementById('arrow1').style.visibility="hidden";
}

//-------------------------------------function magic starts here----------------------------------------------------

function magic()
{

	if (simsubscreennum==1)
	{

		document.getElementById("onarm").style="margin-left:-50px; margin-top: -50px; position:absolute;";

		if(flag==1)
		{

			document.getElementById("formula").style.visibility="hidden";
			document.getElementById('can1on').onclick="";
			document.getElementById('stepnumber').innerHTML="&nbsp;7&nbsp;"
			document.getElementById('pumptext').innerHTML="&nbsp;Stop the pump by pressing the stop button."

		}
		else
		{
			document.getElementById("formula").style.visibility="hidden";
			document.getElementById('can1on').onclick=function() { step1(); };
			document.getElementById('can1off').onclick=function() { stepstop(); };
		}


	}

	else if (simsubscreennum==2)
	{
		document.getElementById('can2-2').style.visibility="hidden";
		document.getElementById('can2-3').style.visibility="hidden";

		repeat+=1;
		if(repeat!=1){

			myStopFunction();

		}
		else
		{
					refresh1();

		myInt = setInterval(function(){ animatearrow(); }, 500);

		document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 155px; top: 205px; height: 50px; z-index: 10;";
		document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)";
				 // Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(90deg)";
				 // Standard syntax
		document.getElementById("arrow1").style.transform = "rotate(90deg)";
		document.getElementById('can2-5').onclick=function() { step_2a(); };

		}


	}

	else if (simsubscreennum==3)
	{
		document.getElementById('trial').style="visibility:visible ;left: 700px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
		document.getElementById('trial').innerHTML="Trial : " +(lnt+1);
		document.getElementById('can2-2').style.visibility="hidden";
		document.getElementById('can2-3').style.visibility="hidden";

		document.getElementById('can3-2').style.visibility="hidden";
		document.getElementById('can3-3').style.visibility="hidden";

		refresh1();

		myInt = setInterval(function(){ animatearrow(); }, 500);

			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 157px; top: 315px; height: 50px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)";
			 // Code for IE9
			 document.getElementById("arrow1").style.msTransform = "rotate(180deg)";
			 // Standard syntax
			 document.getElementById("arrow1").style.transform = "rotate(180deg)";
			document.getElementById('can3-8').onclick=function() { step_3a(); };



	}

	else if (simsubscreennum==4)
	{
		document.getElementById('can3-2').style.visibility="hidden";
		document.getElementById('can3-3').style.visibility="hidden";

		myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 210px; top: 470px; height: 50px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(-135deg)";
			 // Code for IE9
			 document.getElementById("arrow1").style.msTransform = "rotate(-135deg)";
			 // Standard syntax
			 document.getElementById("arrow1").style.transform = "rotate(-135deg)";

		step4();

	}

	else if (simsubscreennum==5)
	{
		document.getElementById("formula").style.visibility = "hidden";
		myStopFunction();
		myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 100px; top: 430px; height: 50px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(-135deg)";
			 // Code for IE9
			 document.getElementById("arrow1").style.msTransform = "rotate(-135deg)";
			 // Standard syntax
			 document.getElementById("arrow1").style.transform = "rotate(-135deg)";
		step5();


	}

	else if (simsubscreennum==6)
	{
		document.getElementById("can6-2").innerHTML = "Delivery head (H <sub>d</sub>) = "+values[lnt][2] +" m";
		document.getElementById("can6-3").innerHTML = "Discharge of waste water (Q) ="+values[lnt][8] +"m<sup>3</sup>/sec";
		document.getElementById("can6-4").innerHTML = "Discharge of useful water (q) ="+values[lnt][5] +"m<sup>3</sup>/sec";
		document.getElementById("formula").style.visibility = "hidden";
		myStopFunction();
		document.getElementById('can6-5').innerHTML="D'Aubuissons efficiency = ";
		idInput = document.getElementById('can6-5');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 7)
	{
		document.getElementById('can1-1').style.visibility = "hidden";
		document.getElementById('can1on').style.visibility = "hidden";
		document.getElementById('can1off').style.visibility = "hidden";
		document.getElementById('formula').style.visibility = "hidden";
		// document.getElementById('skip').style.visibility = "hidden";
		var stepSkip = document.getElementById("skip");
		stepSkip.classList.toggle('fade');
		setTimeout(function()
		{
			document.getElementById("nextButton").style.visibility = "visible";
		},500);
	}
	else (simsubscreennum==8)
	{
		document.getElementById('step7text1').onclick=function() { step_7a();}
		document.getElementById('step7text2').onclick=function() { step_7b();}
	}

}

function step1()
{
	mpointer=1;
	document.getElementById('onarm').style.visibility="hidden";
	document.getElementById('nextButton').style.visibility="visible";
}


function step_2a()
{
	myStopFunction();
	document.getElementById('can2-2').style.visibility="visible";
	document.getElementById('can2-3').style.visibility="visible";

	myInt = setInterval(function(){ animatearrow(); }, 500);

	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 630px; top: 220px; height: 50px; z-index: 10;";
	document.getElementById('can2-3').onclick=function() { step2(); };
}
function step2()
{
	myStopFunction();
	document.getElementById("can2-3").style.transformOrigin = "25% 26%";

	document.getElementById("can2-3").style.animation = "valveturn 1.6s  ";

	setTimeout(function(){
	document.getElementById('can2-4').innerHTML="Supply head (H<sub>s</sub>) = 2.9m";
	setTimeout(function()
	{
		if(repeat == 1)
		{
			var q1 = Object.create(questions);
				generateQuestion(q1,"A hydraulic ram takes in water at one hydraulic head(pressure) and flow rate, and outputs water at : ","","a higher hydraulic head and higher flow rate","a lower hydraulic head and lower flow rate","a higher hydraulic head and lower flow rate","None of the above",3,scree2Proceed,250,100,310,170);
		}
		else

			document.getElementById('nextButton').style.visibility="visible";
	},500);

	}, 1000);
}
function scree2Proceed()
{
	document.getElementById('nextButton').style.visibility="visible";
}

function step_3a()
{
	myStopFunction();
	document.getElementById('can3-2').style.visibility="visible";
	document.getElementById('can3-3').style.visibility="visible";

	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left: 420px; top: 190px; height: 50px; z-index: 10;";
	document.getElementById('can3-3').onclick=function() { step3(); };
}

function step3()
{
	myStopFunction();

	document.getElementById("can3-3").style.transformOrigin = "14% 15%";
	document.getElementById("can3-3").style.animation = "valveturn 2s forwards";
	setTimeout(function(){

	document.getElementById("can3-5").style.transformOrigin = "65% 35%";

	document.getElementById("can3-5").style.animation = "valveturn-2 2.5s forwards ";

	}, 2000);
	setTimeout(function(){

	document.getElementById('can3-6').innerHTML="Delivery pressure = "+values[lnt][1] +" kg/cm<sup>2</sup>";
	document.getElementById('can3-7').innerHTML="Delivery head (H<sub>d</sub>) = "+values[lnt][2] +" m";
	if(lnt == 2)
	{
		var q2 = Object.create(questions);
		generateQuestion(q2,"Delivery pressure is _________  in equal intervals for each trial : ","","increased","decreased","same","None of the above",1,scree3Proceed,250,100,310,170);
	}
	else if(lnt == 1)
	{
		var q2 = Object.create(questions);
		generateQuestion(q2,"Among Supply Head(H<sub>s</sub>) and Delivery Head(H<sub>d</sub>): ","","Only H<sub>d</sub> is constant","Only H<sub>s</sub> is constant","Both H<sub>d</sub> and H<sub>s</sub> are constant ","None of the above",2,scree3Proceed,250,100,310,170);
	}
	else

			document.getElementById('nextButton').style.visibility="visible";
	// document.getElementById('nextButton').style.visibility="visible";
	}, 4500);


}

function scree3Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}

function step4()
{
	setTimeout(function(){
	document.getElementById("can4-3").style.transformOrigin = "50% 100%";

	document.getElementById("can4-3").style.animation = "valveturn-4 2.5s ";
	document.getElementById("can4-7").style.animation = "water0 2.5s forwards";
	}, 500);

	setTimeout(function(){

	document.getElementById('can4-5').innerHTML="Time required by water to fill 10cm height(H) = "+values[lnt][7] +" sec";
	document.getElementById('can4-6').innerHTML="Discharge of waste water (Q) = ";
	idInput = document.getElementById('can4-6');
	userCalculation(idInput);
	}, 3000);
}



function step5()
{
	setTimeout(function(){
	document.getElementById("can5-3").style.transformOrigin = "50% 100%";

	document.getElementById("can5-3").style.animation = "valveturn-5 2.5s 2 ";
	document.getElementById("can5-7").style.animation = "water0 5s forwards";



	}, 500);
	setTimeout(function(){


	document.getElementById('can5-5').innerHTML="Time required by water to fill 10cm height(H) = "+values[lnt][4] +" sec";
	document.getElementById('can5-6').innerHTML="Discharge of useful water (q) = ";
	idInput = document.getElementById('can5-6');
	userCalculation(idInput);
	}, 6000);



}


function step6()
{
	if(lnt==3)
		{
			flag=1;
			mpointer=0;
			simsubscreennum=0;
			document.getElementById("trial").style.visibility = "hidden";
		}
		else if (lnt < 3)
		{
			simsubscreennum=2;
			document.getElementById("nextButton").style.visibility = "visible";

		}

}

function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";
	document.getElementById('question-div').style.top=dright+"px";
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);
	qObject.setCallBack(fn);
}
function step_7a()
{
	$("#chartContainer").ejChart(
        {
		    //Initializing Primary X Axis
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Lift to Fall Ratio' },
                range: { min: 0, max: 10, interval: 1 }
            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'Rankines Efficiency(%)' },
                range: { min: 0, max: 30, interval: 5 }
            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[0][9], y: values[0][12]},
				{ x: values[1][9], y: values[1][12]},
				{ x: values[2][9], y: values[2][12]},
				{ x: values[3][9], y: values[3][12]},
				{ x: values[4][9], y: values[4][12]},
				{ x: values[5][9], y: values[5][12]}


				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}

function step_7b()
{
	$("#chartContainer").ejChart(
        {
		    //Initializing Primary X Axis
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Lift to Fall Ratio' },
                range: { min: 0, max: 20, interval: 5 }
            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'DAbuissons Efficiency(%)' },
                range: { min: 10, max: 30, interval: 5 }
            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[0][10], y: values[0][11]},
				{ x: values[1][10], y: values[1][11]},
				{ x: values[2][10], y: values[2][11]},
				{ x: values[3][10], y: values[3][11]},
				{ x: values[4][10], y: values[4][11]},
				{ x: values[5][10], y: values[5][11]}


				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}



function stepstop()
{
	if(flag!=1){
		document.getElementById('nextButton').style.visibility="hidden";
	}
	else{
		simsubscreennum=6;
		document.getElementById('nextButton').style.visibility="visible";
	}

}

function refresh1()
{
	document.getElementById("can2-3").style.transformOrigin = "";

	document.getElementById("can2-3").style.animation = "";
	document.getElementById('can2-4').innerHTML="Supply head (H<sub>s</sub>) = ";

	document.getElementById("can3-3").style.transformOrigin = "";
	document.getElementById("can3-3").style.animation = "";

	document.getElementById("can3-5").style.transformOrigin = "";

	document.getElementById("can3-5").style.animation = "";

	document.getElementById('can3-6').innerHTML="Delivery pressure = ";
	document.getElementById('can3-7').innerHTML="Delivery head (H<sub>d</sub>) = ";

	document.getElementById("can4-3").style.transformOrigin = "";

	document.getElementById("can4-3").style.animation = "";
	document.getElementById("can4-7").style.animation = "";

	document.getElementById('can4-5').innerHTML="Time required by water to fill 10cm height(H) = ";
	document.getElementById('can4-6').innerHTML="Discharge of waste water (Q)= ";

	document.getElementById("can5-3").style.transformOrigin = "";

	document.getElementById("can5-3").style.animation = "";

	document.getElementById('can5-5').innerHTML="Time required by water to fill 10cm height(H) = ";
	document.getElementById('can5-6').innerHTML="Discharge of useful water (q) = ";
	document.getElementById("can5-7").style.animation = "";


	document.getElementById('can6-5').innerHTML="D'Aubuissons efficiency = ";
	document.getElementById('can6-6').innerHTML="Rankine's efficiency = ";
	document.getElementById('can6-7').innerHTML="Lift to fall ratio = ";
	document.getElementById('can6-8').innerHTML="Lift to fall ratio  = ";
	document.getElementById('formula').style.visibility="hidden";
	document.getElementById('nextButton').style.visibility="hidden";

}
