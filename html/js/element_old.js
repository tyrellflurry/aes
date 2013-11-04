$(document).ready(function(){
var hoveredId = "";
var timeMilli = 5000;
var stopLoop = false;
var solutionClicked = "sbi";


//Default hash when site is initially accessed
if(document.location.hash === ""){
	document.location.hash = "aeshome";
}



var hash = document.location.hash.substr(4);
var clickedId = hash;
var prevHash = hash;

var incr = 1;	
	
	/*
	 * Description: Jquery #navbar li hover listerner
	 * detect when navbar element is being hovered over
	 * The first function handles mouseover affect
	 * The second function handles mouseaway affect
	 */
	/*$("#navbar li").hover(
		function (){
			hoveredId= $(this).attr("id");
			$(this).css('background', 'url(images/navbar_hover_'+hoveredId+'.png) no-repeat');
		},
		function(){
			if(hoveredId !== clickedId){
				$(this).css("background", "url(images/navbar_"+hoveredId+".png) no-repeat");
			}else{
				$(this).css("background", "url(images/navbar_clicked_"+hoveredId+".png) no-repeat");
			}
			
	});	*/
	
	
	$("#"+clickedId).css("background", "url(images/navbar_clicked_"+clickedId+".png) no-repeat");
	
	
	/*
	 *Description: Jquery #navbar li click listener
	 *assigns value to hash, stops slide show if applicable and 
	 *call checkHash function
	 */
	$("#navbar li").click(function(){
		clickedId= $(this).attr("id");
		if(clickedId !== "home" || hash !== "home"){
			stopLoop = true;
			document.location.hash = "aes"+clickedId;
			checkHash();
		}
	});
	


	
	/*
	 * Description: Loop through images and descriptions on home page
	 * 
	 * Parameters: N/A
	 */
	function slideLoop(){
		$('#translucent').remove();
		$('<div/>').attr({
				'id':'translucent'
			}).appendTo('#pagecontent');
		$('<div/>').attr({
			'id': 'description',
		}).fadeIn(timeMilli).load('dynamic/slideshow'+incr+'.html').appendTo('#translucent');
		if(incr == 5){
			incr = 1;
		}else{
			incr++;
		}
		if(!stopLoop){
			setTimeout(slideLoop, timeMilli*2);
		}else{
			removeElements();
		}
	}
	
	
	/*
	 * Description:	Creates two panels under #pagecontent on home page
	 * 
	 * Parameters: N/A
	 */
	function bottomPanels(){
		$('<div/>').attr({
			'id':'infocontainer'
		}).appendTo('#maincontainer');
		$('<div/>').attr({
			'id':'info-one'
		}).load('dynamic/mission.html').appendTo('#infocontainer');
		$('<div/>').attr({
			'id':'info-two'
		}).load('dynamic/partners.html').appendTo('#infocontainer');
	}
	
	
	/*
	 * Description:	Remove the specified elements from DOM
	 * 
	 * Parameters: N/A
	 */
	function removeElements(){
		$('#translucent').remove();
		$('#infocontainer').remove();
	    $('#info-one').remove();
	    $('#info-two').remove();
	    
	}
	
	/*
	 * Description: Checks the current hash and calls getHtml function 
	 * based on hash value
	 * 
	 * Parameters: N/A
	 */
	function checkHash(){
     hash = document.location.hash;
     //console.log("IN CHECKHASH");
     if(hash){
    	 var index;
    	 if((index = hash.indexOf("_"))> -1){
    		  //hash = hash.substr(4, index-4);
    		 hash = hash.substr(4);
    	 }else{
    		 hash = hash.substr(4);
    	 }
        
        if(hash === prevHash){
           return;
        }
        console.log("HASH:"+ hash);
        console.log("PREVHASH:"+ prevHash);
        getHtml();
        clickedId = hash;
        prevHash = hash;

     }
   }
	
	/*
	 * Description: Changes navabar button display based on element clicked,
	 * if hash equals home initiate slideshow else remove slideshow elements
	 * and make ajax call (via jquery load) to get clicked information
	 * 
	 * Parameters: N/A
	 */
   function getHtml(){
	   $("#"+prevHash).css("background", "url(images/navbar_"+prevHash+".png) no-repeat");

		$("#"+hash).css("background", "url(images/navbar_clicked_"+hash+".png) no-repeat");
		removeElements();
		$("#content").remove();
		$('#solutionsnavigation').remove();
		$('#subcontent').remove();
		$("#maincontainer").css({
			'background-color': 'rgba(255, 255, 255,0.5)',
			'width': '50%'
			});
		if(hash === 'home'){
			console.log("IN HOME");
			stopLoop = false;
			$("#maincontainer").css({
				'background-color': '',
				'width': '100%'
				});
			$('#pagecontent').css('height','300px');
			slideLoop();
			bottomPanels();
		}else{
			//var tempHash = (hash.indexOf("_") >-1) ? hash.substr(0, hash.indexOf("_")): hash;
			stopLoop = true;
			
			
			if(hash ==='solutions'){
				$('#maincontainer').css({
					'height':'',
					'height':'900px',
						});
				$('#pagecontent').css('height','250px');
				$('<div/>').attr({
					'id' : 'content'
				}).fadeIn(1000).load("dynamic/"+hash+".html").appendTo('#pagecontent');
				$('<div/>').attr({
					'id':'solutionsnavigation'
				}).fadeIn(1000).load('dynamic/solutionsnav.html').appendTo('#wrapper');
				
				setTimeout(function(){
					addSubContent(solutionClicked);
				},1000);		
				
				setTimeout(addSolutionClick, 1000);
			}else if((subHashIndex = hash.indexOf("_"))> -1){
				document.location.hash = "#aessolutions";
				solutionClicked = hash.substr(subHashIndex+2);
				
			}else{
                                $('<div/>').attr({
                                        'id' : 'content'
                                }).fadeIn(1000).load("dynamic/"+hash+".html").appendTo('#pagecontent');
                                $('#maincontainer').css('height','700px');
                                $('#pagecontent').css('height','300px');
			}
		}
		
   }
  
    /*
	 * Description:	Adds solution click listener 
	 * 
	 * Parameters: N/A
	 */
  function addSolutionClick(){
	 $("#solutiontitles li").click(function(){
		if(solutionClicked != null){
			$("#"+solutionClicked).css("color", "#686868");
		}
					
		solutionClicked = $(this).attr("id");
		addSubContent(solutionClicked);
		
	});
 }
 
  	/*
	 * Description:	Loads specific solution information (via jquery load) when
	 * solution left pane options are clicked
	 * 
	 * Parameters: N/A
	 */
  function addSubContent(content){
	 $("#"+content).css("color", "#21A9E9");
	 $('#subcontent').remove();
	 $('<div/>').attr({
		'id':'subcontent'
	 }).fadeIn(1000).load('dynamic/'+content+'.html').appendTo('#maincontainer');
  }
   
  
  //Default function calls
  getHtml();
  setInterval(checkHash, 1000);	
	
	
	
});
