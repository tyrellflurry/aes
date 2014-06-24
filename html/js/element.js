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
		removeSlideshow();
		$('<div/>').attr({
				'id':'slideshow'
			}).appendTo('#pagecontent');
		$('<div/>').attr({
			'id': 'description',
		}).fadeIn(timeMilli).load('pages/home/slideshow'+incr+'.html').appendTo('#slideshow');
		if(incr == 5){
			incr = 1;
		}else{
			incr++;
		}
		if(!stopLoop){
			setTimeout(slideLoop, timeMilli*2);
		}else{
			removeSlideshow();
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
		/*$('<div/>').attr({
			'id':'info-one'
		}).load('pages/mission.html').appendTo('#infocontainer');
		$('<div/>').attr({
			'id':'info-two'
		}).load('pages/partners.html').appendTo('#infocontainer');*/
	}
	
	
	/*
	 * Description:	Remove the specified elements from DOM
	 * 
	 * Parameters: N/A
	 */
	function removeSlideshow(){
		$('#slideshow').remove();
		$('#description').remove();
	    
	}
	/*
	 * Description:	Remove all elements from DOM
	 * 
	 * Parameters: N/A
	 */
	function removeAllElements(){
		$('#rightcontainer').remove();
		$('#leftcontainer').remove();
		$('#bottomcontainer').remove();
		$("#content").remove();
		$('#solutionsnavigation').remove();
		$('#subcontent').remove();
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
		removeSlideshow();
		removeAllElements();
		$('#wrapper').css({
						'min-width':'',
						});
		$("#maincontainer").css({
			'background-color': 'rgba(255, 255, 255,0.5)',
			'width': '700px',
			'height': '700px'
			
			});
		$('#pagecontent').css('height','300px');
		if(hash === 'home'){
			stopLoop = false;
			$("#maincontainer").css({
				'background-color': '',
				'width': '900px',
				'height': '650px'
				});
			$('#pagecontent').css({
					'height':'300px',
					'width': '',
					'width': '500px',
					'height': '',
					'height': '500px'
					});
			$('<div/>').attr({
				'id':'leftcontainer'
			}).load("pages/home/leftcontainer.html").appendTo('#maincontainer');
			$('<div/>').attr({
				'id':'rightcontainer'
			}).load("pages/home/rightcontainer.html").appendTo('#maincontainer');
			slideLoop();
			$('<div/>').attr({
				'id':'bottomcontainer'
			}).load("pages/home/bottomcontainer.html").appendTo('#maincontainer');
			
			//();
		}else{
			//var tempHash = (hash.indexOf("_") >-1) ? hash.substr(0, hash.indexOf("_")): hash;
			stopLoop = true;
			$('#pagecontent').css({
					'width': '',
					'width': '90%',
					'height': '',
					'height': '250px'
					});

			
			
			if(hash ==='solutions'){
				$('#maincontainer').css({
					'height':'',
					'height':'1000px',
						});
				$('#wrapper').css({
					'min-width':'1400px'
				});
				$('#pagecontent').css('height','225px');
				$('<div/>').attr({
					'id' : 'content'
				}).fadeIn(1000).load("pages/"+hash+".html").appendTo('#pagecontent');
				$('<div/>').attr({
					'id':'solutionsnavigation'
				}).fadeIn(1000).load('pages/solutionsnav.html').appendTo('#wrapper');
				
				//setTimeout(function(){
					addSubContent(solutionClicked);
				//},1000);		
				
				setTimeout(addSolutionClick, 1000);
			}else if((subHashIndex = hash.indexOf("_"))> -1){
				document.location.hash = "#aessolutions";
				solutionClicked = hash.substr(subHashIndex+2);
				
			}else{
				
				$('<div/>').attr({
					'id' : 'content'
				}).fadeIn(1000).load("pages/"+hash+".html").appendTo('#pagecontent');
				//setTimeout($('#subcontent').stop(true, false), 1000);
				if(hash === "partners"){
					$('#pagecontent').css('height','1750px');
					$('#maincontainer').css({
						'height':'',
						'height':'1850px'
						});
				}else if(hash === "careers"){
					$('#pagecontent').css('height', '900px');
					$('#maincontainer').css({
						'height':'',
						'height':'900px'
							});
				}else if(hash === "termsofuse"){
					console.log("Terms Of Use");
					$('#pagecontent').css('height','2500px');
					$('#maincontainer').css({
						'height':'',
						'height':'2500px'
						});
				}
				
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
	  setTimeout(function(){
		  $("#"+content).css("color", "#21A9E9");
	  },500);
	 
	 $('#subcontent').remove();
	 $('<div/>').attr({
		'id':'subcontent'
	 }).fadeIn(1000).load('pages/solutions/'+content+'.html').appendTo('#maincontainer');
	 
  }
   
  
  //Default function calls
  getHtml();
  setInterval(checkHash, 1000);	
	
	
	
});