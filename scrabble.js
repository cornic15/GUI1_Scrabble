/*
   File: scrabble.js
   91.461 Assignment: Using the jQuery UI Slider and Tab Widgets
   Corina Mangione, UMass Lowell Computer Science, corina_mangione@student.uml.edu
   Copyright (c) 2020 by Corina Mangione. All rights reserved. May be
   freely
   copied or excerpted for educational purposes with credit to the
   author.
   updated by Corina Mangione on August 14, 2020
   */



// https://www.w3schools.com/html/html5_draganddrop.asp

/*
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	alert('dropping');
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
	var thisId = this.id;
	console.log(thisId);
}
  function dragEnd(ev){
    if(ev.dataTransfer.dropEffect == "none"){
         var parent = document.getElementById(ev.target.getAttribute("data-parent"));

        parent.appendChild(ev.target);
    }

}
*/


// https://stackoverflow.com/questions/18968154/drag-drop-how-can-i-make-an-image-go-back-to-its-original-position

// allows for drag and drop and image goes back to original if not in correct place
var scoreWord;
var setScore = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

// drags title
function drag(ev) {
    var el = ev.target;
    var parent = el.getAttribute("data-parent");
		el.setAttribute('data-origin-id', el.parentElement.id);
    if(!parent){
      //  el.setAttribute("data-letter", el.parentNode.id);
    }

    ev.dataTransfer.setData("Text", el.id);
		//ev.dataTransfer.setData()
}

// allows user to drop tile
function drop(ev) {
    console.log("DROP");
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    let currentWordLength = readWord().trim().length;
    var targetLocation = ev.target || ev.srcElement;
    console.log("l"+currentWordLength + " equals " + targetLocation.id + "?");
    if("l"+currentWordLength === targetLocation.id){

      // only do this if dropped on a valid spot
      ev.target.appendChild(document.getElementById(data));
  		ev.target.setAttribute('data-parent', data);
  		var movingLetterEl = document.getElementById(data);
  		var movingLetter = movingLetterEl.getAttribute('data-letter');
      movingLetterEl.setAttribute('id', '');
  		targetLocation.setAttribute('data-letter', movingLetter);
      targetLocation.setAttribute('data-score-letter', movingLetter);
  		// also need to get letter out of initial dragging loacation
  		//movingLetterEl.parentElement.removeAttribute('data-letter');

// get previous location of letter
  		var previousLocation = movingLetterEl.getAttribute('data-origin-id');
  		var previousLocationEl = document.getElementById(previousLocation);
  		previousLocationEl.removeAttribute('data-letter');
      previousLocationEl.removeAttribute('data-score-letter');
  		//console.log(targetLocation.id);

// prompt for blank letter to get input from user
      console.log("Drag item " + data + " to " + targetLocation.id);
      if(movingLetter == '_') {
        var promptOK = false;
        var promptText = 'Enter Letter';
        while(promptOK == false ) {

          var fillLetter = prompt(promptText);
          if(/^[A-Z]$/.test(fillLetter)) {
            promptOK = true;
          } else {
            promptText = 'Must be single uppercase letter; Enter Letter';
          }
        }
        targetLocation.setAttribute('data-letter', fillLetter);
        //targetLocation.setAttribute('score-letter', '_');
      }

  }
}


function dragEnd(ev){

    if(ev.dataTransfer.dropEffect == "none"){
         var parent = document.getElementById(ev.target.getAttribute("data-parent"));

        parent.appendChild(ev.target);
    }
}

$('.letter').on('dragenter',function(event){
    event.preventDefault();
    //$(this).html('drop now').css('background','blue');
});
$('.letter').on('dragover',function(event){
    event.preventDefault();
})


/*
document.getElementById('A').onclick = function(event) {
    document.getElementById('A').className = "hidden";
}*/

/*
var i = 0;
    function buttonClick() {
        document.getElementById('inc').value = i++

        function myFunction() {
  document.getElementById("myNumber").stepUp(5);;


  // Load in JSON
  $.getJSON('js/letter.json').done(function(data){
        window.letter = data;
        console.log(window.letter);
        startGame();
    });
		*/
// pick random letter
    function pickRandomLetter(){
        var obj_keys = Object.keys(window.letter);
        var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        window.selectedquestion = window.letter[ran_key];
        console.log(window.selectedquestion);
        console.log(window.letter);
}

// get user hand of tiles

function setRack() {
	$('#rack .rackLetter').each( function (index) {
		var randLetter = getRandomLetter();
    if(this.children.length == 0) {
      console.log("Put a new image tile in this:");
      console.log(this);
      this.innerHTML= '<img class="di" id="drag'+index+'" src="img/Scrabble_Tile_'+randLetter+'.jpg"; data-letter="'+randLetter+'" alt="Scrabble Tile" ondragend="dragEnd(event)" draggable="true" ondragstart="drag(event)" data-letter="A">';
console.log('index'+index)
      console.log(letterArr);
      console.log(randLetter);
      letterArr[randLetter] = letterArr[randLetter] - 1;
      console.log(letterArr);

    }
		//this.src = 'img/Scrabble_Tile_'+randLetter+'.jpg';
		//this.setAttribute('data-Letter', randLetter);

	});
}
// checks to make sure that the word is a proper english word
function checkWord() {
	var nowWord = readWord();
	$('#finalWord').html('word: '+nowWord);
	if(verifyWord(nowWord)) {
		nowWord = nowWord.trim();
		//var score = totalScore(nowWord);
    var score = totalScore(scoreWord);
    setScore += score;
		$('#scoreBox').html( 'Hoo freakin Rah Your Score is <b>'+score+'</b>!!!');
	} else {
		$('#scoreBox').html('Your word is not in our words list<br>[Our crappy word list is only about 3000 words long, sorry]');

		console.log('Nope');
	}
      $('#setScore').html(setScore);
      $('#letterRow div').html('');
      $('#letterRow div').removeAttr('data-letter');
      $('#letterRow div').removeAttr('data-score-letter');
      $('#rack div').html('');
      setRack();
}

// reads in word that user put

function readWord() {
	let wordContent = '';
  let scoreWordContent = '';
	$('#letterRow div').each( function(index) {
		let indexLetter = $(this).attr('data-letter');
    let scoreLetter = $(this).attr('data-score-letter');
		if(indexLetter) {
			 wordContent += indexLetter;
		 } else {
			 wordContent += ' ';
		 }
     if(scoreLetter) {
       scoreWordContent += scoreLetter;
     } else {
       scoreWordContent += '_';
     }
	});
	console.log(wordContent);
  scoreWord = scoreWordContent;
	return wordContent;
}
// make sure it a proper word that the user entered
function verifyWord(word) {
	let lWord = word.toLowerCase(); // cahnges word to lower case
	console.log(lWord+'--');
	lWord = lWord.trim();

	console.log(someWordsList);
	console.log(typeof someWordsList );
//	var check = jQuery.inArray(lWord, someWordsList);
//	var check = someWordsList.includes(lWord);
	var check = someWordsList.indexOf(lWord);
	console.log(check);
	if (check !== -1  ) return true;

	return false;
}


//var json = '{"Task": ["Hours per Day"],"Work": [11],"Eat": [6],"Commute": [4],"Sleep": [3]}'
//  $.getJSON('/pieces.json').done(function(data){
// var json = data
/*
$.getJSON('C:\Users\cmang\Documents\GUI1_Scrabble\pieces.json', function(json) {
    console.log(json); // this will show the info it in firebug console
});
*/
//var json = require('pieces.json')
/*
var obj = JSON.parse(json);
var obj = JSON.parse(json);
MyArr = []
for (var key in obj) {

    MyArr.push([key, obj[key][0]])
}
console.log(MyArr)
*/
// array of letter and frequency

var letterArr = {"A":9,
	"B":2,
	"C":2,
	"D":4,
	"E":12,
	"F":2,
	"G":3,
	"H" :2,
	"I":9,
	"J":1,
	"K":1,
	"L":4,
	"M":2,
	"N":6,
	"O":8,
	"P":2,
	"Q":1,
	"R":6,
	"S":4,
	"T":6,
	"U":4,
	"V":2,
	"W":2,
	"X":1,
	"Y":2,
	"Z":1,
	"_":2
}
 // letter values
var letterValue = {"A" :1,
	"B": 3,
	"C":3,
	"D":2,
	"E":1,
	"F":4,
	"G":2,
	"H":4,
	"I":1,
	"J":8,
	"K":5,
	"L":1,
	"M":3,
	"N":1,
	"O":1,
	"P":3,
	"Q":10,
	"R":1,
	"S":1,
	"T":1,
	"U":1,
	"V":4,
	"W":4,
	"X":8,
	"Y":4,
	"Z":10,
	"_":0
}
// console.log(letterValue)
// creates an array with the number of letter per their frequency
var allLetter= [];
for(var key in letterArr) {
  freqCount = letterArr[key]


  while (freqCount>0){
    allLetter.push(key)
    freqCount --;
  }

}

//var value = letterArr[key];
console.log(allLetter);
// get random letter
function getRandomLetter()
{

return allLetter[Math.floor(Math.random()*allLetter.length)];

}

// assign randome letter ot hand

var letter1 = getRandomLetter(allLetter)
var letter2 = getRandomLetter(allLetter)
var letter3 = getRandomLetter(allLetter)
var letter4 = getRandomLetter(allLetter)
var letter5 = getRandomLetter(allLetter)
var letter6 = getRandomLetter(allLetter)
var letter7 = getRandomLetter(allLetter)
console.log(letter1);
console.log(letter2);
console.log(letter3);


// checks if there is white space inbetween word
var word = "HELLO"
function checkWhiteSpace(word){
  for(letter in word){
    if(letter === '')
    return 1;
    else
    return 0;
  }
}

// checl if there is white space
var check = checkWhiteSpace(word);
console.log(check)

// calculate score - not working
function calculateScore(currentLetter) {
	return letterValue[currentLetter];
	/*
	console.log( 'cl: ' + currentLetter );
	console.log( letterValue[currentLetter] );
  //  console.log("hii")
    //  console.log(currentLetter)

  for( key in letterValue){
   console.log('key '+ key)
    console.log('letter ' + currentLetter)
    if (currentLetter == key){

    //  console.log(key)
    //  console.log(letter)
      console.log("if")
      return letterValue[key]
    }
	}
	*/

}
// gets total score of word
function totalScore(word) {
	scoreTotal = 0;
  var doubleTotal = 0;
  var doubleTiles = [1,6];
  console.log(word.length);
	for (let i = 0; i < word.length; i++){
	      //  console.log(word)
	      //console.log(word[i])
	    var  thisLetter = word[i];
	//type =   typeof thisLetter;
	   //  console.log("type" + type);
	   //scoreTotal += calculateScore(thisLetter)
		 scoreTotal += letterValue[thisLetter];
     if((doubleTiles.indexOf(i) !== -1) && thisLetter != '_'  ){
       doubleTotal++;
       console.log(i);
       console.log(thisLetter); // increment for each number of letter tiles
     }
	    //console.log("score total "+scoreTotal);
	}
  console.log(scoreTotal);
  console.log(doubleTotal);
  // mutiple score by two for each letter tile
  while(doubleTotal > 0) {
    scoreTotal = scoreTotal * 2;
    doubleTotal = doubleTotal - 1;
  }
	return scoreTotal;
}

function doubleWord(){
multiplier = 1;
// check if double word
// if(title is on double word ){
mutiplier*2
return multiplier
}

var gameScore = 0;

// resets game to orginal settings
function endGame(){
multiplier = 1;
gameScore = 0;
/*  letterArr = {"A":9,
  "B":2,
  "C":2,
  "D":4,
  "E":12,
  "F":2,
  "G":3,
  "H" :2,
  "I":9,
  "J":1,
  "K":1,
  "L":4,
  "M":2,
  "N":6,
  "O":8,
  "P":2,
  "Q":1,
  "R":6,
  "S":4,
  "T":6,
  "U":4,
  "V":2,
  "W":2,
  "X":1,
  "Y":2,
  "Z":1,
  "_":2
}*/

}
//console.log(scoreTotal);
/*
var fs = require("fs");
fs.readFile("english3.txt", function(text){
    var someWordsLis= text.split("\n")
});
*/

//console.log(someWordsList);

/* NOT WORKING WHY?? */
$(document).ready(function() {
  setRack(); // draw initial letters

});


/*
var someWordsList = [
  // Borrowed from xkcd password generator which borrowed it from wherever
  "ability","able","aboard","about","above","accept","accident","according",
  "account","accurate","acres","across","act","action","active","activity",
  "actual","actually","add","addition","additional","adjective","adult","adventure",
  "advice","affect","afraid","after","afternoon","again","against","age",
  "ago","agree","ahead","aid","air","airplane","alike","alive",
  "all","allow","almost","alone","along","aloud","alphabet","already",
  "also","although","am","among","amount","ancient","angle","angry",
  "animal","announced","another","answer","ants","any","anybody","anyone",
  "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
  "appropriate","are","area","arm","army","around","arrange","arrangement",
  "arrive","arrow","art","article","as","aside","ask","asleep",
  "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
  "attention","audience","author","automobile","available","average","avoid","aware",
  "away","baby","back","bad","badly","bag","balance","ball",
  "balloon","band","bank","bar","bare","bark","barn","base",
  "baseball","basic","basis","basket","bat","battle","be","bean",
  "bear","beat","beautiful","beauty","became","because","become","becoming",
  "bee","been","before","began","beginning","begun","behavior","behind",
  "being","believed","bell","belong","below","belt","bend","beneath",
  "bent","beside","best","bet","better","between","beyond","bicycle",
  "bigger","biggest","bill","birds","birth","birthday","bit","bite",
  "black","blank","blanket","blew","blind","block","blood","blow",
  "blue","board","boat","body","bone","book","border","born",
  "both","bottle","bottom","bound","bow","bowl","box","boy",
  "brain","branch","brass","brave","bread","break","breakfast","breath",
  "breathe","breathing","breeze","brick","bridge","brief","bright","bring",
  "broad","broke","broken","brother","brought","brown","brush","buffalo",
  "build","building","built","buried","burn","burst","bus","bush",
  "business","busy","but","butter","buy","by","cabin","cage",
  "cake","call","calm","came","camera","camp","can","canal",
  "cannot","cap","capital","captain","captured","car","carbon","card",
  "care","careful","carefully","carried","carry","case","cast","castle",
  "cat","catch","cattle","caught","cause","cave","cell","cent",
  "center","central","century","certain","certainly","chain","chair","chamber",
  "chance","change","changing","chapter","character","characteristic","charge","chart",
  "check","cheese","chemical","chest","chicken","chief","child","children",
  "choice","choose","chose","chosen","church","circle","circus","citizen",
  "city","class","classroom","claws","clay","clean","clear","clearly",
  "climate","climb","clock","close","closely","closer","cloth","clothes",
  "clothing","cloud","club","coach","coal","coast","coat","coffee",
  "cold","collect","college","colony","color","column","combination","combine",
  "come","comfortable","coming","command","common","community","company","compare",
  "compass","complete","completely","complex","composed","composition","compound","concerned",
  "condition","congress","connected","consider","consist","consonant","constantly","construction",
  "contain","continent","continued","contrast","control","conversation","cook","cookies",
  "cool","copper","copy","corn","corner","correct","correctly","cost",
  "cotton","could","count","country","couple","courage","course","court",
  "cover","cow","cowboy","crack","cream","create","creature","crew",
  "crop","cross","crowd","cry","cup","curious","current","curve",
  "customs","cut","cutting","daily","damage","dance","danger","dangerous",
  "dark","darkness","date","daughter","dawn","day","dead","deal",
  "dear","death","decide","declared","deep","deeply","deer","definition",
  "degree","depend","depth","describe","desert","design","desk","detail",
  "determine","develop","development","diagram","diameter","did","die","differ",
  "difference","different","difficult","difficulty","dig","dinner","direct","direction",
  "directly","dirt","dirty","disappear","discover","discovery","discuss","discussion",
  "disease","dish","distance","distant","divide","division","do","doctor",
  "does","dog","doing","doll","dollar","done","donkey","door",
  "dot","double","doubt","down","dozen","draw","drawn","dream",
  "dress","drew","dried","drink","drive","driven","driver","driving",
  "drop","dropped","drove","dry","duck","due","dug","dull",
  "during","dust","duty","each","eager","ear","earlier","early",
  "earn","earth","easier","easily","east","easy","eat","eaten",
  "edge","education","effect","effort","egg","eight","either","electric",
  "electricity","element","elephant","eleven","else","empty","end","enemy",
  "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
  "environment","equal","equally","equator","equipment","escape","especially","essential",
  "establish","even","evening","event","eventually","ever","every","everybody",
  "everyone","everything","everywhere","evidence","exact","exactly","examine","example",
  "excellent","except","exchange","excited","excitement","exciting","exclaimed","exercise",
  "exist","expect","experience","experiment","explain","explanation","explore","express",
  "expression","extra","eye","face","facing","fact","factor","factory",
  "failed","fair","fairly","fall","fallen","familiar","family","famous",
  "far","farm","farmer","farther","fast","fastened","faster","fat",
  "father","favorite","fear","feathers","feature","fed","feed","feel",
  "feet","fell","fellow","felt","fence","few","fewer","field",
  "fierce","fifteen","fifth","fifty","fight","fighting","figure","fill",
  "film","final","finally","find","fine","finest","finger","finish",
  "fire","fireplace","firm","first","fish","five","fix","flag",
  "flame","flat","flew","flies","flight","floating","floor","flow",
  "flower","fly","fog","folks","follow","food","foot","football",
  "for","force","foreign","forest","forget","forgot","forgotten","form",
  "former","fort","forth","forty","forward","fought","found","four",
  "fourth","fox","frame","free","freedom","frequently","fresh","friend",
  "friendly","frighten","frog","from","front","frozen","fruit","fuel",
  "full","fully","fun","function","funny","fur","furniture","further",
  "future","gain","game","garage","garden","gas","gasoline","gate",
  "gather","gave","general","generally","gentle","gently","get","getting",
  "giant","gift","girl","give","given","giving","glad","glass",
  "globe","go","goes","gold","golden","gone","good","goose",
  "got","government","grabbed","grade","gradually","grain","grandfather","grandmother",
  "graph","grass","gravity","gray","great","greater","greatest","greatly",
  "green","grew","ground","group","grow","grown","growth","guard",
  "guess","guide","gulf","gun","habit","had","hair","half",
  "halfway","hall","hand","handle","handsome","hang","happen","happened",
  "happily","happy","harbor","hard","harder","hardly","has","hat",
  "have","having","hay","he","headed","heading","health","heard",
  "hearing","heart","heat","heavy","height","held","hello","help",
  "helpful","her","herd","here","herself","hidden","hide","high",
  "higher","highest","highway","hill","him","himself","his","history",
  "hit","hold","hole","hollow","home","honor","hope","horn",
  "horse","hospital","hot","hour","house","how","however","huge",
  "human","hundred","hung","hungry","hunt","hunter","hurried","hurry",
  "hurt","husband","ice","idea","identity","if","ill","image",
  "imagine","immediately","importance","important","impossible","improve","in","inch",
  "include","including","income","increase","indeed","independent","indicate","individual",
  "industrial","industry","influence","information","inside","instance","instant","instead",
  "instrument","interest","interior","into","introduced","invented","involved","iron",
  "is","island","it","its","itself","jack","jar","jet",
  "job","join","joined","journey","joy","judge","jump","jungle",
  "just","keep","kept","key","kids","kill","kind","kitchen",
  "knew","knife","know","knowledge","known","label","labor","lack",
  "lady","laid","lake","lamp","land","language","large","larger",
  "largest","last","late","later","laugh","law","lay","layers",
  "lead","leader","leaf","learn","least","leather","leave","leaving",
  "led","left","leg","length","lesson","let","letter","level",
  "library","lie","life","lift","light","like","likely","limited",
  "line","lion","lips","liquid","list","listen","little","live",
  "living","load","local","locate","location","log","lonely","long",
  "longer","look","loose","lose","loss","lost","lot","loud",
  "love","lovely","low","lower","luck","lucky","lunch","lungs",
  "lying","machine","machinery","mad","made","magic","magnet","mail",
  "main","mainly","major","make","making","man","managed","manner",
  "manufacturing","many","map","mark","market","married","mass","massage",
  "master","material","mathematics","matter","may","maybe","me","meal",
  "mean","means","meant","measure","meat","medicine","meet","melted",
  "member","memory","men","mental","merely","met","metal","method",
  "mice","middle","might","mighty","mile","military","milk","mill",
  "mind","mine","minerals","minute","mirror","missing","mission","mistake",
  "mix","mixture","model","modern","molecular","moment","money","monkey",
  "month","mood","moon","more","morning","most","mostly","mother",
  "motion","motor","mountain","mouse","mouth","move","movement","movie",
  "moving","mud","muscle","music","musical","must","my","myself",
  "mysterious","nails","name","nation","national","native","natural","naturally",
  "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
  "needed","needle","needs","negative","neighbor","neighborhood","nervous","nest",
  "never","new","news","newspaper","next","nice","night","nine",
  "no","nobody","nodded","noise","none","noon","nor","north",
  "nose","not","note","noted","nothing","notice","noun","now",
  "number","numeral","nuts","object","observe","obtain","occasionally","occur",
  "ocean","of","off","offer","office","officer","official","oil",
  "old","older","oldest","on","once","one","only","onto",
  "open","operation","opinion","opportunity","opposite","or","orange","orbit",
  "order","ordinary","organization","organized","origin","original","other","ought",
  "our","ourselves","out","outer","outline","outside","over","own",
  "owner","oxygen","pack","package","page","paid","pain","paint",
  "pair","palace","pale","pan","paper","paragraph","parallel","parent",
  "park","part","particles","particular","particularly","partly","parts","party",
  "pass","passage","past","path","pattern","pay","peace","pen",
  "pencil","people","per","percent","perfect","perfectly","perhaps","period",
  "person","personal","pet","phrase","physical","piano","pick","picture",
  "pictured","pie","piece","pig","pile","pilot","pine","pink",
  "pipe","pitch","place","plain","plan","plane","planet","planned",
  "planning","plant","plastic","plate","plates","play","pleasant","please",
  "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
  "point","pole","police","policeman","political","pond","pony","pool",
  "poor","popular","population","porch","port","position","positive","possible",
  "possibly","post","pot","potatoes","pound","pour","powder","power",
  "powerful","practical","practice","prepare","present","president","press","pressure",
  "pretty","prevent","previous","price","pride","primitive","principal","principle",
  "printed","private","prize","probably","problem","process","produce","product",
  "production","program","progress","promised","proper","properly","property","protection",
  "proud","prove","provide","public","pull","pupil","pure","purple",
  "purpose","push","put","putting","quarter","queen","question","quick",
  "quickly","quiet","quietly","quite","rabbit","race","radio","railroad",
  "rain","raise","ran","ranch","range","rapidly","rate","rather",
  "raw","rays","reach","read","reader","ready","real","realize",
  "rear","reason","recall","receive","recent","recently","recognize","record",
  "red","refer","refused","region","regular","related","relationship","religious",
  "remain","remarkable","remember","remove","repeat","replace","replied","report",
  "represent","require","research","respect","rest","result","return","review",
  "rhyme","rhythm","rice","rich","ride","riding","right","ring",
  "rise","rising","river","road","roar","rock","rocket","rocky",
  "rod","roll","roof","room","root","rope","rose","rough",
  "round","route","row","rubbed","rubber","rule","ruler","run",
  "running","rush","sad","saddle","safe","safety","said","sail",
  "sale","salmon","salt","same","sand","sang","sat","satellites",
  "satisfied","save","saved","saw","say","scale","scared","scene",
  "school","science","scientific","scientist","score","screen","sea","search",
  "season","seat","second","secret","section","see","seed","seeing",
  "seems","seen","seldom","select","selection","sell","send","sense",
  "sent","sentence","separate","series","serious","serve","service","sets",
  "setting","settle","settlers","seven","several","shade","shadow","shake",
  "shaking","shall","shallow","shape","share","sharp","she","sheep",
  "sheet","shelf","shells","shelter","shine","shinning","ship","shirt",
  "shoe","shoot","shop","shore","short","shorter","shot","should",
  "shoulder","shout","show","shown","shut","sick","sides","sight",
  "sign","signal","silence","silent","silk","silly","silver","similar",
  "simple","simplest","simply","since","sing","single","sink","sister",
  "sit","sitting","situation","six","size","skill","skin","sky",
  "slabs","slave","sleep","slept","slide","slight","slightly","slip",
  "slipped","slope","slow","slowly","small","smaller","smallest","smell",
  "smile","smoke","smooth","snake","snow","so","soap","social",
  "society","soft","softly","soil","solar","sold","soldier","solid",
  "solution","solve","some","somebody","somehow","someone","something","sometime",
  "somewhere","son","song","soon","sort","sound","source","south",
  "southern","space","speak","special","species","specific","speech","speed",
  "spell","spend","spent","spider","spin","spirit","spite","split",
  "spoken","sport","spread","spring","square","stage","stairs","stand",
  "standard","star","stared","start","state","statement","station","stay",
  "steady","steam","steel","steep","stems","step","stepped","stick",
  "stiff","still","stock","stomach","stone","stood","stop","stopped",
  "store","storm","story","stove","straight","strange","stranger","straw",
  "stream","street","strength","stretch","strike","string","strip","strong",
  "stronger","struck","structure","struggle","stuck","student","studied","studying",
  "subject","substance","success","successful","such","sudden","suddenly","sugar",
  "suggest","suit","sum","summer","sun","sunlight","supper","supply",
  "support","suppose","sure","surface","surprise","surrounded","swam","sweet",
  "swept","swim","swimming","swing","swung","syllable","symbol","system",
  "table","tail","take","taken","tales","talk","tall","tank",
  "tape","task","taste","taught","tax","tea","teach","teacher",
  "team","tears","teeth","telephone","television","tell","temperature","ten",
  "tent","term","terrible","test","than","thank","that","thee",
  "them","themselves","then","theory","there","therefore","these","they",
  "thick","thin","thing","think","third","thirty","this","those",
  "thou","though","thought","thousand","thread","three","threw","throat",
  "through","throughout","throw","thrown","thumb","thus","thy","tide",
  "tie","tight","tightly","till","time","tin","tiny","tip",
  "tired","title","to","tobacco","today","together","told","tomorrow",
  "tone","tongue","tonight","too","took","tool","top","topic",
  "torn","total","touch","toward","tower","town","toy","trace",
  "track","trade","traffic","trail","train","transportation","trap","travel",
  "treated","tree","triangle","tribe","trick","tried","trip","troops",
  "tropical","trouble","truck","trunk","truth","try","tube","tune",
  "turn","twelve","twenty","twice","two","type","typical","uncle",
  "under","underline","understanding","unhappy","union","unit","universe","unknown",
  "unless","until","unusual","up","upon","upper","upward","us",
  "use","useful","using","usual","usually","valley","valuable","value",
  "vapor","variety","various","vast","vegetable","verb","vertical","very",
  "vessels","victory","view","village","visit","visitor","voice","volume",
  "vote","vowel","voyage","wagon","wait","walk","wall","want",
  "war","warm","warn","was","wash","waste","watch","water",
  "wave","way","we","weak","wealth","wear","weather","week",
  "weigh","weight","welcome","well","went","were","west","western",
  "wet","whale","what","whatever","wheat","wheel","when","whenever",
  "where","wherever","whether","which","while","whispered","whistle","white",
  "who","whole","whom","whose","why","wide","widely","wife",
  "wild","will","willing","win","wind","window","wing","winter",
  "wire","wise","wish","with","within","without","wolf","women",
  "won","wonder","wonderful","wood","wooden","wool","word","wore",
  "work","worker","world","worried","worry","worse","worth","would",
  "wrapped","write","writer","writing","written","wrong","wrote","yard",
  "year","yellow","yes","yesterday","yet","you","young","younger",
  "your","yourself","youth","zero","zebra","zipper","zoo","zulu"
];
//console.log(someWordsList);
*/






/*
var arr = null;
$.ajax({
    'async': false,
    'global': false,
    'url': "pieces.json",
    'dataType': "json",
    'success': function (data) {
        arr = data;
    }
});


*/

// make an associative array of letter pieces
