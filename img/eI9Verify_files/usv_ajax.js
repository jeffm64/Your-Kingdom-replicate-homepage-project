// ----------------------------------------------
// |   USV_AJAX.JS                              |
// |                                            |
// |   AUTHOR: C. Bradley                       |
// |   DATE:   February 2008                    |
// ----------------------------------------------
   var helpHttp = false;
   
   // want to review use of this in the future for compatibility
   // var docElement=(document.compatMode=='CSS1Compat')? document.documentElement: document.body;

   if(navigator.appName == "Microsoft Internet Explorer") 
   {
      helpHttp = new ActiveXObject("Microsoft.XMLHTTP");
   } 
   else 
   {    
      helpHttp = new XMLHttpRequest();
   }
  
// I need a second object for pages that make two ajax calls in the onLoad function. One is cancelling the otheer
// when we use the same name.
// mmolloy
// 12.08.2008  
   var secondHttpObject = false;
   
   // want to review use of this in the future for compatibility
   // var docElement=(document.compatMode=='CSS1Compat')? document.documentElement: document.body;

   if(navigator.appName == "Microsoft Internet Explorer") 
   {
      secondHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
   } 
   else 
   {    
      secondHttpObject = new XMLHttpRequest();
   }
  
   
   // -----------------------------------------
   // |   popup                               |
   // |   *Displays the background "blanket"  |
   // |    and rounded popup box frame        |
   // -----------------------------------------    
   
   function toggle(div_id)
   {
	var el = document.getElementById(div_id);
        if(el != null)
        {
            if ( el.style.display == 'none' )
            {
                el.style.display = 'block';
            }
            else
            {
                el.style.display = 'none';
            }
        }
   }

	function blanket_size(popUpDivVar) {
		
		if (typeof window.innerWidth != 'undefined') {
			viewportheight = window.innerHeight;
		} else {
			viewportheight = document.documentElement.clientHeight;
		}
		if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
			blanket_height = viewportheight;
		} else {
			if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
				blanket_height = document.body.parentNode.clientHeight;
			} else {
				blanket_height = document.body.parentNode.scrollHeight;
			}
		}
		var blanket = document.getElementById('blanket');
		blanket.style.height = blanket_height + 'px';
		var popUpDiv = document.getElementById(popUpDivVar);
		if(popUpDiv != null)
		{
			
                    if ( popUpDiv.id == 'form_groups_select_div' )
                    {
                        popUpDiv_height = blanket_height/2-400;//300 is half popup's height
                    }
                    else
                    {
                        popUpDiv_height = blanket_height/2-200;//200 is half popup's height
                    }
                    popUpDiv.style.top = popUpDiv_height + 'px';
		}	
	}
	function window_pos(popUpDivVar) {
		if (typeof window.innerWidth != 'undefined') {
			viewportwidth = window.innerHeight;
		} else {
			viewportwidth = document.documentElement.clientHeight;
		}
		if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
			window_width = viewportwidth;
		} else {
			if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
				window_width = document.body.parentNode.clientWidth;
			} else {
				window_width = document.body.parentNode.scrollWidth;
			}
		}
		var popUpDiv = document.getElementById(popUpDivVar);
		if(popUpDiv != null)
                {
                    if ( popUpDiv.id == 'form_groups_select_div' ) {
                        window_width=window_width/2-490;//490 is half popup's width
                    } else {
                        window_width=window_width/2-350;//350 is half popup's width
                    }

                    popUpDiv.style.left = window_width + 'px';
                }
	}

	function popup(windowname) {
		blanket_size(windowname);
		window_pos(windowname);
		toggle('blanket');
		toggle(windowname);		
	}
   
   
   
   
   
   // --------------------------------------
   // |   getHelp                          |
   // |   *Call ajax to handle help screen |
   // |    content  provides access to     |
   // |    div named "help" which MUST be  |
   // |    on the HTML pages               |
   // -------------------------------------- 
   function getHelp(help)
   {
   	// for backward compatibility
   	// just call the new one
      getHelp2(null,help);
          
   } // end getHelp
   
   // --------------------------------------
   // |   getHelp2                         |
   // |   *Call ajax to handle help screen |
   // |    content  provides access to     |
   // |    div named "help" which MUST be  |
   // |    on the HTML pages - this version|
   // |    takes the parent object for div |
   // |    positioning.                    |
   // -------------------------------------- 
   function getHelp2(parent,help)
   {
   	var dStamp = new Date().getMilliseconds();
      
      var url = "hrmgr?p_action=USVAJX&ajaxcall=get_help&help_code="+help+"&id="+dStamp;
      
      popup('help_popup_div');
      
      helpHttp.abort();
      helpHttp.open("GET",url,true);
      
      helpHttp.onreadystatechange = function()
      {
         if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
         {

            document.getElementById('wrapper').innerHTML = helpHttp.responseText;

         }
      };
      
      helpHttp.send(null);
      
   } // end getHelp2

   
   // --------------------------------------
   // |   emailVerificationKey             |
   // -------------------------------------- 
   function emailVerificationKey(email, token, nhqId)
   {
   		var dStamp = new Date().getMilliseconds();

    var url = "hrmgr?p_action=USVAJX&ajaxcall=email_token&p_nhqId="+nhqId+"&id="+dStamp;
    url = url + "&p_token="+token+"&p_email="+email;
    helpHttp.abort();
    helpHttp.open("GET",url,true);
    
    helpHttp.onreadystatechange = function()
    {
       if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
       {
       	// set the default positioning
	    		var div_left = (document.body.scrollWidth-700)/2;
	    		var div_top = document.documentElement.scrollTop+50;

			   // if we have a parent object, locate and set accordingly
	    		if (parent != null)
	    		{
	       		// var placement = findPos(parent);
	       		div_left = (document.body.scrollWidth-700)/2;
	       		// div_top = placement[1];
	       		div_top = document.documentElement.scrollTop+50;
	    		}
       }
    };
    
    helpHttp.send(null);
   } // END emailVerificationKey


   // --------------------------------------
   // |   checkPopupWarning                |
   // -------------------------------------- 
   // Calls ajax to check whether a popup warning should be displayed based on the hire date
   function checkPopupWarning(d)
   {
	   if(d == '')
		   return;
	   
   		var dStamp = new Date().getMilliseconds();
    
    var url = "hrmgr?p_action=USVAJX&ajaxcall=check_days_from_hire_date&p_hire_dt="+d+"&id="+dStamp;
    
    secondHttpObject.abort();
    secondHttpObject.open("POST",url,true);
    
    secondHttpObject.onreadystatechange = function()
    {
       if ((secondHttpObject.readyState == 4) && (secondHttpObject.status == 200))
       {
    	   
    	   document.MAIN.showPopup.value=secondHttpObject.responseText;
    	   
       }
    };
    
    secondHttpObject.send(null);
    
   } // END checkPopupWarning

// --------------------------------------
// |   getPdf                           |
// --------------------------------------
function getPdf(id, version)
{
    var dStamp = new Date().getMilliseconds();

    var url = "hrmgr?p_action=USVAJX&ajaxcall=get_pdf&pdf_id="+id+"&version="+version+"&id="+dStamp;

    popup('pdf_popup_div');

    helpHttp.abort();
    helpHttp.open("GET",url,true);

    helpHttp.onreadystatechange = function()
    {
        if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
        {

            document.getElementById('pdf_wrapper').innerHTML = helpHttp.responseText;

        }
    };

    helpHttp.send(null);

} // end getPdf
// --------------------------------------
// |   getTest                           |
// --------------------------------------
function getTest(id, version)
{
    var dStamp = new Date().getMilliseconds();

    var url = "hrmgr?p_action=USVAJX&ajaxcall=get_test&pdf_id="+id+"&version="+version+"&id="+dStamp;

    popup('pdf_popup_div');

    helpHttp.abort();
    helpHttp.open("GET",url,true);

    helpHttp.onreadystatechange = function()
    {
        if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
        {

            document.getElementById('pdf_wrapper').innerHTML = helpHttp.responseText;

        }
    };

    helpHttp.send(null);

} // end getPdf


function getDHSPdf(id)
   {
   	var dStamp = new Date().getMilliseconds();
      
      var url = "hrmgr?p_action=USVAJX&ajaxcall=get_dhs_detail&dhs_id="+id+"&id="+dStamp;
      
      popup('pdf_popup_div');
      
      helpHttp.abort();
      helpHttp.open("GET",url,true);
      
      helpHttp.onreadystatechange = function()
      {
         if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
         {

            document.getElementById('pdf_wrapper').innerHTML = helpHttp.responseText;

         }
      };
      
      helpHttp.send(null);
      
   } 
   
   function getDocument(id, docCd){
	   var dStamp = new Date().getMilliseconds();
	      
	      var url = "hrmgr?p_action=USVAJX&ajaxcall=get_doc&doc_id="+id+"&doc_cd="+docCd+"&id="+dStamp;
	      
	      popup('pdf_popup_div');
	      
	      helpHttp.abort();
	      helpHttp.open("GET",url,true);
	      
	      helpHttp.onreadystatechange = function()
	      {
	         if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
	         {

	            document.getElementById('pdf_wrapper').innerHTML = helpHttp.responseText;

	         }
	      };
	      
	      helpHttp.send(null);
	   
   }
   
   // --------------------------------------
   // |   getPdf                           |
   // -------------------------------------- 
   function getPdfForFilling(id, version)
   {
   	var dStamp = new Date().getMilliseconds();
      
      var url = "hrmgr?p_action=USVAJX&ajaxcall=get_pdf_for_filling&pdf_id="+id+"&version="+version+"&id="+dStamp;
      
      popup('pdf_popup_div');
      
      helpHttp.abort();
      
      helpHttp.onreadystatechange = function()
      {
         if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
         {

            document.getElementById('pdf_wrapper').innerHTML = helpHttp.responseText;

         }
      };
      
      helpHttp.open("GET",url,true);

      helpHttp.send(null);
      
   } // end getPdf
   
      // --------------------------------------
   // |   getPdf                           |
   // -------------------------------------- 
   function getReport(reportName, format, report_source)
   {
   	var dStamp = new Date().getMilliseconds();
     
      var url = "hrmgr?p_action=USVAJX&ajaxcall=get_report&id="+dStamp+"&report_name="+reportName+"&id="+dStamp;
      if(report_source != null){
    	  url += "&report_source="+report_source;
    	  
      }
      if(format == 'xls'){
    	  url += "&format=xls";
      }
      
      
      
      popup('pdf_popup_div');
      
      helpHttp.abort();
      helpHttp.open("GET",url,true);
      
      helpHttp.onreadystatechange = function()
      {
         if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
         {

            document.getElementById('pdf_wrapper').innerHTML = helpHttp.responseText;

         }
      };
      
      helpHttp.send(null);
      
   } // end getReport
    
   // --------------------------------------
   // |   getDHSAuditHistory               |
   // |   *Call ajax to pull audit hx      |
   // |    for a given dhs_queries.id      |
   // |    Expects a div named dhs on the  |
   // |    page                            |
   // --------------------------------------
   function getDHSAuditHistory(dq_id)
   {
      var dStamp = new Date().getMilliseconds();
      
      var url = "hrmgr?p_action=USVAJX&ajaxcall=dhs_get_case_history&dq_id="+dq_id+"&id="+dStamp;
      
      popup('dhs_popup_div');
      
      helpHttp.abort();
      helpHttp.open("GET",url,true);
      
      helpHttp.onreadystatechange = function()
      {
         if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
         {

            document.getElementById('dhs_wrapper').innerHTML = helpHttp.responseText;

         }
      };
      
      helpHttp.send(null);   
      
   }  // end getDHSAuditHistory

   // --------------------------------------
   // |   getDHSPhoto                      |
   // |   *Call ajax to pull DHS Photo     |
   // |    for a given dhs_queries.id      |
   // |    Expects a div named dhs on the  |
   // |    page                            |
   // --------------------------------------
   function getDHSPhoto(dq_id)
   {
      var dStamp = new Date().getMilliseconds();

      var url = "hrmgr?p_action=USVAJX&ajaxcall=dhs_get_photo&dq_id="+dq_id+"&id="+dStamp;

      popup('dhsphoto_popup_div');
      
      var content = "<h1>DHS Photo Matching</h1>" +
                    "<p> Does the photo below match the photo on the Employment Authorization Document provided by the employee?"+
                    "<br/><br/>Select Yes or No to Continue.&nbsp;&nbsp; **NOTE: If 'No Photo on this Document' appears below, select Yes."+
                    "</p>"+
                    "<hr size=1/>"+
                    "<p align=center><iframe id=\"dhs_img_frame\" src=\""+url+"\" frameborder=\"0\" width=\"278\" height=\"235\">Your browser does not support iframes.</iframe></p>"+
                    "<hr size=1/>"+
//                    "<p>NOTE: If 'No Photo on this Document' appears above, select Yes.</p>"+
                    "<input type=\"button\" class=\"button\" onmouseover=\"this.className='button_on';\" onmouseout=\"this.className='button';\" value=\"Yes\" onClick=\"updDHSQueriesPhoto("+dq_id+",'Y');\"/>"+
                    "<input type=\"button\" class=\"button\" onmouseover=\"this.className='button_on';\" onmouseout=\"this.className='button';\" value=\"No\" onClick=\"updDHSQueriesPhoto("+dq_id+",'N');\"/>";//+
//                    "<span style=\"float:right\"><input type=\"button\" class=\"button\" onmouseover=\"this.className='button_on';\" onmouseout=\"this.className='button';\" value=\"Cancel\" onClick=\"document.getElementById('dhsphoto').style.display='none';\"/></span>";

        document.getElementById('dhsphoto_wrapper').innerHTML = content;
        //document.getElementById('dhsphoto').style.left = (document.body.scrollWidth-700)/2;
        //document.getElementById('dhsphoto').style.display = 'block';
   }  // end getDHSPhoto

   function trim11 (str) {
       str = str.replace(/^\s+/, '');
       for (var i = str.length - 1; i >= 0; i--) {
           if (/\S/.test(str.charAt(i))) {
               str = str.substring(0, i + 1);
               break;
           }
       }
       return str;
    }

   // --------------------------------------
   // |   updDHSQueriesPhoto                      |
   // |   *Call ajax to set the status of the DHS Photo     |
   // --------------------------------------
   function updDHSQueriesPhoto(dq_id, photo_conf)
   {
      var dStamp = new Date().getMilliseconds();

      var url = "hrmgr?p_action=USVAJX&ajaxcall=dhs_set_photo_status&dq_id="+dq_id+"&photo_conf="+photo_conf+"&id="+dStamp;

      helpHttp.abort();
      helpHttp.open("GET",url,true);

      helpHttp.onreadystatechange = function()
      {
         if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
         {
            if (trim11(helpHttp.responseText) == 'success') {
                toggle('dhsphoto_popup_div');
                //document.getElementById('dhsphoto').style.display='none';
                refreshAfterReceipt();
            } else {
                alert (helpHttp.responseText);
            }
         }
      };

      helpHttp.send(null);
   }  // end updDHSQueriesPhoto

   // --------------------------------------
   // |   getDashboardCases                |
   // |   *Call ajax to pull statistics    |
   // |    for the Dashboard page          |
   // --------------------------------------
   function getDashboardCases()
   {
      var dStamp = new Date().getMilliseconds();
      
      var url = "hrmgr?p_action=USVAJX&ajaxcall=db_open_cases&id="+dStamp;
      
      helpHttp.abort();
      helpHttp.open("GET",url,true);
      
      helpHttp.onreadystatechange = function()
      {
         if (helpHttp.readyState == 1)
         {
            document.getElementById('db_cases_wrapper').innerHTML = '<p><img src="./images/ajax-loader.gif">&nbsp;&nbsp;<i><b>Loading Cases...</i></b></p>';
         }
         if ((helpHttp.readyState == 4) && (helpHttp.status == 200))
         {
            document.getElementById('db_cases_wrapper').innerHTML = helpHttp.responseText;           
         }
      };
      
      helpHttp.send(null);   
      
   }  // end getDashboardCases  
   
   // -----------------------------------------------------
   // |   getRequiredActions                              |
   // |   *Call ajax to pull Adecco Infobank User Actions |
   // |    for the Dashboard page                         |
   // -----------------------------------------------------
   function getRequiredActions()
   {
      var dStamp = new Date().getMilliseconds();
      
      var url = "hrmgr?p_action=USVAJX&ajaxcall=db_ebinder_actions&id="+dStamp;
      
      secondHttpObject.abort();
      secondHttpObject.open("GET",url,true);
      
      secondHttpObject.onreadystatechange = function()
      {
         if (secondHttpObject.readyState === 1)
         {
            document.getElementById('db_actions_wrapper').innerHTML = '<p><img src="./images/ajax-loader.gif">&nbsp;&nbsp;<i><b>Loading Actions...</i></b></p>';
         }
         if ((secondHttpObject.readyState === 4) && (secondHttpObject.status === 200))
         {
            document.getElementById('db_actions_wrapper').innerHTML = secondHttpObject.responseText;           
         }
      };
      
      secondHttpObject.send(null);   
      
   }  // end getRequiredActions  
   
   // --------------------------------------
   // |   findPos                          |
   // |   *gets the x,y coordinates of an  |
   // |    object on the screen            |
   // --------------------------------------       
   function findPos(obj) 
   {
		var curleft = curtop = 0;
		
		if (obj.offsetParent) 
		{
			curleft = obj.offsetLeft
			curtop = obj.offsetTop
		
			while (obj = obj.offsetParent) 
			{
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
			}
		}

		return [curleft,curtop];
	}
  
   // --------------------------------
   // |   getSearchName       		 |
   // --------------------------------
	function getSearchName()
	{
	    popup('saved_search_div');
     	
     	document.getElementById('savedSearchTextBox').focus();
	}   
	
	function saveSearch(searchName)
	{
		var undefined;
		if(searchName == null || searchName === undefined || searchName.length == 0)
		{
			alert('Please enter a name for your search.');
			return false;
		}
		popup('saved_search_div');
		doAdvSearch('true', searchName, 'advanced_search');
  	}
    
	  // -------------------------------------------------------------------------------------------------
      // |   Decide if the comment field is required. Required when date of hire is more than 3 days ago |
      // -------------------------------------------------------------------------------------------------
	function checkThreeDayLimit(startDate)
	{
      	//Don't do anything if there isn't a start date
      	if(startDate == '')
      		return;
      		
         // REQUIRES usv_ajax.js (included in help.jsp) 
         var dStamp = new Date().getMilliseconds();      
	      var url = "hrmgr";
	      var parms = "p_action=USVAJX&ajaxcall=check_three_day_limit&p_date="+startDate;
	      parms	= parms + "&id=" + dStamp;
	      
         // stop any previous call to AJAX
         secondHttpObject.abort();
         
         // setup the necessary headers for POST
         secondHttpObject.open("POST",url,true);
         secondHttpObject.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         secondHttpObject.setRequestHeader("Content-length",parms.length);
         secondHttpObject.setRequestHeader("Connection","close");
         
         // setup callback
         secondHttpObject.onreadystatechange = function()
         {
            if (secondHttpObject.readyState == 4 && secondHttpObject.status == 200)
            {
                handleHireDateResponse(secondHttpObject.responseText);
            }
         }
         // send the request
         secondHttpObject.send(parms);        
	}

        function handleHireDateResponse(jsonObj)
        {
        	var obj = eval('(' + jsonObj + ')');
        	var showPopup = obj.entries[0];
        	document.MAIN.showPopup.value	= showPopup.showPopup;
        	
        	var threeDayLimit	= obj.entries[1];
        	handleThreeDayResponse(threeDayLimit.threeDays);
        }


        function handleThreeDayResponse(text)
        {
           	if(text == 'SHOW')
            {
        		document.getElementById('hidden_comment_text').style.display='';
        		document.getElementById('hidden_comment_field').style.display='';
            }
           	else
           	{
           		document.getElementById('hidden_comment_text').style.display = 'none';
           		document.getElementById('hidden_comment_field').style.display = 'none';
           	}
        }

   // --------------------------------
   // |   addComment          		 |
   // --------------------------------
	function addComment(empId)
	{
	    popup('add_comment');
     	
     	document.COMMENT.p_emp_id.value = empId;
     	document.COMMENT.p_comment_subject.focus();
	}   



   // --------------------------------
   // |   postComment                |
   // --------------------------------   	
 	function postComment(empId,subject,txt)
  	{	
     	// check for subject and text
     	if ((subject == "") || (txt == "") || (subject == null) || (txt == null))
     	{
     	   alert('You must enter a subject and text to save a comment.');
     	   return false;
     	}
     	
     	// REQUIRES usv_ajax.js (included in help.jsp) 
     	var dStamp = new Date().getMilliseconds();      
        var url = "hrmgr";
        var parms = "p_action=USVAJX&ajaxcall=record_comment&p_emp_id="+empId+"&p_comment_subject="+subject+"&p_comment_text="+txt;
      
     	// stop any previous call to AJAX
     	helpHttp.abort();
     
     	// setup the necessary headers for POST
	   helpHttp.open("POST",url,true);
       helpHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	   helpHttp.setRequestHeader("Content-length",parms.length);
   	   helpHttp.setRequestHeader("Connection","close");
     
       // setup callback
       helpHttp.onreadystatechange = function()
       {
          if (helpHttp.readyState == 4 && helpHttp.status == 200)
          {  
             popup('add_comment'); 
             document.getElementById('comment_container').innerHTML = helpHttp.responseText;        
          }
       }        
     
       // send the request
       helpHttp.send(parms);        
     
   } // END postComment  
   
   // --------------------------------
   // |   showComment                |
   // --------------------------------
   function showComment(title, commentText)
   {
	   popup('comment');
 		   
	   document.getElementById('comment_wrapper').innerHTML = commentText;
      
   } // end showComment 
   
   // --------------------------------
   // |   removeEmployerComment      |
   // --------------------------------      
    function removeComment(cmtId)
    {   
        // we need a confirmation first
        var goAhead = confirm('Are you sure you wish to delete this comment');
        if (!goAhead)
           return;
              
        var dStamp = new Date().getMilliseconds();      
        var url = "hrmgr";
        var parms = "p_action=USVAJX&ajaxcall=remove_comment&p_cmt_id="+cmtId;
      
        // stop any previous call to AJAX
        helpHttp.abort();
     
        // setup the necessary headers for POST
       helpHttp.open("POST",url,true);
       helpHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
       helpHttp.setRequestHeader("Content-length",parms.length);
       helpHttp.setRequestHeader("Connection","close");
     
       // setup callback
       helpHttp.onreadystatechange = function()
       {
          if (helpHttp.readyState == 4)
            if (helpHttp.status == 200)
            {  
				document.getElementById('comment_container').innerHTML = helpHttp.responseText;        
            }
       }        
     
       // send the request
       helpHttp.send(parms);        
     
   } // END removeEmployerComment             
    

                    function checkEmpCd(v)
                {

                    //Don't do anything if there isn't an empCd
                    if(v == '')
                        return;

                    // REQUIRES usv_ajax.js (included in help.jsp)
                    var dStamp = new Date().getMilliseconds();
                    var url = "hrmgr";
                    var parms = "p_action=USVAJX&ajaxcall=allow_ssn_applied_for&p_emp_cd="+v;

                    // stop any previous call to AJAX
                    helpHttp.abort();

                    // setup the necessary headers for POST
                    helpHttp.open("POST",url,true);
                    helpHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    helpHttp.setRequestHeader("Content-length",parms.length);
                    helpHttp.setRequestHeader("Connection","close");

                    // setup callback
                    helpHttp.onreadystatechange = function()
                    {
                        if (helpHttp.readyState == 4 && helpHttp.status == 200)
                        {
                            var jsonObj = helpHttp.responseText;
                            var obj = eval('(' + jsonObj + ')');
                            var appliedFor = obj.entries[0];
                            var results = appliedFor.ssnAppliedFor;

                            var employerPin	= obj.entries[1];
                            var displayName     = obj.entries[2];
                            var resellerId = obj.entries[3];
                            if(employerPin.employerPin == '1')
                            {
                                addEmpPinRow();
                            }
                            else
                            {
                                removeEmpPinRow();
                            }

                            if(results == 'Y')
                            {
                                addRow(resellerId.resellerId);
                            }
                            else
                            {
                                removeRow();
                            }
                            if(displayName.displayName != '0')
                            {
                                addDisplayNameRow(displayName.displayName);
                            }
                            else
                            {
                                removeDisplayNameRow();
                            }


                        }
                        if (helpHttp.readyState == 4 && helpHttp.status != 200)
                        {
                            alert( 'An error has occurred. Please contact USVerify.');
                        }
                    }

                    // send the request
                    helpHttp.send(parms);

                } // END checkEmpCd
