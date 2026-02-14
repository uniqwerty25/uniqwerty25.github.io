var slideIndex =  1; 
var bDraw=false;   
var bDown=false; 
var bStart=false;
var gStart=false;
var qtext="";
var hit=0;
var miss=0;
var hammer = new Audio('./sub/Hammer.wav');
var pong = new Audio('./sub/Pong.wav');
var bmiss=true;
var bhit=false;
var oldkey="";
var rate=0;
var gNumbers = pickRandomNumbers(160, 60);
const isMobile = () => ('ontouchstart' in document.documentElement);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
 {
	window.location.href = "phone.html";
     
    } 
const up_imageUrls = [
  './sub/up_gif/Frame0.png',
  './sub/up_gif/Frame1.png',
  './sub/up_gif/Frame2.png',
  './sub/up_gif/Frame3.png',
  './sub/up_gif/Frame4.png',
  './sub/up_gif/Frame5.png',
  './sub/up_gif/Frame6.png',
  './sub/up_gif/Frame7.png',
  './sub/up_gif/Frame8.png',
  './sub/up_gif/Frame9.png'];
const dn_imageUrls = [
  './sub/down_gif/Frame0.png',
  './sub/down_gif/Frame1.png',
  './sub/down_gif/Frame2.png',
  './sub/down_gif/Frame3.png',
  './sub/down_gif/Frame4.png',
  './sub/down_gif/Frame5.png',
  './sub/down_gif/Frame6.png',
  './sub/down_gif/Frame7.png',
  './sub/down_gif/Frame8.png',
  './sub/down_gif/Frame9.png',
  './sub/down_gif/Frame10.png',
  './sub/down_gif/Frame11.png',
  './sub/down_gif/Frame12.png',
   './sub/down_gif/Frame13.png'
];
const hit_imageUrls = [
//'./sub/hit_gif/Frame0.png',
  './sub/hit_gif/Frame1.png',
//  './sub/hit_gif/Frame2.png',
  './sub/hit_gif/Frame3.png',
//  './sub/hit_gif/Frame4.png',
  './sub/hit_gif/Frame5.png',
//  './sub/hit_gif/Frame6.png',
  './sub/hit_gif/Frame7.png',
//  './sub/hit_gif/Frame8.png',
  './sub/hit_gif/Frame9.png',
//  './sub/hit_gif/Frame10.png',
  './sub/hit_gif/Frame11.png',
//  './sub/hit_gif/Frame12.png',
  './sub/hit_gif/Frame13.png'
  
  
];
const nohit_imageUrls = [
  //'./sub/nohit_gif/Frame0.png',
  './sub/nohit_gif/Frame1.png',
  //'./sub/nohit_gif/Frame2.png',
  './sub/nohit_gif/Frame3.png',
  //'./sub/nohit_gif/Frame4.png',
  './sub/nohit_gif/Frame5.png',
  //'./sub/nohit_gif/Frame6.png',
  './sub/nohit_gif/Frame7.png',
  //'./sub/nohit_gif/Frame8.png',
  './sub/nohit_gif/Frame9.png'
  // Add more image URLs as needed
];
var fkey=["w","e","r","s","d","f","x","c","v","a","j","i","l","k","u","m"];
const btn_urls=[
'./haikana_img/ichi/w.png',
'./haikana_img/ichi/e.png',
'./haikana_img/ichi/r.png',
'./haikana_img/ichi/s.png',
'./haikana_img/ichi/d.png',
'./haikana_img/ichi/f.png',
'./haikana_img/ichi/x.png',
'./haikana_img/ichi/c.png',
'./haikana_img/ichi/v.png',
'./haikana_img/ichi/a.png',
'./haikana_img/ichi/j.png',
'./haikana_img/ichi/i.png',
'./haikana_img/ichi/l.png',
'./haikana_img/ichi/k.png',
'./haikana_img/ichi/u.png',
'./haikana_img/ichi/m.png'

];
// Create an array to store the loaded image objects
const up_images = [];
const dn_images = [];
const hit_images = [];
const nohit_images = [];
const btn_images = [];
let loadedImages=0;
// Function to load the images
function loadbtnImage(url,index)
{
	const img = new Image();
	 
		img.src = url;
		 img.onload = function() {
			
			btn_images[index]=img;
			
		 }
	
}
function loadImage(mode,url, index) {
  const image = new Image();
  image.src = url;
  
  image.onload = function() {
    // Increment the count of loaded images
    //loadedImages++;
    
    // Add the loaded image object to the images array
    if(mode==0) up_images[index] = image;
    if(mode==1) dn_images[index] = image;
    if(mode==2) hit_images[index] = image;
    if(mode==3) nohit_images[index] = image;
    
    
  };
}

// Function to draw the images on the canvas
function drawgif( mode, i, x, y) {
  
  // Iterate through the images array and draw each image
  
   image=new Image();
    if(mode==0)
	{
		image= up_images[i];
		
	}
	else if(mode==1)
	{
		image= dn_images[i];
	}
	else if(mode==2)
	{
		image= hit_images[i];
	}
	else if(mode==3)
	{
		image= nohit_images[i];
	}
	ctx.drawImage(image, x, y,80,80);
  }


// Load the images
for (let i = 0; i < up_imageUrls.length; i++) {
  loadImage(0,up_imageUrls[i], i);
}
for (let i = 0; i < dn_imageUrls.length; i++) {
  loadImage(1,dn_imageUrls[i], i);
}
for (let i = 0; i < hit_imageUrls.length; i++) {
  loadImage(2,hit_imageUrls[i], i);
}
for (let i = 0; i < nohit_imageUrls.length; i++) {
  loadImage(3,nohit_imageUrls[i], i);
}
for (let i = 0; i < btn_urls.length; i++) {
loadbtnImage(btn_urls[i],i);
}
function goton(n)
	{
		slideIndex=n;
	  showDivs(slideIndex);
	}
function pickRandomNumbers(totalNumbers, count) {
  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
  const selectedNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const selectedNumber = numbers.splice(randomIndex, 1)[0];
    selectedNumbers.push(selectedNumber);
  }

  return selectedNumbers;
}

const totalNumbers = 100;
const cnt = 40;
var sNumbers = pickRandomNumbers(totalNumbers, cnt);
console.log(sNumbers);
var canvas = document.getElementById("myCanvas");
//var context = canvas.getContext("2d");
//var cnvsBuffer = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var cDate="";
var heightRatio = 0.43;
ctx.canvas.width = 900;
ctx.canvas.height =500;	
	
	var jpAry3= ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","ん","きぅ","づ","ぽ"];
   var eAry3=["w","wj","wi","wl","wk","e","ej","ei","el","ek","r","rj","ri","rl","rk","s","sj","si","sl","sk","d","dj","di","dl","dk","f","fj","fi","fl","fk","x","xj","xi","xl","xk","c","ci","ck","v","vj","vi","vl","vk","a","ai","ejwiu","siuu","fkuu"];
   var fAry3=["あ","あ-い","あ-う","あ-え","あ-お","か","か-き","か-く","か-け","か-こ","さ","さ-し","さ-す","さ-せ","さ-そ","た","た-ち","た-つ","た-て","た-と","な","な-に","な-ぬ","な-ね","な-の","は","は-ひ","は-ふ","は-へ","は-ほ","ま","ま-み","ま-む","ま-め","ま-も","や","や-ゆ","や-よ","ら","ら-り","ら-る","ら-れ","ら-ろ","わ","わ-ん","か-き-きあ-きう-きぅ","た-つ-っ-づ","は-ほ-ぼ-ぽ"];
   
   var jpAry4=["する","より","ます","です","もつ","いう","ない","から","だれ","その","いち","それ","よい","ひと","なに","こい","もの","みる","いく","そう","ほう","とき","さん","どう","この","まで","だけ","てる","ちゅう","たい","これ","など","いま","あと","ろく","きく","たち","まえ","おんあ","しか","ちがう","つくる","さき","あげる","ふたり","わるい","ひゃく","こえ","かく","あまり","そして","さい","ひとり","しごと","すぐ","こんあ","ことば","かかる","した","かう","でんわ","ちょっと","なぜ","どんあ","すき","みせ","あたま","ころ","たかい","いみ","どの","ほん","きょう","いっしょ","おおきい","いちばん","きり","はなす","れい","かい","どちら","のむ","ちち","ほしい","はやい","かえる","せんせい","つぎ","へや","たつ","けっこん","ながい","いずれ","よぶ","まつ","あう","あまい","かげつ","かぜ","こちら"];
   var eAry4=["rivi","ckvj","xri","sluri","xksi","wjwi","dwj","ev","suvl","rkdk","wjsj","rkvl","ckwj","fjsk","ddj","ekwj","xkdk","xjvi","wjei","rkwi","fkwi","skej","rai","skuwi","ekdk","xslu","suel","slvi","sjciuwi","swj","ekvl","dsku","wjx","wsk","vkei","ejei","ssj","xwl","wkaiw","rje","sjeuwi","sieivi","rej","weluvi","fisvj","aviwj","fjcuei","ekwl","eei","wxvj","rkrjsl","rwj","fjskvj","rjekusk","rieiu","ekaiw","ekskfu","eevi","rjs","ewi","sluaia","sjckusiusk","drlu","skuaiw","riej","xjrl","wsx","ekvk","sewj","wjxj","skudk","fkai","ejckuwi","wjsiurjcku","wkwkejwj","wjsjfuai","ejvj","fdri","vlwj","ewj","skusjv","dkxi","sjsj","fkrjwj","fcwj","ewlvi","rlairlwj","sieju","flc","ssi","elsiuekai","deuwj","wjriuvl","ckfiu","xsi","wwi","wxwj","eelusi","erlu","eksjv"];
   var fAry4=["さ-す-すら-する","や-よ-よら-より","ま-まさ-ます","た-て-で-でさ-です","ま-も-もた-もつ","あ-い-いあ-いう","な-なあ-ない","か-から","た-だ-だら-だれ","さ-そ-そな-その","あ-い-いた-いち","さ-そ-そら-それ","や-よ-よあ-よい","は-ひ-ひた-ひと","な-なな-なに","か-こ-こあ-こい","ま-も-もな-もの","ま-み-みら-みる","あ-い-いか-いく","さ-そ-そあ-そう","は-ほ-ほあ-ほう","た-と-とか-とき","さ-さわ-さん","た-と-ど-どあ-どう","か-こ-こな-この","ま-また-まて-まで","た-だ-だか-だけ","た-て-てら-てる","た-ち-ちや-ちゆ-ちゅ-ちゅあ-ちゅう","た-たあ-たい","か-こ-こら-これ","な-なた-なと-など","あ-い-いま","あ-あた-あと","ら-ろ-ろか-ろく","か-き-きか-きく","た-たた-たち","ま-まあ-まえ","あ-お-おわ-おん-おんあ","さ-し-しか","た-ち-ちか-ちが-ちがあ-ちがう","た-つ-つか-つく-つくら-つくる","さ-さか-さき","あ-あか-あけ-あげ-あげら-あげる","は-ふ-ふた-ふたら-ふたり","わ-わら-わる-わるあ-わるい","は-ひ-ひや-ひゃ-ひゃか-ひゃく","か-こ-こあ-こえ","か-かか-かく","あ-あま-あまら-あまり","さ-そ-そさ-そし-そした-そして","さ-さあ-さい","は-ひ-ひた-ひと-ひとら-ひとり","さ-し-しか-しこ-しご-きごた-しごと","さ-す-すか-すく-すぐ","か-こ-こわ-こん-こんあ","か-こ-こた-こと-ことは-ことば","か-かか-かから-かかる","さ-し-した","か-かあ-かう","た-て-で-でわ-でん-でんわ","た-ち-ちや-ちよ-ちょ-ちょた-ちょつ-ちょっ-ちょった-ちょっと","な-なさ-なせ-なぜ","た-と-ど-どわ-どん-どんあ","さ-す-すか-すき","ま-み-みさ-みせ","あ-あた-あたま","か-こ-こら-ころ","た-たか-たかあ-たかい","あ-い-いま-いみ","た-と-ど-どな-どの","は-ほ-ほわ-ほん","か-き-きや-きよ-きょ-きょあ-きょう","あ-い-いた-いつ-いっ-いっさ-いっし-いっしや-いっしよ-いっしょ","あ-お-おあ-おお-おおか-おおき-おおきあ-おおきい","あ-い-いた-いち-いちは-いちば-いちばわ-いちばん","か-き-きら-きり","は-はな-はなさ-はなす","ら-れ-れあ-れい","か-かあ-かい","た-と-ど-どた-どち-どちら","な-の-のま-のむ","た-ち-ちた-ちち","は-ほ-ほさ-ほし-ほしあ-ほしい","は-はや-はやあ-はやい","か-かあ-かえ-かえら-かえる","さ-せ-せわ-せん-せんさ-せんせ-せんせあ-せんせい","た-つ-つか-つき-つぎ","は-へ-へや","た-たた-たつ","か-け-けた-けつ-けっ-けっか-けっこ-けっこわ-けっこん","な-なか-なが-ながあ-ながい","あ-い-いさ-いす-いず-いずら-いずれ","や-よ-よは-よふ-よぶ","ま-また-まつ","あ-ああ-あう","あ-あま-あまあ-あまい","か-かか-かけ-かげ-かげた-かげつ","か-かさ-かせ-かぜ","か-こ-こた-こち-こちら"];   var qAry=new Array();
      var gAry=["w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m","w","e","r","s","d","f","x","c","v","u","i","o","j","k","l","m"];
	
	let mode=1; 
	var curelem="";
	var keystep=0;
	var img = new Image (); //이미지 객체 생성
	var kimg = new Image ();
	var kimg2 = new Image ();
	
	var gimg2 = new Image ();
	var kimg3 = new Image ();
	var kimg4 = new Image ();
	var kimg5 = new Image ();
	var kimg6 = new Image ();
	var mimg = new Image ();
	var mimg2 = new Image ();
	var jimg = new Image ();
	var intext="|";
	var pkey="あ";
	var okey="w";
	var inkey="";
	var finishkey="";
	var index=0;
	var step=0;
	var pos=1.0;
	var score = 0;
	var hratio=0;
	var bFinish=true;
	var info="キーボードを見ずに入力してみてください。";
	var curkey="";
	jimg.src="./haikana_img/ichi/keyflow.png" ;
	img.src = "./haikana_simg/m2.png" ; 
	kimg.src = "./haikana_simg/pg12.png" ; 
	kimg2.src = "./haikana_img/sub/pre_back1.png" ;
	kimg3.src = "./haikana_img/sub/chall_back1.png" ;
	mimg.src = "./haikana_img/sub/1more3.png" ;
	mimg2.src = "./haikana_img/sub/cert2.png" ;
	kimg4.src = "./haikana_img/ichi/game1p.png" ;
	kimg5.src = "./haikana_img/ichi/game.png" ;
	kimg6.src = "./haikana_img/ichi/game3p.png" ;
	var hand = new Image (); //이미지 객체 생성
	hand.src = "./haikana_simg/hand.png" ; 
	var fbtn = new Image (); //이미지 객체 생성
	fbtn.src = "./haikana_simg/fbtn.png" ; 
	var fbtn2 = new Image (); //이미지 객체 생성
	fbtn2.src = "./haikana_simg/fbtn2.png" ; 
	var btn = new Image (); 
	var predic= new Image ();
	var prepos=-1;
	
	var dy=0.3;
	var bl=false;
	var startTime = Date.now();
	var seconds=0;
	var stX =0;
	var stY =0;
	var mpos=-1;
	var dn=false;
	var on=false;
	var db;
	var id="";
	var rank="";
	var total="";
	var result="";
	var bShowKey=false;
	var bOn1=false;
	var bOn2=false;
	var menu_mode=0;
	var bview=false;
    function nextcha1() {
	  bShowKey=true;
	  slideIndex=19;
	  showDivs(19);
	};
	function nextcha2() {
	 bShowKey=false;
	 slideIndex=19;
	  showDivs(19);
	};
	function start() {
	  startTime = Date.now();
	};

	function end() {
	 
	  var endTime = Date.now();
	  var timeDiff = endTime - startTime; //in ms
	  // strip the ms
	  timeDiff /= 1000.0;
		console.log("st:"+startTime+" "+"et:"+endTime);
	  // get seconds 
	  seconds = timeDiff.toFixed(2);//Math.round(timeDiff);
	  cDate=new Date().toLocaleDateString('ja-jp', { hour:"numeric",minute:"numeric", year:"numeric", month:"short", day:"numeric"}) ;
	  console.log(seconds + " seconds");
	 /////
		const xhr = new XMLHttpRequest();
		const url = "dbutil.php";
		const params = "score="+Math.round(seconds); // Example POST data
		xhr.open("POST", url, true);

		// Set headers if needed
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function () {
		  if (xhr.readyState == 4 && xhr.status == 200) {
			//console.log(xhr.responseText); // Response from PHP script
			result=xhr.responseText;
		  }
	};

			xhr.send(params);
	 //////
	}
	const a1 = document.getElementById('a1');
	const b1 = document.getElementById('b1');
	a1.addEventListener('mousedown', (event) => {
		a1.src="./haikana_img/sub/pre_on.png"
	});
	b1.addEventListener('mousedown', (event) => {
		b1.src="./haikana_img/sub/chall_on.png"
	});
	a1.addEventListener('mouseup', (event) => {
		a1.src="./haikana_img/sub/pre.png"
		nextcha1();
	});
	b1.addEventListener('mouseup', (event) => {
		b1.src="./haikana_img/sub/chall.png"
		nextcha2();
		
	});
	canvas.addEventListener ( "mouseup" , function(me) {
	mUP(me)}, false );
	canvas.addEventListener ( "mousedown" , function(me) {
	mDown(me)}, false );
	canvas.addEventListener ( "mousemove" , function(me) {
	mOver(me)}, false );
	const video = document.querySelector("#vd");

	video.addEventListener("ended", (event) => {
		var f = document.getElementsByClassName("bottomTxt");
		
	  f[0].style.cssText  = "align-items:center; visibility:visible; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";
	});
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyupHandler, false);
	var videoContainer;
	var r=new Array();
	function back()
	{
		if(slideIndex==5) slideIndex=1;
		else if(slideIndex==22) slideIndex=7;
		else if(slideIndex==11) slideIndex=24;
		else if(slideIndex==19) slideIndex=12;
		else slideIndex--;
		if(slideIndex<1) slideIndex=1;
		showDivs(slideIndex);
		bFinish=false;
	}
	function home()
	{
		slideIndex=1;
		showDivs(slideIndex);
		bFinish=false;
	}
	function down()
	{
		dn=true;
		draw();
		setTimeout(() => {   
			var link = document.createElement('a');
			link.download = 'cert_haikana.png';
			link.href = document.getElementById('myCanvas').toDataURL('image/png')
			link.click();
			
			}, 500 );
		
		//dn=false;
		//draw();
		
	}
	function copy()
	{
		dn=true;
		draw();
		setTimeout(() => {   
			canvas.toBlob(function(blob) { 
			const item = new ClipboardItem({ "image/png": blob });
			navigator.clipboard.write([item]); 
			});
			
			}, 500 );
		
		
		alert("copyed to clipboard");
		//dn=false;
		//draw();
	}
	function setpage(n)
	{
			if(n==0) slideIndex=1;
			if(n==1) slideIndex=5;
			if(n==2) slideIndex=24;
			if(n==3) slideIndex=19;
			
			showDivs(slideIndex);
			bFinish=false;
	}
	function mUP(me)
	{
		stX = me.offsetX ; 
		stY = me.offsetY ; 
		
		/*
		if(slideIndex==20)
		{
			
			stX = me.offsetX ; 
			stY = me.offsetY ; 
			if(stX >= 150 && stX <= 150+300  && stY >= 200 && stY <= 200+235)
			{
				if(menu_mode==1) 
				{
					bShowKey=true;
					slideIndex=19;
					showDivs(19);
				}
				if(menu_mode==3) 
				{
					bShowKey=false;
					slideIndex=19;
					showDivs(19);
				}
				if(menu_mode==5) 
				{
					bShowKey=true;
					slideIndex=19;
					showDivs(19);
				}
					
				console.log("m:"+menu_mode);
			}
			if(stX >= 500 && stX <= 500+300  && stY >= 200 && stY <= 200+235)
			{
				
				if(menu_mode==2) 
				{
					bShowKey=false;
					slideIndex=19;
					showDivs(19);
				}
				if(menu_mode==4) 
				{
					slideIndex=21;
					showDivs(21);
				}
				if(menu_mode==6) 
				{
					bShowKey=false;
					slideIndex=19;
					showDivs(19);
				}
				console.log("m:"+menu_mode);
			}
		}*/
	}
	
	function mDown(me)
	{
		if(slideIndex==20)
		{
			stX = me.offsetX ; 
			stY = me.offsetY ; 
			if(stX >= 150 && stX <= 150+300  && stY >= 200 && stY <= 200+235)
			{
				console.log("b1");
				bOn1=true;
				bOn2=false;
			}
			else bOn1=false;
			if(stX >= 500 && stX <= 500+300  && stY >= 200 && stY <= 200+235)
			{
				console.log("b2");
				bOn1=false;
				bOn2=true;
			}
			else bOn2=false;
		}
			 
	}
		
	
	function mOver(me)
	{
		
	}
	function MyRect (x, y, w, h) {

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.contains = function (x, y) {
			return this.x <= x && x <= this.x + this.width &&
				   this.y <= y && y <= this.y + this.height;
		}

		this.draw = function (ctx) {
			ctx.rect(this.x, this.y, this.width, this.height)
		}
	}
	function undateCanvas(){
    ctx.clearRect(10,70,canvas.width-10,canvas.height-70); // Though not always needed 
                                                     // you may get bad pixels from 
                                                     // previous videos so clear to be
                                                     // safe
    // only draw if loaded and ready
    if(videoContainer !== undefined && videoContainer.ready){ 
        // find the top left of the video on the canvas
        var scale = videoContainer.scale;
        var vidH = videoContainer.video.videoHeight-70;
        var vidW = videoContainer.video.videoWidth-20;
        var top = 70+(canvas.height-70) / 2 - (vidH /2 ) * scale;
        var left = 10+(canvas.width-20) / 2 - (vidW /2 ) * scale;
        // now just draw the video the correct size
        ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
       
        }
		if(!bFinish)
		requestAnimationFrame(undateCanvas);
		else
		{
			fbtn.onload=function(){
						ctx.drawImage (fbtn,200,320,272,54);
						}
						ctx.drawImage (fbtn,200,320,272,54);
		}
	}
	function readyToPlayVideo(event){ // this is a referance to the video
    // the video may not match the canvas size so find a scale to fit
    videoContainer.scale = Math.min(
                         (canvas.width-20) / this.videoWidth, 
                         (canvas.height-70) / this.videoHeight); 
    videoContainer.ready = true;
    // the video can be played so hand it off to the display function
    requestAnimationFrame(undateCanvas);
	}

	function drawScore() {
	  ctx.font = "30px Arial";
	  ctx.fillStyle = "#fff";
	  ctx.fillText((step+1)+"/"+sNumbers.length, 60, 40);
	}
	function beep() { 
		var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

		snd.play(); 

	} 
	var str=[["はは","花束和","ハイカナ","初めて","ハローワーク"],["布武場","ふぉこ","ファイル","ファミリーマート","Facebook"],["部長","ブラウザ","ブロック","ブログ","ブロッコリー"],["ブラウザ","ブランド","ブラインドタッチ","ブラック","ブラジル",]];
	var tempkey="";
	var pre=false;
	var name="";
	function keyDownHandler(e) {
		curkey=e.key;
	}
	function keyupHandler(e) {
		
		if(slideIndex==1)
		{
			if(e.key =="1") slideIndex=5;
			if(e.key =="2") slideIndex=3;
			if(e.key =="3") slideIndex=19;
			
			bFinish=false;
			showDivs(slideIndex);
			return;
		}
		/*if(e.key=="q")
		{
			slideIndex++;
			showDivs(slideIndex);
		}*/
		if(e.keyCode == 13)
		{
			if(slideIndex==21 )
			{
				name=document.getElementById('name').value;
				console.log(name);
				if(name.length>0)
				{
					document.getElementById('name').style.display = "none";
					document.querySelector('.bottom_menu').style.cssText  = "justify-content: right; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";
					var f = document.getElementsByClassName("bottomTxt");
					/*for (i = 0; i < f.length; i++) {
							
							f[i].style.cssText  = "align-items:center; visibility:visible; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";	
						
					}*/
					draw();
				}
			}
		}
		if(e.keyCode == 32)
		{
			console.log(slideIndex);
			if(slideIndex==7)
			{
				slideIndex=22;
				showDivs(slideIndex);
			}
			if(slideIndex==19)
			{
				if(!bStart) 
				{
					bStart=true;
					start();
				}
				return;
			}
			if((slideIndex>1 && slideIndex<11) || slideIndex==12 || slideIndex==13 || slideIndex==14 || slideIndex==17 || slideIndex==23 || slideIndex==24)
			{
				if(slideIndex==24 )
				{
					if(bFinish)
					slideIndex=11;
					else return;
				}
				else if(slideIndex==12)
				{
					slideIndex=19;
				}
				else
				slideIndex++;
			
				showDivs(slideIndex);
			}
			return;
		}
		if(slideIndex==11)
		{
			count=0;
			//curkey=e.key;
			okey=eAry3[step];
			console.log(jpAry3.length+":"+eAry3.length+":"+fAry3.length+":"+e.key);
			let inchar = okey.substr(index, 1);
			console.log(okey+":"+index+":"+inchar+":"+e.key);
			if(e.key==inchar)
			{
				inkey +=inchar;
				
				/*if(jpAry3[step].substr(keystep,1)==fAry3[keystep].substr(index,1))
				{
					
					finishkey +=jpAry3[step].substr(keystep,1);
					intext=finishkey;
					
					keystep++;
				}
				else
				{
					intext=finishkey+fAry3[step].substr(index,1);
					
				}*/
				 var jbSplit = fAry3[step].split('-');
				 intext=jbSplit[index];
				
				if(intext==jpAry3[step])
				{
					index=0;
					keystep=0;
				}
				else console.log(intext+"="+jpAry3[step]);
				/*if(intext==jpAry3[step])
				{
					finishkey="";
					index=0;
					step++;
					inkey="";
					keystep=0;
					
				}
				else*/
				{
					index++;
				}
				
			/*	if(index==0 && step>0)
				{
					
						
						if(step==jpAry3.length)
						{
									slideIndex++;
									showDivs(slideIndex);
									pkey=jpAry3[jpAry3.length-1];
									step=0;
									intext="|";
									inkey="";
									finishkey="";
									setTimeout(function () {
								
									bFinish=true;
									document.getElementById('sub1').innerHTML ="おめでとうございます！";
									document.getElementById('sub2').innerHTML ="haikanaの基本ステップが完了しました。";
									
							}, 2000);
							
						}
						else
						{

							okey=eAry3[step];
							pkey=jpAry3[step];
							intext="|";
							inkey="";
							finishkey="";
						}
						
					
				}*/
			}
			else
			{
				beep();
				
			}
			
		}
	if(slideIndex==15 || slideIndex==16)		
	{
		if(e.keyCode == 27)
		{
			
				intext=tempkey;
				pre=false;
				prepos=-1;
			return;
		}
		okey="fiov";
			let inchar = okey.substr(index, 1);
			//console.log(inchar+":"+e.key);
			
		if(e.key=="k" )
		{
			if(index<4)
			{
				beep();
				return;
			}
			
			if(prepos>=0)
			{
				
				
				
				if(intext=="ブラインドタッチ")
				{
					
					pre=false;
					prepos=-1;
					setTimeout(function () {
						
							bFinish=true;
							/*okey="";
							pkey="";
							intext="";
							inkey="";
							finishkey="";
						
							step=0;
							*/
						slideIndex=17;	
						var f = document.getElementsByClassName("bottomTxt");
		
						f[9].style.cssText  = "align-items:center; visibility:visible; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";	
					}, 1000);
				
				}
				else
				{
					
					beep();
				}
				return;
			}
			else
			{
				prepos=0;
				if(index==4)
				intext=str[index-1][prepos];
			}
			return;
		}
		
		else if(e.key=="i" && prepos>=0)
		{
			if(index<4)
			{
				beep();
				return;
			}
			prepos--;
			if(prepos<0) prepos=0;
			if(index==4)
			intext=str[index-1][prepos];
		   return;
		}
		
		else if(e.key=="m" && prepos>=0)
		{
			if(index<4)
			{
				beep();
				return;
			}
			prepos++;
			if(prepos>4) prepos=4;
			if(index==4)
			intext=str[index-1][prepos];
			return;
		}
		
		
			
			if(e.key==inchar )
			{
				
				pre=true;
				prepos=-1;
				if(index==0)
				{
					intext="は";
					tempkey="は";
				}
				if(index==1)
				{
					intext="ふ";
					tempkey="ふ";
				}
				if(index==2)
				{
					intext="ぶ";
					tempkey="ぶ";
				}
				if(index==3)
				{
					intext="ぶら";
					tempkey="ぶら";
					slideIndex=16;
				}
				inkey +=inchar;
				
				index++;
				
				return;
				
			}
			else
			{
				console.log("beep");
				beep();
			}
			
		
		}
		if(slideIndex==19)
		{
			if(!bStart) 
			{
				console.log("bStart="+bStart);
				return;
			}
			curkey=e.key;
			
			okey=eAry4[sNumbers[step]-1];
			
			console.log("okey="+okey+" :"+index +" "+eAry4[sNumbers[step+1]]+" "+sNumbers[step+1]);
				
			if(index>=okey.length) index=0;
			let inchar = okey.substr(index, 1);
			console.log("okey_i+:"+index+":"+inchar+":"+e.key);
			if(inchar=="" || index>=okey.length) 
			{
				step++;
						
				index=0;
				intext="|";
				finishkey="";
				inkey="";
				keystep=0;
				return;
			}
			
			if(e.key==inchar)
			{
				inkey +=inchar;
				 var jbSplit = fAry4[sNumbers[step]-1].split('-');
				 intext=jbSplit[index];
				/*
				if(jpAry4[step].substr(keystep,1)==fAry4[step].substr(index,1))
				{
					
					finishkey +=jpAry4[step].substr(keystep,1);
					intext=finishkey;
					
					keystep++;
					
				}
				else
				{
					intext=finishkey+fAry4[step].substr(index,1);
					
				}*/
				
				
				if(intext==jpAry4[sNumbers[step]-1] || index >=okey.length-1)
				{
						step++;
						
						index=0;
						
						inkey="";
						keystep=0;
						
						score +=Math.floor((300-pos)/10);
						hratio =(hratio+ (score*100)/25)/2;
						pos=25.0;
					
				}
				else
				{
						index++;
				}
				
				
				if(index==0 && step>0)
				{
					setTimeout(function () {
						
							
							okey=eAry4[sNumbers[step]-1];
							pkey=jpAry4[sNumbers[step]-1];
							intext="|";
							inkey="";
							finishkey="";
							keystep=0;
						if(step==sNumbers.length)
						{
							bFinish=true;
							step=0;
							slideIndex++;
							showDivs(slideIndex);
							end();
							
						}
						
					}, 500);
				}
			}
			else
			{
				beep();
			}
		}
		if(slideIndex==22 )
		{
			hammer.play();
			curkey=e.key;
			bmiss=false;
			
			
			//let inchar = gAry[gNumbers[step]-1] ;
			
			
		
			console.log(step+":"+prekey+":"+index+":"+":"+e.key);
			
			
			if(e.key==prekey)
			{
				
				bhit=true;
				console.log(step);
				if( step>=0)
				{	
			
					setTimeout(function () {
						
							step++;
							hit++;
							
							hfcnt=0;
							pfcnt=0;
							panicnt=0;
						
						if(step==gNumbers.length)
						{
							/*setTimeout(function () {
							
							bFinish=true;
							
							slideIndex++;
							showDivs(slideIndex);
							},2000);
							*/
						}
						else
						{
							
							
							console.log(prekey+":"+okey+":"+index+":"+":"+e.key);
				
							pong.play();	
							prekey=gAry[gNumbers[step]-1] ;
							if(prekey==oldkey)
							{
								prekey=gAry[0];
							}
							oldkey=prekey;
						}
						
					}, 500);
				}
			}
			else
			{
				
				bmiss=true;
				console.log("miss");
				miss++;
				//beep();
				//step++;
				//prekey=gAry[gNumbers[step]-1] ;
			}
		
	}
	
		
	
	}
	function drawhit(id)
	{
		
		var x,y;
		var w=65;
		var h=65;
		var wd=65;
		var hd=67;
		var yp=196;
		var wd2=65;
		var wd3=65; 
		switch(id)
		{
			case "w": 
			btn.src="./buttons/W.png";
			x=204; y=yp;
			break;
			case "e":
			btn.src="./buttons/E.png";
			x=204+(wd); y=yp;
			break;
			case "r":
			btn.src="./buttons/R.png";
			x=204+(wd*2); y=yp;
			break;
			case "t":
			btn.src="./buttons/T.png";
			x=204+(wd*3); y=yp;
			break;
			case "y":
			btn.src="./buttons/Y.png";
			x=204+(wd*4); y=yp;
			break;
			case "u":
			btn.src="./buttons/U.png";
			x=204+(wd*5); y=yp;
			break;
			case "a":
			btn.src="./buttons/A.png";
			x=220-wd3; y=yp+(hd);
			break;
			case "s":
			btn.src="./buttons/S.png";
			x=220; y=yp+(hd);
			break;
			case "d":
			btn.src="./buttons/D.png";
			x=220+wd3; y=yp+(hd);
			break;
			case "f":
			btn.src="./buttons/F.png";
			x=220+(wd3*2); y=yp+(hd);
			break;
			case "g":
			btn.src="./buttons/G.png";
			x=220+(wd3*3); y=yp+(hd);
			break;
			case "h":
			btn.src="./buttons/H.png";
			x=220+(wd3*4); y=yp+(hd);
			break;
			case "z":
			btn.src="./buttons/Z.png";
			x=248-wd; y=yp+(hd*2);
			break;
			case "x":
			btn.src="./buttons/X.png";
			x=248; y=yp+(hd*2);
			break;
			case "c":
			btn.src="./buttons/C.png";
			x=248+(wd2); y=yp+(hd*2);
			break;
			case "v":
			btn.src="./buttons/V.png";
			x=248+(wd2*2); y=yp+(hd*2);
			break;
			case "b":
			btn.src="./buttons/B.png";
			x=248+(wd2*3); y=yp+(hd*2);
			break;
			case "n":
			btn.src="./buttons/N.png";
			x=248+(wd*4); y=yp+(hd*2);
			break;
			case "i":
			btn.src="./buttons/I.png";
			x=204+(wd*6); y=yp;
			break;
			case "u":
			btn.src="./buttons/U.png";
			x=204+(wd*5); y=yp;
			break;
			case "p":
			btn.src="./buttons/P.png";
			x=204+(wd*8); y=yp;
			break;
			case "j":
			btn.src="./buttons/J.png";
			x=220+(wd3*5); y=yp+(hd);
			break;
			case "k":
			btn.src="./buttons/K.png";
			x=220+(wd3*6); y=yp+(hd);
			break;
			case "l":
			btn.src="./buttons/L.png";
			x=220+(wd3*7); y=yp+(hd);
			break;
			case "m":
			btn.src="./buttons/M.png";
			x=248+(wd2*5); y=yp+(hd*2);
			break;
		}
		
		btn.onload=function(){
				ctx.drawImage (btn,x,y,w,h);
		}
		ctx.drawImage (btn,x,y,w,h);
	}
	function drawhit2(id)
	{
		
		var x,y;
		var w=65;
		var h=65;
		var wd=56;
		var hd=56;
		var yp=305;
		var wd2=56;
		var wd3=56; 
		switch(id)
		{
			case "w": 
			btn.src="./buttons/W.png";
			x=228; y=yp;
			break;
			case "e":
			btn.src="./buttons/E.png";
			x=228+(wd); y=yp;
			break;
			case "r":
			btn.src="./buttons/R.png";
			x=228+(wd*2); y=yp;
			break;
			case "t":
			btn.src="./buttons/T.png";
			x=228+(wd*3); y=yp;
			break;
			case "y":
			btn.src="./buttons/Y.png";
			x=228+(wd*4); y=yp;
			break;
			case "u":
			btn.src="./buttons/U.png";
			x=228+(wd*5); y=yp;
			break;
			case "a":
			btn.src="./buttons/A.png";
			x=242-wd3; y=yp+(hd);
			break;
			case "s":
			btn.src="./buttons/S.png";
			x=242; y=yp+(hd);
			break;
			case "d":
			btn.src="./buttons/D.png";
			x=242+wd3; y=yp+(hd);
			break;
			case "f":
			btn.src="./buttons/F.png";
			x=242+(wd3*2); y=yp+(hd);
			break;
			case "g":
			btn.src="./buttons/G.png";
			x=242+(wd3*3); y=yp+(hd);
			break;
			case "h":
			btn.src="./buttons/H.png";
			x=242+(wd3*4); y=yp+(hd);
			break;
			case "z":
			btn.src="./buttons/Z.png";
			x=266-wd; y=yp+(hd*2);
			break;
			case "x":
			btn.src="./buttons/X.png";
			x=266; y=yp+(hd*2);
			break;
			case "c":
			btn.src="./buttons/C.png";
			x=266+(wd2); y=yp+(hd*2);
			break;
			case "v":
			btn.src="./buttons/V.png";
			x=266+(wd2*2); y=yp+(hd*2);
			break;
			case "b":
			btn.src="./buttons/B.png";
			x=266+(wd2*3); y=yp+(hd*2);
			break;
			case "n":
			btn.src="./buttons/N.png";
			x=266+(wd*4); y=yp+(hd*2);
			break;
			case "i":
			btn.src="./buttons/I.png";
			x=228+(wd*6); y=yp;
			break;
			case "u":
			btn.src="./buttons/U.png";
			x=228+(wd*5); y=yp;
			break;
			case "p":
			btn.src="./buttons/P.png";
			x=228+(wd*8); y=yp;
			break;
			case "j":
			btn.src="./buttons/J.png";
			x=242+(wd3*5); y=yp+(hd);
			break;
			case "k":
			btn.src="./buttons/K.png";
			x=242+(wd3*6); y=yp+(hd);
			break;
			case "l":
			btn.src="./buttons/L.png";
			x=242+(wd3*7); y=yp+(hd);
			break;
			case "m":
			btn.src="./buttons/M.png";
			x=266+(wd2*5); y=yp+(hd*2);
			break;
		}
		
		btn.onload=function(){
				ctx.drawImage (btn,x,y,w,h);
		}
		ctx.drawImage (btn,x,y,w,h);
	}
	function drawhit3(id,index)
	{
		
		var x,y;
		var w=60;
		var h=60;
		var wd=70;
		var hd=70;
		var yp=192;
		var wd2=56;
		var wd3=56; 
		var x1=183;
		var x2=200;
		var x3=230;
		var d=3;
		switch(id)
		{
			case "w": 
			//btn.src="./haikana_img/ichi/w.png";
			x=x1; y=yp;
			break;
			case "e":
			//btn.src="./haikana_img/ichi/e.png";
			x=x1+(wd); y=yp;
			break;
			case "r":
			//btn.src="./haikana_img/ichi/r.png";
			x=x1+(wd*2); y=yp;
			break;
			case "t":
			//btn.src="./haikana_img/ichi/t.png";
			x=x1+(wd*3); y=yp;
			break;
			case "y":
			//btn.src="./haikana_img/ichi/y.png";
			x=x1+(wd*4); y=yp;
			break;
			case "u":
			//btn.src="./haikana_img/ichi/u.png";
			x=x1+(wd*5); y=yp;
			break;
			case "a":
			//btn.src="./haikana_img/ichi/a.png";
			x=x2-wd; y=yp+(hd);
			break;
			case "s":
			//btn.src="./haikana_img/ichi/s.png";
			x=x2; y=yp+(hd);
			break;
			case "d":
			//btn.src="./haikana_img/ichi/d.png";
			x=x2+wd; y=yp+(hd);
			break;
			case "f":
			//btn.src="./haikana_img/ichi/f.png";
			x=x2+(wd*2); y=yp+(hd);
			break;
			case "g":
			//btn.src="./haikana_img/ichi/g.png";
			x=x2+(wd*3); y=yp+(hd);
			break;
			case "h":
			//btn.src="./haikana_img/ichi/h.png";
			x=x2+(wd*4); y=yp+(hd);
			break;
			case "z":
			//btn.src="./haikana_img/ichi/z.png";
			x=x3-wd; y=yp+(hd*2)+d;
			break;
			case "x":
			//btn.src="./haikana_img/ichi/x.png";
			x=x3; y=yp+(hd*2)+d;
			break;
			case "c":
			//btn.src="./haikana_img/ichi/c.png";
			x=x3+(wd); y=yp+(hd*2)+d;
			break;
			case "v":
			//btn.src="./haikana_img/ichi/v.png";
			x=x3+(wd*2); y=yp+(hd*2)+d;
			break;
			case "b":
			//btn.src="./haikana_img/ichi/b.png";
			x=x3+(wd*3); y=yp+(hd*2);
			break;
			case "n":
			//btn.src="./haikana_img/ichi/n.png";
			x=x3+(wd*4); y=yp+(hd*2)+d;
			break;
			case "i":
			//btn.src="./haikana_img/ichi/i.png";
			x=x1+(wd*6); y=yp;
			break;
			case "o":
			//btn.src="./haikana_img/ichi/o.png";
			x=x1+(wd*7); y=yp;
			break;
			case "p":
			//btn.src="./haikana_img/ichi/p.png";
			x=x1+(wd*8); y=yp;
			break;
			case "j":
			//btn.src="./haikana_img/ichi/j.png";
			x=x2+(wd*5); y=yp+(hd);
			break;
			case "k":
			//btn.src="./haikana_img/ichi/k.png";
			x=x2+(wd*6); y=yp+(hd);
			break;
			case "l":
			//btn.src="./haikana_img/ichi/l.png";
			x=x2+(wd*7); y=yp+(hd);
			break;
			case "m":
			//btn.src="./haikana_img/ichi/m.png";
			x=x3+(wd*5); y=yp+(hd*2)+d;
			break;
		}
		
		/*btn_images[index].onload=function(){
			ctx.drawImage (btn,x,y,w,h);
		}*/
		image=new Image();
    
		image= btn_images[index];
		ctx.drawImage (image,x,y,w,h);
	}
	var count=0;
	var mi_count=0;
	var panicnt=0;
	var pfcnt=0;
	var hanicnt=0;
	var hfcnt=0;
	function drawprekey(id)
	{
		
		var x,y;
		var w=65;
		var h=65;
		var wd=70;
		var hd=70;
		var yp=220;
		var wd2=56;
		var wd3=56; 

		switch(id)
		{
			case "q": 
			
			x=175-wd; y=yp;
			break;
			case "w": 
			
			x=175; y=yp;
			break;
			case "e":
			
			x=175+(wd); y=yp;
			break;
			case "r":
			
			x=175+(wd*2); y=yp;
			break;
			case "t":
			
			x=175+(wd*3); y=yp;
			break;
			case "y":
			
			x=175+(wd*4); y=yp;
			break;
			case "u":
			
			x=175+(wd*5); y=yp;
			break;
			case "a":
			
			x=190-wd; y=yp+(hd);
			break;
			case "s":
			
			x=190; y=yp+(hd);
			break;
			case "d":
			
			x=190+wd; y=yp+(hd);
			break;
			case "f":
			
			x=190+(wd*2); y=yp+(hd);
			break;
			case "g":
			
			x=190+(wd*3); y=yp+(hd);
			break;
			case "h":
			
			x=190+(wd*4); y=yp+(hd);
			break;
			case "z":
			
			x=222-wd; y=yp+(hd*2)+2;
			break;
			case "x":
			
			x=222; y=yp+(hd*2)+2;
			break;
			case "c":
			
			x=222+(wd); y=yp+(hd*2)+2;
			break;
			case "v":
			
			x=222+(wd*2); y=yp+(hd*2)+2;
			break;
			case "b":
			
			x=222+(wd*3); y=yp+(hd*2)+2;
			break;
			case "n":
			
			x=222+(wd*4); y=yp+(hd*2)+2;
			break;
			case "i":
			
			x=175+(wd*6); y=yp;
			break;
			case "o":
			
			x=175+(wd*7); y=yp;
			break;
			case "p":
			
			x=175+(wd*8); y=yp;
			break;
			case "j":
			
			x=190+(wd*5); y=yp+(hd);
			break;
			case "k":
			
			x=190+(wd*6); y=yp+(hd);
			break;
			case "l":
			
			x=190+(wd*7); y=yp+(hd);
			break;
			case "m":
			
			x=222+(wd*5); y=yp+(hd*2)+2;
			break;
			default:
			return;			
		}
		
			
		if(panicnt>5)
		{
			panicnt=0;
			pfcnt++;
		}
							if(pfcnt>=up_imageUrls.length) 
							{
								if(!bStart)
								{
									pfcnt=0;
								}
								else
								{
									
									
									if(pfcnt-up_imageUrls.length>=dn_imageUrls.length)
									{
										bmiss=false;
										curkey="";
										if(step==gNumbers.length)
										{
											setTimeout(function () {
											
											bFinish=true;
											
											slideIndex++;
											showDivs(slideIndex);
											},2000);
											
										}
										else
										{
											
											pfcnt=0;
											step++;
											pong.play();
											
											prekey=gAry[gNumbers[step]-1];
											if(prekey==oldkey)
											{
												prekey=gAry[0];
											}
											oldkey=prekey;
											return;
										}
									}
									
									
									drawgif( 1, pfcnt-up_imageUrls.length, x, y);
								}
							
							}
							else
							{
								if(!bStart)
								{
									drawgif( 0, pfcnt, 720, 360);
								}
								else
								{
									
									drawgif( 0, pfcnt, x, y);
								}
								
							}
						
	}
	
	function drawhitkey(id)
	{
		
		var x,y;
		var w=65;
		var h=65;
		var wd=70;
		var hd=70;
		var yp=220;
		var wd2=56;
		var wd3=56; 

		switch(id)
		{
			case "q": 
			
			x=175-wd; y=yp;
			break;
			case "w": 
			
			x=175; y=yp;
			break;
			case "e":
			
			x=175+(wd); y=yp;
			break;
			case "r":
			
			x=175+(wd*2); y=yp;
			break;
			case "t":
			
			x=175+(wd*3); y=yp;
			break;
			case "y":
			
			x=175+(wd*4); y=yp;
			break;
			case "u":
			
			x=175+(wd*5); y=yp;
			break;
			case "a":
			
			x=190-wd; y=yp+(hd);
			break;
			case "s":
			
			x=190; y=yp+(hd);
			break;
			case "d":
			
			x=190+wd; y=yp+(hd);
			break;
			case "f":
			
			x=190+(wd*2); y=yp+(hd);
			break;
			case "g":
			
			x=190+(wd*3); y=yp+(hd);
			break;
			case "h":
			
			x=190+(wd*4); y=yp+(hd);
			break;
			case "z":
			
			x=222-wd; y=yp+(hd*2)+2;
			break;
			case "x":
			
			x=222; y=yp+(hd*2)+2;
			break;
			case "c":
			
			x=222+(wd); y=yp+(hd*2)+2;
			break;
			case "v":
			
			x=222+(wd*2); y=yp+(hd*2)+2;
			break;
			case "b":
			
			x=222+(wd*3); y=yp+(hd*2)+2;
			break;
			case "n":
			
			x=222+(wd*4); y=yp+(hd*2)+2;
			break;
			case "i":
			
			x=175+(wd*6); y=yp;
			break;
			case "o":
			
			x=175+(wd*7); y=yp;
			break;
			case "p":
			
			x=175+(wd*8); y=yp;
			break;
			case "j":
			
			x=190+(wd*5); y=yp+(hd);
			break;
			case "k":
			
			x=190+(wd*6); y=yp+(hd);
			break;
			case "l":
			
			x=190+(wd*7); y=yp+(hd);
			break;
			case "m":
			
			x=222+(wd*5); y=yp+(hd*2)+2;
			break;
		}
		
			
			if(hanicnt>5)
			{
				hanicnt=0;
				hfcnt++;

			}
			if(prekey==curkey)
			{
				
				bmiss=false;
				if(hfcnt>=hit_imageUrls.length)
				{
					curkey="";
					if(step==gNumbers.length)
					{
						setTimeout(function () {
						
						bFinish=true;
						
						slideIndex++;
						showDivs(slideIndex);
						},2000);
						
					}
					else
					{
					curkey="";
					bhit=false;
					hfcnt=0;
					pfcnt=0;
					panicnt=0;
					hanicnt=0;
					
					}
					
				}
				drawgif( 2, hfcnt, x+7, y-15);
			}
			else 
			{
				bhit=false;
				console.log("nohit");
				if(hfcnt>=nohit_imageUrls.length) 
				{
					curkey="";
					
					hfcnt=0;
					
					hanicnt=0;
					bmiss=false;
				}
				drawgif( 3, hfcnt, x, y);
			}
	}
	function blink()
	{
		setTimeout(function () {
			if(slideIndex==11 || slideIndex==15 || slideIndex==16 || slideIndex==17 || slideIndex>=19) 
			{	
				if(slideIndex==21)
				{
					document.getElementById("name").focus();
				}
				else
				{
					document.getElementById("pass").focus();
				}
						
						
			}
			blink();
					}, 1000);
		/*
						var f = document.getElementsByClassName("bottomTxt");
		
		
							setTimeout(function () {
						for (i = 0; i < f.length; i++) {
							if((slideIndex>0 && slideIndex<11) || slideIndex==12 || slideIndex==13 || slideIndex==14 || slideIndex==17 || slideIndex==20)
							{
								//f[i].style.visibility = "visible";
								f[i].style.cssText  = "align-items:center; visibility:visible; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";
							}
							
						}
						document.getElementById("pass").focus();
						setTimeout(function () {
						for (i = 0; i < f.length; i++) {
						//f[i].style.visibility = "hidden";
							f[i].style.cssText  = "align-items:center; visibility:hidden; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";
						}
						blink();
						
							}, 500);
							}, 500);
							*/
		
	}
	function draw() {
		bDraw=true;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		//context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		//console.log(canvas.width+":"+canvas.height);
		//ctx.fillStyle = "white";
		//ctx.fillRect(0," 0, ctx.canvas.width, ctx.canvas.height);
		
		switch(slideIndex)
		{
			
			
			case 11:
			
				ctx.fillStyle="black";
				ctx.font = "25px Arial";
				
				ctx.fillText("キーボードを見ずに入力してみてください。", 200, 60); 
				ctx.font = "30px Arial";
				
				ctx.fillText("入力 :", 180, 150);
				ctx.font = "50px Arial";
				ctx.fillText(pkey, 260, 155);
				
				ctx.beginPath();
				ctx.lineWidth = "1";
				ctx.strokeStyle = "black";
				ctx.roundRect(360, 100, 250, 60, [10, 0, 10, 0]);
				ctx.stroke();
				
				img.onload=function(){
				ctx.drawImage (kimg,-60,190,kimg.width*0.8,kimg.height*0.8);
				}
				ctx.drawImage (kimg,-60,190,kimg.width*0.8,kimg.height*0.8);
				
				ctx.font = "50px Arial";
					if(count>20)
					{
						count=0;
						if(intext=="") intext="|";
						else if(intext=="|") intext="";
						curkey="";
						
						if(intext==jpAry3[step])
						{
									
									step++;
									intext="|";
									inkey="";
									finishkey="";
									index=0;
									
									if(step==jpAry3.length)
									{
									slideIndex++;
									showDivs(slideIndex);
									pkey=jpAry3[jpAry3.length-1];
									bFinish=true;
									
									finishkey="";
									index=0;
									step=0;
									inkey="";
									keystep=0;
									intext="";
									
									}
									else
									{
										okey=eAry3[step];
										pkey=jpAry3[step];
									}
									
									
									
							
						}
					}
					
					
					if(intext=="|")
					ctx.fillText(intext, 480, 145);
					else ctx.fillText(intext, 465, 145);
					drawhit(curkey);
				//context.drawImage (ctx.canvas,0,0,canvas.width,canvas.height);
			break;
			
			case 15:
			case 16:	
			case 17:
			if(slideIndex==15)
			{
				ctx.fillStyle="black";
				ctx.font = "25px Arial";
				ctx.fillText("希望する変換候補が表示されたらボックスキー(□)を押してください。", 70, 60); 
				ctx.font = "30px Arial";
				
				
				ctx.fillText("入力 :", 230, 150);
				ctx.font = "40px Arial";
				ctx.fillText("ブラインドタッチ", 330, 150);
			}
			if(slideIndex==16)
			{
				ctx.fillStyle="black";
				ctx.font = "25px Arial";
				ctx.fillText("フリックキーに移動し、確定キーは再びボックスキー（□）です。", 80, 60); 
				ctx.font = "30px Arial";
				
				
				ctx.fillText("入力 :", 230, 150);
				ctx.font = "40px Arial";
				ctx.fillText("ブラインドタッチ", 330, 150);
			}
			if(slideIndex==17)
			{
				ctx.fillStyle="black";
				ctx.font = "25px Arial";
				ctx.fillText("よくやった。", 380, 60); 
				
				
				
				
				ctx.font = "40px Arial";
				ctx.fillText("入力完了！", 360, 150);
			}
				
				
				ctx.beginPath();
				ctx.lineWidth = "1";
				ctx.strokeStyle = "black";
				ctx.roundRect(230, 200, 450, 60, [10, 0, 10, 0]);
				ctx.stroke();
				
				ctx.font = "30px Arial";
				
					
					if(count>20)
					{
						count=0;
						if(intext=="") intext="|";
						else if(intext=="|") intext="";
						
					}
				if(intext=="|")
				ctx.fillText(intext, 464-(intext.length*15), 240);
				else
				ctx.fillText(intext, 454-(intext.length*15), 240);	
				if(index>0 && pre)
				{
					if(index==1)
					predic.src="p1.png";
					if(index==2)
						predic.src="p2.png";
					if(index==3)
						predic.src="p3.png";
					if(index==4)
					predic.src="p4.png";
				
					predic.onload=function(){
					ctx.drawImage (predic,440,250,170,173);
					if(prepos>=0)
					{
						ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
					
						ctx.fillRect(440,250+((170/5)*(prepos)),170, 170/5);
					}
				 }
				 ctx.drawImage (predic,440,250,170,173);
					if(prepos>=0)
					{
						ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
					
						ctx.fillRect(440,250+((170/5)*(prepos)),170, 170/5);
					}
				}
				
				//context.drawImage (ctx.canvas,0,0,canvas.width,canvas.height);
			break;
			
			
			case 19:
				
				ctx.fillStyle = "rgb(226,248,182)";
				ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height); 
					if(bStart)
					{
						pos+=dy;
					
						if(pos>ctx.canvas.height-230)
						{
							pos-=dy;
							/*step++;
							pos=10.0;
							index=0;
							intext="|";
							finishkey="";
							inkey="";
							keystep=0;*/
						}
					}
					if(bShowKey)
					{
						kimg2.onload=function(){
							ctx.drawImage (kimg2,0,0,kimg2.width*0.7,kimg2.height*0.7);
						}
							ctx.drawImage (kimg2,0,0,kimg2.width*0.7,kimg2.height*0.7);
					}
					else
					{
						kimg3.onload=function(){
						ctx.drawImage (kimg3,0,0,kimg3.width*0.7,kimg3.height*0.7);
						}
					
						ctx.drawImage (kimg3,0,0,kimg3.width*0.7,kimg3.height*0.7);
					}
					if(!bStart)
					{
					ctx.font = "25px Arial";
					ctx.fillStyle = "rgb(79,85,67)";
					var textString="画面に表示される文字が下に落ちる前に入力してください。";
					var textWidth = ctx.measureText(textString ).width;
					ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 70);
					 textString="準備ができたらスペースキーを押してください。";
					 textWidth = ctx.measureText(textString ).width;
					ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 100);
					}
					else
					{
						ctx.font = "30px Arial";
						ctx.fillStyle = "black";
						if(jpAry4[sNumbers[step]-1] !=null)
						{
							var textString=jpAry4[sNumbers[step]-1];
							var textWidth = ctx.measureText(textString ).width;
							ctx.fillText(jpAry4[sNumbers[step]-1] , (canvas.width/2) - (textWidth / 2), pos);
						
						}
						ctx.font = "30px Arial";
						ctx.fillStyle = "rgb(79,85,67)";
						if(count>20)
						{
							curkey="";
							count=0;
							if(intext=="") intext="|";
							else if(intext=="|") intext="";
						}
						
						textWidth = ctx.measureText(intext ).width;
						ctx.fillText(intext, (canvas.width/2) - (textWidth / 2), 300);
						
						
						drawScore();
						
						drawhit2(curkey);
						//context.drawImage (ctx.canvas,0,0,300,150);
						//console.log(context.canvas.width);
						setTimeout(function () {
							
								
								
							if(step==sNumbers.length)
							{
								
								okey=eAry4[sNumbers[step]-1];
								pkey=jpAry4[sNumbers[step]-1];
								intext="|";
								inkey="";
								finishkey="";
								keystep=0;
								bFinish=true;
								step=0;
								slideIndex++;

								showDivs(slideIndex);
								
								end();
								
								console.log("res:"+result);
							}
							
						}, 1000);
					}
			break;
			case 20:
			//console.log("skey:"+bShowKey)
			
					var jbSplit = result.split(':');
					id=jbSplit[0]; rank=jbSplit[1]; total=jbSplit[2];
					//console.log("id"+id);
					//console.log("rank"+rank);
					//console.log("total"+total);
					//if(!bShowKey)
					{
						ctx.fillStyle = "rgb(182,227,243)";
						ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);  
				
						ctx.font = "30px Arial";
						ctx.fillStyle = "rgb(100,199,236)";
					}
					/*else
					{
						ctx.fillStyle = "rgb(215, 228, 189)";
						ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);  
				
						ctx.font = "30px Arial";
						ctx.fillStyle = "rgb(79, 98, 40)";
					}*/
					var textString = "おめでとうございます！";
					var textWidth = ctx.measureText(textString ).width;
					ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 210);
					
					 textString = "あなたはブラインドタッチに成功しました。";
					 textWidth = ctx.measureText(textString ).width;
					ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 250);
					
					 textString = "ありがとうございます。";
					 textWidth = ctx.measureText(textString ).width;
					ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 290);
					/*if(bShowKey)
					{
						textString = "よくできました。";
						 textWidth = ctx.measureText(textString ).width;


						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 100);
						
						textString = "慣れたら 『チャレンジ！ 』にも挑戦してみてください！";
						textWidth = ctx.measureText(textString ).width;
						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 140);
						if(bOn1)
						{
							mimg.src = "./haikana_img/sub/1more_on.png" ;
							menu_mode=5;
						}
						else
						{
							mimg.src = "./haikana_img/sub/1more.png" ;
							
						}
						if(bOn2)
						{
							menu_mode=6;
							mimg2.src = "./haikana_img/sub/chall2_on.png" ;
						}
						else
						{
							
							mimg2.src = "./haikana_img/sub/chall2.png" ;
						}
					}
					else
					{
					if((parseInt(seconds)<=150))
					{
						var p=(((parseFloat(rank)+1.0)*100)/parseFloat(total)).toFixed(1);
						 textString = "総等数 :"+ String(parseInt(rank)+1)+"/"+total+"(上位 "+ p+" %)";
						 textWidth = ctx.measureText(textString ).width;


						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 100);
						//ctx.fillText("総等数 :"+ String(parseInt(rank)+1)+"/"+total+"(上位 "+ p+" %)", 250, 230);
						//ctx.font = "20px Arial";
						//ctx.fillStyle = "white";
						textString = "おめでとうございます！";
						textWidth = ctx.measureText(textString ).width;
						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 140);
						if(bOn1)
						{
							mimg.src = "./haikana_img/sub/1more3_on.png" ;
							menu_mode=3;
						}
						else
						{
							mimg.src = "./haikana_img/sub/1more3.png" ;
							
						}
						if(bOn2)
						{
							menu_mode=4;
							mimg2.src = "./haikana_img/sub/cert2_on.png" ;
						}
						else
						{
							
							mimg2.src = "./haikana_img/sub/cert2.png" ;
						}
						
					}
					else
					{
						
						 textString = "惜しい！150秒を超えました。";
						 textWidth = ctx.measureText(textString ).width;


						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 100);
						
						textString = "もう一度挑戦してみてください！";
						textWidth = ctx.measureText(textString ).width;
						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 140);
						if(bOn1)
						{
							mimg.src = "./haikana_img/sub/pre2_on.png" ;
							menu_mode=1;
						}
						else
						{
							mimg.src = "./haikana_img/sub/pre2.png" ;
							
						}
						if(bOn2)
						{
							menu_mode=2;
							mimg2.src = "./haikana_img/sub/1more2_on.png" ;
						}
						else
						{
							
							mimg2.src = "./haikana_img/sub/1more2.png" ;
						}
					}
					}
						
						
					mimg.onload=function(){
						ctx.drawImage (mimg,120,200,mimg.width,mimg.height);
					}
						ctx.drawImage (mimg,120,200,mimg.width,mimg.height);
				
					mimg2.onload=function(){
					ctx.drawImage (mimg2,470,200,mimg2.width,mimg2.height);
					}
				
					ctx.drawImage (mimg2,470,200,mimg2.width,mimg2.height);
					*/
					
			break;
			case 21: 
				//name="aaa";
				var bimg=new Image();
				bimg.src="./haikana_img/sub/cert1.png";
				
				 
				bimg.onload=function(){
					
				ctx.drawImage (bimg,0,0,ctx.canvas.width, ctx.canvas.height);
				
				ctx.font = "17px Arial Black";
				ctx.fillStyle = "white";
				if(name=="")
				{
					
					textString = "お名前を入力してください。 入力した情報は保存されず、すぐに廃棄されます。";
				}
				else
				{
					textString = name +" 様、認定書が発行されました。 コピーまたはダウンロードして友達に自慢しましょう！";
					document.getElementById('name').style.display = "none";
					
					
				}
					textWidth = ctx.measureText(textString ).width;
					if(!dn)
					ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 40);
					
				ctx.font = "17px Arial Black";
				ctx.fillStyle = "black";
				var ser="";
				
				for(var i=0;i<7-id.length;i++)
					ser +="0";
				ser +=id;
				ctx.fillText(ser, 650, 102);
				
				ctx.fillText(seconds, 560-seconds.length*10, 318);
				//ctx.fillText("120", 520, 318);
				ctx.fillText(String(parseInt(rank)+1)+"/"+total, 420, 345);
				//ctx.fillText("20"+"/"+"100", 420, 345);
				var p=(((parseFloat(rank)+1.0)*100)/parseFloat(total)).toFixed(1);
				ctx.fillText(p, 600, 345);
				ctx.fillText(cDate, 410, 390);
				ctx.font = "17px Arial Black";
				ctx.fillStyle = "black";
				 
				ctx.fillText(name, 520, 230);
				ctx.fillText(name, 520, 230);
				}
				//ctx.drawImage (bimg,0,0,ctx.canvas.width, ctx.canvas.height);
			
				
				
				
				
			break;
			case 22:
				
					
					ctx.fillStyle = "rgb(255,255,255)";
					ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height); 
					
					
					
						gimg2.src = "./haikana_img/ichi/game2p.png" ;
						gimg2.onload=function(){
							ctx.drawImage (gimg2,0,190,gimg2.width*0.7,gimg2.height*0.7);
						}
						ctx.drawImage (gimg2,0,190,gimg2.width*0.7,gimg2.height*0.7);
						ctx.font = "25px Arial";
						ctx.fillStyle = "rgb(79,85,67)";
						ctx.fillText("進行 "+(step+1)+"/60" , 100, 70);
						ctx.fillText("的中 "+(hit) , 100, 100);
						ctx.fillText("失手 "+(step-hit) , 100, 130);
						ctx.fillText("―放 "+miss , 100, 160);
						kimg5.onload=function(){
						ctx.drawImage (kimg5,0,0,kimg5.width*0.7,kimg5.height*0.7);
							}
						ctx.drawImage (kimg5,0,0,kimg5.width*0.7,kimg5.height*0.7);
						if(count>50 && count<=100)
						{
							ctx.font = "100px Arial";
						ctx.fillStyle = "rgb(0,0,255)";
						textString="3";
						textWidth = ctx.measureText(textString ).width;
						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 300);
						}
						else if(count>100 && count<=150)
						{
							ctx.font = "100px Arial";
						ctx.fillStyle = "rgb(0,0,255)";
						textString="2";
						textWidth = ctx.measureText(textString ).width;
						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 300);
						}
						else if(count>150 && count<=200)
						{
							
							ctx.font = "100px Arial";
						ctx.fillStyle = "rgb(0,0,255)";
						textString="1";
						textWidth = ctx.measureText(textString ).width;
						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 300);
						}
						else if(count==250 )
						{
							gStart=true;
							
							pong.play();
							prekey=gAry[gNumbers[step]-1];
							console.log("prekey"+prekey);
						}
						if(gStart)
						{
							
							if(step==gNumbers.length)
							{
									
								setTimeout(function () {
				
									prekey="";
									slideIndex=23;
									showDivs(slideIndex);
								
								
								}, 50);
								
								
							}
							else
							{
								if(bmiss)
								{
									drawprekey(prekey);
									drawhitkey(curkey);
								}
								else if(curkey.length>0)
								{
									if(bhit)
									{
										
										drawhitkey(curkey);
										
									}
									else 
									{
										drawprekey(prekey);
									}
								}
								else
								drawprekey(prekey);
							}
						}
						
				
			break;
			case 23:
				
					
					
						
					ctx.font = "25px Arial";
					ctx.fillStyle = "rgb(79,85,67)";
					ctx.fillText("進行 "+(step)+"/60" , 100, 70);
					ctx.fillText("的中 "+(hit) , 100, 100);
					ctx.fillText("失手 "+(step-hit) , 100, 130);
					ctx.fillText("―放 "+miss , 100, 160);
					kimg6.onload=function(){
						ctx.drawImage (kimg6,0,190,kimg6.width*0.7,kimg6.height*0.7);
					}
						ctx.drawImage (kimg6,0,190,kimg6.width*0.7,kimg6.height*0.7);
				
						
					kimg5.onload=function(){
					ctx.drawImage (kimg5,0,0,kimg5.width*0.7,kimg5.height*0.7);
						}
					ctx.drawImage (kimg5,0,0,kimg5.width*0.7,kimg5.height*0.7);
					
						
			break;
			case 24:
					/*jimg.onload=function(){
							ctx.drawImage (jimg,0,180,jimg.width*0.7,jimg.height*0.7);
							
						}*/
						 ctx.drawImage (jimg,0,180,jimg.width*0.7,jimg.height*0.7);
						ctx.font = "30px Arial";
						ctx.fillStyle = "rgb(0,0,0)";
						if(step<11)
						textString="PCフリックはPC版フリックキーボードです。";
						else if(step >=11) 
						textString="最後に、濁音キーと小文字キー、";
						
						textWidth = ctx.measureText(textString ).width;
						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 50);
						
						if(step<11)
						{
							
						textString="スマートフォンと同じキーの並びをチェックしてね。";
						}
						else if(step >=11)
						textString="それと変えるキーの位置もチェックしてね。 ";
						
						textWidth = ctx.measureText(textString ).width;
						ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), 100);
						
							if(count>50 )
							{
								if(step==0 || step==10 || step==11)
								{
									if(count>150 )
									{
										step++;
										count=0;
									}
								}
								else 
								{
									step++;
									count=0;
								}
								
								if(step==19) step=18;
								console.log(step);
								
							}
							
							for(var i=0;i<step;i++)
							{
								if(i==10)
								drawhit3(fkey[i-1],i-1);
								else if(i==11)
								drawhit3(fkey[i-2],i-2);
								else if(i>11)
								drawhit3(fkey[i-2],i-2);
								else drawhit3(fkey[i],i);
							}
						
							
							if(step==18)
								{
									bFinish=true;
									var f = document.getElementsByClassName("bottomTxt");
									for (i = 0; i < f.length; i++) {
										
											f[i].style.cssText  = "align-items:center; visibility:visible; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";	
										
										
									}
								}
							
							
					
			break;
		}
		
		/*if(slideIndex==11   )
		{
			setTimeout(() => {   
			
			requestAnimationFrame(draw);
			}, 500 );
		}*/
		if(slideIndex==11 || slideIndex==15 || slideIndex==16  || slideIndex==17 ||slideIndex==19 || slideIndex==20 || slideIndex==22 || slideIndex==24)
		{
			count++;
			panicnt++;
			hanicnt++;
			requestAnimationFrame(draw);
			
		}
		
	}
	

function plusDivs(n) {
  showDivs(slideIndex += n);
  if(slideIndex>20) slideIndex=20;
}

function showDivs(n) {
	var i;
	console.log(n);
	intext="|";
	inkey="";
	finishkey="";
	keystep=0;
	index=0;
	bFinish=false;
	bOn1=false;
	bOn2=false;
	if(n !=23) step=0;
	if(n==11)
	{
		step=0;
		okey=eAry3[0];
		pkey=jpAry3[0];
	}
	if(n==19)
	{
		
		sNumbers = pickRandomNumbers(totalNumbers, cnt);
		pkey=jpAry4[sNumbers[0]];
		okey=eAry4[sNumbers[0]];
	}
	if(n==22)
	{
		bStart=true;
		gStart=false;
		kimg4.src = "./sub/game1p.png" ;
		miss=0;
		hit=0;
		step=0;
		count=0;
		gNumbers = pickRandomNumbers(160, 60);
		draw();
	}
	
	pos=0;
	
	
  $('#vd').get(0).pause();
  
	
  var x = document.getElementsByClassName("swiper-slide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
	
  }
  if( n==15 || n==16 || n==17 || n>=19 || n==22 || n==23 || n==24) 
  {
	  if(n==19)
	  {
		  bStart=false;
		 
	  }
	  bview=false;
	 count=0;
	  x[10].style.display = "block";
  }
  else
  {
	x[slideIndex-1].style.display = "block";
  }
   if(slideIndex==1) 
  {
	 document.getElementById('stitle').innerHTML ="ホーム";
	
	 bFinish=false;
  }
  
	else if((slideIndex>=5 && slideIndex<=7) || slideIndex==22 || slideIndex==23) 
	 document.getElementById('stitle').innerHTML ="1. まずはキーボードモグラゲーム！";

	else if(slideIndex==24 || (slideIndex>=7 && slideIndex<=12)) 
	 document.getElementById('stitle').innerHTML ="2. PCフリックを学ぶ";

	else if(slideIndex>=18 ) 
	 document.getElementById('stitle').innerHTML ="3. チャレンジ！ブラインドタッチ~！";

	

	document.querySelector('.bottom_menu').style.cssText  = 'display: none;';
	
	if(slideIndex==11 || slideIndex==15 || slideIndex==16 || slideIndex==17 || slideIndex>=18) 
	  {
		 document.getElementById('game').style.display = "none";
		 
		document.getElementById('name').style.display = "none";
	  }
	  
	  else
	  {
		  document.getElementById('game').style.display = "block";
	  }
	  if(n==21)
		document.getElementById('name').style.display = "block";
	else 
		document.getElementById('name').style.display = "none";
		
	var f = document.getElementsByClassName("bottomTxt");
	for (i = 0; i < f.length; i++) {
		if((slideIndex>0 && slideIndex<11) || slideIndex==12 || slideIndex==13 || slideIndex==14 || slideIndex==17 || slideIndex==23  )
		{
			//f[i].style.visibility = "visible";
			if(slideIndex ==2)
			f[i].style.cssText  = "align-items:center; visibility:hidden; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";
			else
			f[i].style.cssText  = "align-items:center; visibility:visible; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";	
		}
		else
		{
			f[i].style.cssText  = "align-items:center; visibility:hidden; justify-content: center; display: block; display: flex;flex-direction: row; align-items: right;width:100%;	height:auto;-ms-flex-align: center;   -webkit-align-items: center;";
		}
		
	}
	bDraw=false;
	setTimeout(() => {   
			//$('#vd').get(0).pause();
			//$('#vd').get(0).currentTime = 0;
			if(!bDraw)
			draw();
			}, 200 );
	
}


blink();	
showDivs(slideIndex);