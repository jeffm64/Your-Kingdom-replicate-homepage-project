function emailCheck (emailStr) {
  
  if(emailStr.value == null || Trim(emailStr.value) == ''){   
    return true;
  }
/* The following pattern is used to check if the entered e-mail address
   fits the user@domain format.  It also is used to separate the username
   from the domain. */
var emailPat=/^(.+)@(.+)$/
/* The following string represents the pattern for matching all special
   characters.  We don't want to allow special characters in the address. 
   These characters include ( ) < > @ , ; : \ " . [ ]    */
var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
/* The following string represents the range of characters allowed in a 
   username or domainname.  It really states which chars aren't allowed. */
var validChars="\[^\\s" + specialChars + "\]"
/* The following pattern applies if the "user" is a quoted string (in
   which case, there are no rules about which characters are allowed
   and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
   is a legal e-mail address. */
var quotedUser="(\"[^\"]*\")"
/* The following pattern applies for domains that are IP addresses,
   rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
   e-mail address. NOTE: The square brackets are required. */
var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
/* The following string represents an atom (basically a series of
   non-special characters.) */
var atom=validChars + '+'
/* The following string represents one word in the typical username.
   For example, in john.doe@somewhere.com, john and doe are words.
   Basically, a word is either an atom or quoted string. */
var word="(" + atom + "|" + quotedUser + ")"
// The following pattern describes the structure of the user
var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
/* The following pattern describes the structure of a normal symbolic
   domain, as opposed to ipDomainPat, shown above. */
var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")


/* Finally, let's start trying to figure out if the supplied address is
   valid. */

/* Begin with the coarse pattern to simply break up user@domain into
   different pieces that are easy to analyze. */
var matchArray=emailStr.value.match(emailPat)
if (matchArray==null) {
  /* Too many/few @'s or something; basically, this address doesn't
     even fit the general mould of a valid e-mail address. */        
	alert("Email address is not valid (check @ and .'s)");
        emailStr.focus();     	   		
        return false;     
}
var user=matchArray[1]
var domain=matchArray[2]

// See if "user" is valid 
if (user.match(userPat)==null) {
    // user is not valid        
	alert("The username is not valid.");
        emailStr.focus();     	   		
        return false;     
}

/* if the e-mail address is at an IP address (as opposed to a symbolic
   host name) make sure the IP address is valid. */
var IPArray=domain.match(ipDomainPat)
if (IPArray!=null) {
    // this is an IP address
	  for (var i=1;i<=4;i++) {
	    if (IPArray[i]>255) {	        
	        alert("Destination IP address is invalid.");	        
	        emailStr.focus();     	   
		return false;
	    }
    }
    return true
}

// Domain is symbolic name
var domainArray=domain.match(domainPat)
if (domainArray==null) {        
	alert("The domain name is not valid.");
        emailStr.focus();     	   		
        return false;
}

/* domain name seems valid, but now make sure that it ends in a
   three-letter word (like com, edu, gov) or a two-letter word,
   representing country (uk, nl), and that there's a hostname preceding 
   the domain or country. */

/* Now we need to break up the domain to get a count of how many atoms
   it consists of. */
var atomPat=new RegExp(atom,"g")
var domArr=domain.match(atomPat)
var len=domArr.length

// Make sure there's a host name preceding the domain.
if (len<2) {        
	alert("This address is missing a hostname.")
        emailStr.focus();     	   		
        return false;  
}

// If we've gotten this far, everything's valid!
return true;
}




function CheckPhoneNumber(StripedNumber, TheNumber) {
        //TheNumber = TheNumber.value;        
	var valid = 1
	var GoodChars = "0123456789()-+ "
	var i = 0
	if (StripedNumber=="") {
		// Return false if number is empty
		if(TheNumber.value == "")
		{
		valid = 1
		return true;
		}else
		  valid = 0;
		 
	}
	for (i =0; i <= StripedNumber.length -1; i++) {
		if (GoodChars.indexOf(StripedNumber.charAt(i)) == -1) {
	// Note: Remove the comments from the following line to see this
	// for loop in action.
	 //alert(StripedNumber.charAt(i) + " is no good.")
			valid = 0
		} // End if statement
	} // End for loop
	if(StripedNumber.length < 10)
	{
	 valid = 0;
	 }
	if(valid == 0){	  	  
	  alert('Phone number is not in the correct format. Number must be in one of the following formats:\n 9999999999, (999) 999-9999, 999-999-9999');
	  TheNumber.value = '';
	  TheNumber.focus();
	  return false;
	}else
	 setPhoneNumberFormat(StripedNumber, TheNumber);
	 //Now go and format the number the way we want it
}

function setPhoneNumberFormat(StripedNumber, TheNumber) {
    var number = StripedNumber;      
    if(number.length==10){    
      var areaCd = number.substr(0,3);
      var prefix = number.substr(3,3);
      var suffix = number.substr(6,4);      
      var newNum = '('+areaCd+') '+prefix+'-'+suffix;      
      TheNumber.value = newNum;      
    }    
    
     return true;
	
}

function formatPhoneNumber(TheNumber)
{
 tempNumber = TheNumber.value;
 var GoodChars = "0123456789";
 var FinalNumber = '';
 //Strip any chars that are not numbers
 for (i =0; i <= tempNumber.length -1; i++) {  
  
  if (GoodChars.indexOf(tempNumber.charAt(i)) != -1) { 
     FinalNumber = FinalNumber+tempNumber.charAt(i);
     
   } // End if statement
  
 } 
 //Strip the preceding 1 if present
 if(FinalNumber.length == 11 && FinalNumber.charAt(0) == 1)
 {
   FinalNumber = FinalNumber.substr(1,10);
 
 }
  if(FinalNumber.length >= 11)
  {
     alert('Phone number is not in the correct format. Number must be in one of the following formats:\n 9999999999, (999) 999-9999, 999-999-9999');
     TheNumber.value = '';
     TheNumber.focus();
     return false;  
 }
 
 // End for loop  
 //Check to make sure the stripped number is valid
 CheckPhoneNumber(FinalNumber, TheNumber);

}

function CheckPhoneNumber(StripedNumber, TheNumber) {
        //TheNumber = TheNumber.value;        
	var valid = 1
	var GoodChars = "0123456789"
	var i = 0
	if (StripedNumber=="") {
		// Return false if number is empty
		if(TheNumber.value == "")
		{
		valid = 1
		return true;
		}else
		  valid = 0;
		 
	}
	for (i =0; i <= StripedNumber.length -1; i++) {
		if (GoodChars.indexOf(StripedNumber.charAt(i)) == -1) {
	// Note: Remove the comments from the following line to see this
	// for loop in action.
	 //alert(StripedNumber.charAt(i) + " is no good.")
			valid = 0
		} // End if statement
	} // End for loop
	if(StripedNumber.length < 10)
	{
	 valid = 0;
	 }
	if(valid == 0){	  	  
	  alert('Phone number is not in the correct format. Number must be in one of the following formats:\n 9999999999, (999) 999-9999, 999-999-9999');
	  TheNumber.value = '';
	  TheNumber.focus();
	  return false;
	}else
	 setPhoneNumberFormat(StripedNumber, TheNumber);
	 //Now go and format the number the way we want it
}

function setPhoneNumberFormat(StripedNumber, TheNumber) {
    var number = StripedNumber;      
    if(number.length==10){    
      var beginning = number.substr(0,3);
      var middle = number.substr(3,3);
      var end = number.substr(6,4);      
      var newNum = beginning+'-'+middle+'-'+end;   
      TheNumber.value = newNum;      
    }    
    
     return true;
	
}

function formatSSN(TheNumber)
{
 tempNumber = TheNumber.value;
 var GoodChars = "0123456789";
 var FinalNumber = '';
 //Strip any chars that are not numbers
 for (i =0; i <= tempNumber.length -1; i++) {  
  
  if (GoodChars.indexOf(tempNumber.charAt(i)) != -1) { 
     FinalNumber = FinalNumber+tempNumber.charAt(i);
     
   } // End if statement
  
 } 
 //Strip the preceding 1 if present
 if(FinalNumber.length == 11 && FinalNumber.charAt(0) == 1)
 {
   FinalNumber = FinalNumber.substr(1,10);
 
 }
 
 // End for loop  
 //Check to make sure the stripped number is valid
 CheckPhoneNumber(FinalNumber, TheNumber);

}

function isValidNumSize(TheNumber, size )
{
 if(TheNumber.value == null || TheNumber.value == '')
    return true;
 if(!isNum(TheNumber.value))
 {
   alert('This field may contain numbers only.');
   TheNumber.value = '';
   TheNumber.focus();
   return false;
 } 
 if(TheNumber.value.length < size)
  {
    alert(' This field must be '+size+' digits in length.');
    TheNumber.focus();
  
 }
 
 return true;

}

function isValidNum(TheNumber)
{
 if(TheNumber.value == null || TheNumber.value == '')
    return true;
 if(!isNum(TheNumber.value))
 {
   alert('This field may contain numbers only.');
   TheNumber.value = '';
   TheNumber.focus();
   return false;
 } 
 
 return true;

}


 // -------------------------------------------------------

 // Internal function to test whether argument is a number

 // -------------------------------------------------------

 function isNum(arg)

 {

   if (arg == '') return false;

   for (i=0; i<arg.length; i++)

   {

     if (arg.charAt(i) < '0' || arg.charAt(i) > '9')

     {

       return false;

     }

   }

   return true;

 }
 
 
 function replaceSubstring(inputString, fromString, toString) {
    // Goes through the inputString and replaces every occurrence of fromString with toString
    var temp = inputString;
    if (fromString == "") {
       return inputString;
    }
    if (toString.indexOf(fromString) == -1) { // If the string being replaced is not a part of the replacement string (normal situation)
       while (temp.indexOf(fromString) != -1) {
          var toTheLeft = temp.substring(0, temp.indexOf(fromString));
          var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
          temp = toTheLeft + toString + toTheRight;
       }
    } else { // String being replaced is part of replacement string (like "+" being replaced with "++") - prevent an infinite loop
       var midStrings = new Array("~", "`", "_", "^", "#");
       var midStringLen = 1;
       var midString = "";
       // Find a string that doesn't exist in the inputString to be used
       // as an "inbetween" string
       while (midString == "") {
          for (var i=0; i < midStrings.length; i++) {
             var tempMidString = "";
             for (var j=0; j < midStringLen; j++) { tempMidString += midStrings[i]; }
             if (fromString.indexOf(tempMidString) == -1) {
                midString = tempMidString;
                i = midStrings.length + 1;
             }
          }
       } // Keep on going until we build an "inbetween" string that doesn't exist
       // Now go through and do two replaces - first, replace the "fromString" with the "inbetween" string
       while (temp.indexOf(fromString) != -1) {
          var toTheLeft = temp.substring(0, temp.indexOf(fromString));
          var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
          temp = toTheLeft + midString + toTheRight;
       }
       // Next, replace the "inbetween" string with the "toString"
       while (temp.indexOf(midString) != -1) {
          var toTheLeft = temp.substring(0, temp.indexOf(midString));
          var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
          temp = toTheLeft + toString + toTheRight;
       }
    } // Ends the check to see if the string being replaced is part of the replacement string or not
    return temp; // Send the updated string back to the user
 } // Ends the "replaceSubstring" function


/*
==================================================================
LTrim(string) : Returns a copy of a string without leading spaces.
==================================================================
*/
function LTrim(str)
/*
   PURPOSE: Remove leading blanks from our string.
   IN: str - the string we want to LTrim
*/
{
   var whitespace = new String(" \t\n\r");

   var s = new String(str);

   if (whitespace.indexOf(s.charAt(0)) != -1) {
      // We have a string with leading blank(s)...

      var j=0, i = s.length;

      // Iterate from the far left of string until we
      // don't have any more whitespace...
      while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
         j++;

      // Get the substring from the first non-whitespace
      // character to the end of the string...
      s = s.substring(j, i);
   }
   return s;
}

/*
==================================================================
RTrim(string) : Returns a copy of a string without trailing spaces.
==================================================================
*/
function RTrim(str)
/*
   PURPOSE: Remove trailing blanks from our string.
   IN: str - the string we want to RTrim

*/
{
   // We don't want to trip JUST spaces, but also tabs,
   // line feeds, etc.  Add anything else you want to
   // "trim" here in Whitespace
   var whitespace = new String(" \t\n\r");

   var s = new String(str);

   if (whitespace.indexOf(s.charAt(s.length-1)) != -1) {
      // We have a string with trailing blank(s)...

      var i = s.length - 1;       // Get length of string

      // Iterate from the far right of string until we
      // don't have any more whitespace...
      while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
         i--;


      // Get the substring from the front of the string to
      // where the last non-whitespace character is...
      s = s.substring(0, i+1);
   }

   return s;
}

/*
=============================================================
Trim(string) : Returns a copy of a string without leading or trailing spaces
=============================================================
*/
function Trim(str)
/*
   PURPOSE: Remove trailing and leading blanks from our string.
   IN: str - the string we want to Trim

   RETVAL: A Trimmed string!
*/
{
   return RTrim(LTrim(str));
}


function removeSpaces(string) {
	var tstring = "";
	string = '' + string;
	splitstring = string.split(" ");
	for(i = 0; i < splitstring.length; i++)
	tstring += splitstring[i];
	return tstring;
}


function colorizeFields(thisForm)
{
    clearFields(thisForm);
    var dirty = false;
    var counter = 0;
    for (i=0;i<thisForm.elements.length;++i)
    {
        var element = thisForm.elements[i];
        if (element.name.substring(0,3) == 'pr_')
        {
            if(element.type == 'select-multiple')
            {
                if(element.options.length == 0)
                {
                            element.focus();
                            element.style.backgroundColor = '#99FF00';
                            dirty = true;
                            counter++;
                }
            }
            else
            {
                if (Trim(element.value) == '')
                {
                    if (element.style)
                    {
                        if(counter == 0)
                        {
                            element.focus();
                        }
                        element.style.backgroundColor = '#99FF00';
                        dirty = true;
                        counter++;
                    }
                }
            }
        }
    }
    return dirty;
}

function clearFields(thisForm)
{

 for (i=0;i<thisForm.elements.length;++i)                
   if (thisForm.elements[i].style)
   {
     thisForm.elements[i].style.backgroundColor = '#FFFFFF';
   }                 
 return true;
}
 
function validStateCode(stateField, shouldCheck)
{
   var statecheck;

    if(shouldCheck == 'N') {
        return false;
    }
   var stateCd = stateField.value;
   codes = new Array("AL","AK","AZ","AR","AS","CA","CO","CT","DE","DC","FM","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MH","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","MP","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VT","VA","VI","WA","WV","WI","WY","AA","AE","AP","AB","BC","MB","NB","NF","NT","NS","ON","PE","QC","PQ","SK","YT");
   statecheck=true;
   if(stateCd != '')
   {
      for(i=0;i<codes.length;i++)
      {
         if(stateCd==codes[i])
           {
             statecheck=false;
           }
      }
      if(statecheck)
        { 
           window.alert("Please make sure that you have entered the correct two letter U.S. State abbreviation and try again.");	
           stateField.focus();     
        }     
   }
   return statecheck;
}

function validateZip(zipField)
{
   if(zipField.value == '')
      return true;
   var zipNums = replaceSubstring(zipField.value, '-', '');
   var zipFinal;
   if(isValidNum_B(zipNums))
   {
      if(zipNums.length == 9)   
      {     
        zipFinal = zipNums.substring(0,5) + '-' + zipNums.substring(5,9);
        zipField.value = zipFinal;
        return true;     
      }
      else if(zipNums.length == 5)
      {
        zipFinal = zipNums;
        zipField.value = zipFinal;
        return true;
      }
      else
      {
        alert('Zip code must be in the following formats:  #####, #####-####, #########');
        zipField.value = '';
        zipField.focus();
        return false;
      }  
   }
   else
   {
      zipField.value = '';
      zipField.focus();
      return false;
   }
 }
 
 function isValidNum_B(TheNumber)
 {
  if(TheNumber == null || TheNumber == '')
     return true;
  if(!isNum(TheNumber))
  {
    alert('This field may contain numbers only.');   
    return false;
  }  
  return true;
}

	function hasNumber(t)
	{
		return /\d/.test(t);
	}

        function checkValues(field)
        {
                if(hasNumber(field.value))
                {
                        alert('Name fields may not contain numbers.');
                        field.value     = '';
                        field.focus();
                        return false;
                }

                field.value     = filterI9NameField(field.value);
                field   = textToUpperCase(field);

        }


// REMOVES ALL SPECIAL CHARS AND SPACES
function filterAll(str) 
{
   re = /\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\_|\]|\[|\}|\{|\;|\:|\"|\<|\>|\?|\||\\|\!|\$|\./g;
//   str = str.replace(/\s/g,"");
   return str.replace(re,"");
}

// use this version for I9 name fields (allow space, ')
function filterI9NameField(str) 
{
   re = /\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\_|\]|\[|\}|\{|\;|\:|\"|\<|\>|\?|\||\\|\!|\$|\./g;
   return str.replace(re,"");
}

	function checkEmail(email, multiple)
	{
		if (email == '')
			return;
			
		validRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

            
                    if (email.search(validRegExp) == -1)
                    {
                            alert("A valid e-mail address is required.\r\Please check you have entered your details correctly.");
                            return false;
                    } 
                
		return true;
	}	
	
	function checkEmailNew(email, multiple)
	{
		if (email == '')
			return;
			
		//validRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;
//                validRegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//		validRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                validRegExp = /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/;
		
                if (multiple) {
                    var result = email.split(";");
                    for(var i = 0;i < result.length;i++)
                    if (result[i].replace(/^\s+|\s+$/g,"").search(validRegExp) == -1) {
                            alert("A valid e-mail address is required.\r\Please check you have entered your details correctly.");
                            return false;                 
                    }
                }
                
                else {
                    if (email.search(validRegExp) == -1)
                    {
                            alert("A valid e-mail address is required.\r\Please check you have entered your details correctly.");
                            return false;
                    } 
                }
                
		return true;
	}	

        function checkEmailMsg(email, message)
	{
		if (email == '')
			return;
                
                if(!message) {
                    message = 'The email address entered is invalid.  Please correct the value before continuing.'
                }

                validRegExp = /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/;
		
                if (email.search(validRegExp) == -1)
                {
                    alert(message);
                    return false;
                } 
                
		return true;
	}	

