/**
 * javascript common functions
 *
 * @author:
 * @date:   02/22/2002
 */

/**
 * To make sure in a pair, if one is filled in, the other should have value too.
 * return value indicates the empty field name.
 */

// Disable Back
javascript:window.history.forward(1);


var message="Right clicks have been disabled for this website. Please use the menu to navigate.";




function showForm(div)
{
    popup(div);
}

function hideForm(div)
{
    popup(div);
}

// --------------------------------
// |Forwards to employee's record |
// --------------------------------
function displayCase(empId)
{
    document.MAIN.emp_id.value=empId;
    document.MAIN.action='hrmgr?p_action=DISPLAY_CASE';
    document.MAIN.submit();
}

function dispatch(handler, dispatcherCd)
{
    document.MAIN.p_action.value = "dispatcher";

    // Create a parameter for the handler type
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "p_handler");
    input.setAttribute("value", handler);
    document.MAIN.appendChild(input);

    // Create a parameter for the dispatcher code
    var input2 = document.createElement("input");
    input2.setAttribute("type", "hidden");
    input2.setAttribute("name", "p_dispatcherCode");
    input2.setAttribute("value", dispatcherCd);
    document.MAIN.appendChild(input2);


    document.MAIN.submit();
}

// --------------------------------
// |   showFormGroups   		  |
// --------------------------------
function show_form_groups(empId)
{
    popup('form_groups_select_div');

    document.form_groups.p_emp_id.value = empId;

}


function clickIE4()
{

    if (event.button==2)
    {

        alert(message);

        return false;

    }

}

function prefillPreparerInfo(firstName, lastName, address, city, state, zip)
{
    if(document.MAIN.prefillPreparer.checked == true)
    {
        document.MAIN.preparerFirstName.value = firstName;
        document.MAIN.preparerLastName.value = lastName;
        document.MAIN.preparerAddress.value = address;
        document.MAIN.preparerCity.value = city;
        document.MAIN.preparerState.value = state;
        document.MAIN.preparerZipCode.value = zip;
    }
    else
    {
        document.MAIN.preparerFirstName.value = '';
        document.MAIN.preparerLastName.value = '';
        document.MAIN.preparerAddress.value = '';
        document.MAIN.preparerCity.value = '';
        document.MAIN.preparerState.value = '';
        document.MAIN.preparerZipCode.value = '';
    }
}

function clickNS4(e){

    if (document.layers||document.getElementById&&!document.all){

        if (e.which==2||e.which==3){

            alert(message);

            return false;

        }

    }

}



if (document.layers){

    document.captureEvents(Event.MOUSEDOWN);

    document.onmousedown=clickNS4;

}

else if (document.all&&!document.getElementById){

    document.onmousedown=clickIE4;

}



document.oncontextmenu=new Function("alert(message);return false")




function showSelects(show)
{

    var selects = document.all.tags("SELECT");
    for (ssi=0;ssi<selects.length;++ssi)
        if (selects[ssi].id.substring(0,5) == "hide_")
        {
            if (show == false)
                selects[ssi].style.display = 'none';
            else
                selects[ssi].style.display = '';
        }
    return true;
} /* end showSelect */



function doForward(location)
{
    window.location.href = location;
}


function setNull(inputValue)
{
    if(inputValue == '')
        return '$$';
    else
        return inputValue;
}

function isInt(inputValue, fieldName)
{
    var msg = '';
    if(isNaN(inputValue))
        msg += fieldName + ' is a number field.\n';
    else if(inputValue.substring(0,1) == '-')
        msg += fieldName + ' can not be a negative number.\n';
    else if(inputValue.indexOf('.') > 0)
        msg += fieldName + ' is a non-decimal number field.\n';
    else if(inputValue == '' || inputValue.substring(0,1) == ' ')
        msg += fieldName + ' can not be blank.\n';
    return msg;
}

function replaceSpace(inputValue)
{
    var tmp = '';
    for(var i=0;i<inputValue.length;i++)
    {
        if(inputValue.charAt(i) == ' ')
            tmp += '&nbsp;'
        else
            tmp += inputValue.charAt(i);
    }
    return tmp;
}

//type:1, date can not greater than sysdate
function checkDate(inputDate, type)
{
    var tmp = '';
    if(type == 1)
    {
        if(inputDate == '')
            return tmp;
        else if(inputDate.length != 11)
            tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
        else
        {
            var month = isMonth(inputDate.substring(0,3));
            if(month == -1 || isNaN(inputDate.substring(4,6)) || isNaN(inputDate.substring(7,11)))
                tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
            else
            {
                var currentDate = new Date(inputDate.substring(7,11), month, inputDate.substring(4,6));
                var today = new Date();
                if(currentDate > today)
                    tmp = 'Hire/Birth Date can not be greater than current date.';
            }
        }
    }
    else if(type == 2)
    {
        if(inputDate == '')
            return tmp;
        else if(inputDate.length != 11)
            tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
        else
        {
            var month = isMonth(inputDate.substring(0,3));
            if(month == -1 || isNaN(inputDate.substring(4,6)) || isNaN(inputDate.substring(7,11)))
                tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
            else
            {
                var expDate = new Date(inputDate.substring(6,10), inputDate.substring(0,2)-1, inputDate.substring(3,5));
                var tmptoday = new Date();
                var today = new Date(tmptoday.getYear(), tmptoday.getMonth() , tmptoday.getDate());
                var days = 0;
                var difference = 0;
                today = new Date();
                difference = expDate - today;
                days = (difference/(1000*60*60*24));
                if(days <= -1)
                    tmp = 'Expiration Date can not be earlier than current date.';
            }
        }
    }
    return tmp;
}

function isMonth(inputMonth)
{
    if(inputMonth == 'JAN')
        return 0;
    else if(inputMonth == 'FEB')
        return 1;
    else if(inputMonth == 'MAR')
        return 2;
    else if(inputMonth == 'APR')
        return 3;
    else if(inputMonth == 'MAY')
        return 4;
    else if(inputMonth == 'JUN')
        return 5;
    else if(inputMonth == 'JUL')
        return 6;
    else if(inputMonth == 'AUG')
        return 7;
    else if(inputMonth == 'SEP')
        return 8;
    else if(inputMonth == 'OCT')
        return 9;
    else if(inputMonth == 'NOV')
        return 10;
    else if(inputMonth == 'DEC')
        return 11;
    else
        return -1;
}


function jumpTo(URL_List)
{
    var URL = URL_List.options[URL_List.selectedIndex].value;
    if (URL == "blank")
        return false;
    else
        window.location.href = URL;
}


var isNav6, isIE4, isIE5

isIE4 = false;
if (parseInt(navigator.appVersion.charAt(0)) >= 5) {
    isNav6 = (navigator.appName == "Netscape") ? true : false
    isIE5 = (navigator.appName.indexOf("Microsoft" != -1)) ? true : false
}
else isIE4 = true;


function runValidatePrev(inDate,showMsg)
{
    dateOK = true;
    check = '';
    if (inDate.value != null && inDate.value != "")
    {
        dateOK = validateDate(inDate.value,showMsg);
    }
    if (dateOK)
    {
        inDate.value = convertDateMM(inDate.value);
        check = checkDateMM(inDate.value, 1);

        if(check == ''){
            return true;
        }else{
            alert(check);
            inDate.value='';
            inDate.focus();
            return false;
        }
    }
    else
    {
        inDate.value='';
        inDate.focus();
        return false;
    }

}

function runValidatePost(inDate,showMsg)
{
    dateOK = true;
    check = '';
    if (inDate.value != null && inDate.value != "")
    {
        dateOK = validateDate(inDate.value,showMsg);
    }
    if (dateOK)
    {
        inDate.value = convertDateMM(inDate.value);
        check = checkDateMM(inDate.value, 2);

        if(check == ''){
            return true;
        }else{
            alert(check);
            inDate.value='';
            inDate.focus();
            return false;
        }
    }
    else
    {
        inDate.value='';
        inDate.focus();
        return false;
    }

}

function runValidatePlus90(inDate,showMsg)
{
    dateOK = true;
    check = '';
    if (inDate.value != null && inDate.value != "")
    {
        dateOK = validateDate(inDate.value,showMsg);
    }
    if (dateOK)
    {
        inDate.value = convertDateMM(inDate.value);
        check = checkDateMM(inDate.value, 3);

        if(check == ''){
            return true;
        }else{
            alert(check);
            inDate.value='';
            inDate.focus();
            return false;
        }
    }
    else
    {
        inDate.value='';
        inDate.focus();
        return false;
    }

}

function runValidate(inDate,showMsg)
{
    dateOK = true;
    if (inDate.value != null && inDate.value != "")
    {
        dateOK = validateDate(inDate.value,showMsg);
    }
    if (dateOK)
    {
        inDate.value = convertDateMM(inDate.value);
        return true;
    }
    else
    {
        inDate.value='';
        inDate.focus();
        return false;
    }
}
function checkSsn(field) {
    var returnVal = true;
    if(field.value === null || field.value === '') {
        return returnVal;
    }
    var value = field.value;
    if(value.length === 11) {
        value = value.replace(/-/g, "");
    }

    field.value = value;
    if(!isNum(value)) {
        alert('This field may contain Social Security Numbers only, either all numeric or separated by dashes (xxx-xx-xxxx).');
        returnVal = false;
    } else if(value.length !== 9) {
        alert('This field may contain Social Security Numbers only, either all numeric or separated by dashes (xxx-xx-xxxx)');
        returnVal = false;
    }
    
    return returnVal;
}


function convertToMon(inMonth)
{
    convertedMonth = '';
    if(inMonth == '01')
        convertedMonth = 'JAN';
    else if (inMonth == '02')
        convertedMonth = 'FEB';
    else if (inMonth == '03')
        convertedMonth = 'MAR';
    else if (inMonth == '04')
        convertedMonth = 'APR';
    else if (inMonth == '05')
        convertedMonth = 'MAY';
    else if (inMonth == '06')
        convertedMonth = 'JUN';
    else if (inMonth == '07')
        convertedMonth = 'JUL';
    else if (inMonth == '08')
        convertedMonth = 'AUG';
    else if (inMonth == '09')
        convertedMonth = 'SEP';
    else if (inMonth == '10')
        convertedMonth = 'OCT';
    else if (inMonth == '11')
        convertedMonth = 'NOV';
    else if (inMonth == '12')
        convertedMonth = 'DEC';

    return convertedMonth;
}


function convertDate(dateToConvert)
{
    newMonth = '';
    totalNewDate = '';
    if (dateToConvert.length == 8)
    {
        defMonth = dateToConvert.substring(0,2);
        defMonthInt = parseInt(defMonth,10);
        newMonth = convertToMon(defMonthInt);
        defYear = dateToConvert.substring(4,8);// year
        defDay = dateToConvert.substring(2,4);// day
        newMonth = newMonth.toUpperCase();
        totalNewDate = newMonth + '-' + defDay + '-' +defYear;
        return totalNewDate;
    }
    if (dateToConvert.length == 9)
    {
        defMonth = dateToConvert.substring(0,3)
        defYear = dateToConvert.substring(5,9);// year
        defDay = dateToConvert.substring(3, 5);;// day
        defMonth = defMonth.toUpperCase();
        totalNewDate = defMonth + '-' + defDay + '-' +defYear;
        return totalNewDate;
    }
    if (dateToConvert.length == 10)
    {
        defMonth = dateToConvert.substring(0,2);
        defMonthInt = parseInt(defMonth,10);
        newMonth = convertToMon(defMonthInt);
        defYear = dateToConvert.substring(6,10);// year
        defDay = dateToConvert.substring(3,5);// day
        newMonth = newMonth.toUpperCase();
        totalNewDate = newMonth + '-' + defDay + '-' +defYear;
        return totalNewDate;
    }
    if (dateToConvert.length == 11)
    {
        defMonth = value.substring(0,3)// month
        defDay = value.substring(4,6);// day
        defYear = value.substring(7, 11);// year
        newMonth = defMonth.toUpperCase();
        totalNewDate = newMonth + '-' + defDay + '-' +defYear;
        return totalNewDate;
    }
    if (dateToConvert.length == 0)
    {
        return dateToConvert;
    }

}


function isDigit (inValue)
{
    return ((inValue >= "0") && (inValue <= "9"))
}


function checkDay(inDay,inMonth, inYear)
{
    dayErr = 0;
    defDayInt = inDay;
    defMonth = inMonth;
    defMonth = defMonth.toUpperCase();
    defYearInt = inYear;
    if(isNaN(defDayInt))
    {
        //alert("Please enter a valid day")
        dayErr = 1;
    }
    if((defDayInt<1 || defDayInt>31) || ((defMonth==2 || defMonth=='FEB') && inDay>daysInFebruary(defYearInt)))
    {
        //alert("Please enter a valid day")
        dayErr = 1;
    }
    return dayErr;
}

function checkYear(inYear,inYearString)
{
    yearErr = 0;
    defYearInt = inYear;
    defYear = inYearString;
    var minYear=1900;
    var maxYear=2200;
    if (isNaN(defYearInt))
    {
        //alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
        yearErr = 1;
    }
    if (defYear.length != 4 || defYearInt==0 || defYearInt<minYear || defYearInt>maxYear)
    {
        alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
        yearErr = 1;
    }
    return yearErr
}

function daysInFebruary(inYear)
{
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((inYear % 4 == 0) && ( (!(inYear % 100 == 0)) || (inYear % 400 == 0))) ? 29 : 28 );
}

function DaysArray(n)
{
    for (var i = 1; i <= n; i++)
    {
        this[i] = 31
        if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
        if (i==2) {this[i] = 29}
    }
    return this
}

function validateDate(inDate,showMsg)
{
    errMessage = '';
    var err=0;
    value = inDate;
    var daysInMonth = DaysArray(12)
    var monthArray = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
    if (value.length < 8)
    {
        errMessage = errMessage + '  Field Length  ';
        err=1;
    }
    if (value.length > 11)
    {
        errMessage = errMessage + '  Field Length  ';
        err = 1;
    }
    if (value.length == 0)
    {
        errMessage = errMessage + '  Field Length  ';
        err = 0;
    }

    //MMDDYYYY
    if (value.length == 8)
    {
        tempErr = 0;
        defMonth = value.substring(0, 2);// month
        defMonthInt = parseInt(defMonth,10);
        defYear = value.substring(4,8);// year
        defYearInt = parseInt(defYear);
        defDay = value.substring(2,4);// day
        defDayInt = parseInt(defDay,10);
        defDayTemp = defDay.substring(0,1);
        if (defDayTemp == '/')
        {
            defDay = value.substring(3,5);
            defDayInt = parseInt(defDay,10);
        }
        if (defMonthInt <1 || defMonthInt >12)
        {
            //alert('Please enter a valid month');
            errMessage = errMessage + '  Month  ';
            err = 1;
            tempErr = 1;
        }
        if (isNaN(defMonthInt))
        {
            //alert('Please enter a valid month');
            errMessage = errMessage + '  Month  ';
            err = 1;
            tempErr = 1;
        }
        if(defDayInt > daysInMonth[defMonthInt])
        {
            alert('There are only '+daysInMonth[defMonthInt]+' days in '+monthArray[defMonthInt-1]+'.');
            return false;
        }
        err = checkDay(defDayInt,defMonth,defYearInt);
        if (err == 1)
        {
            errMessage = errMessage + '  Day  ';
            tempErr = 1;
        }

        err = checkYear(defYearInt,defYear);
        if (err == 1)
        {
            errMessage = errMessage + '  Year  ';
            err = 1;
        }
        if (err == 0 && tempErr ==1)
        {
            err = 1;
        }
    }
    //MONDDYYYY
    if (value.length == 9)
    {
        var validMonth = false;
        tempErr = 0;
        defDay = value.substring(3, 5);
        defDayInt = parseInt(defDay,10);
        defMonth = value.substring(0,3);
        defMonthInt = parseInt(defMonth,10);
        defYear = value.substring(5,9);
        defYearInt = parseInt(defYear);

        err = checkDay(defDayInt,defMonth,defYearInt);
        if (err == 1)
        {
            errMessage = errMessage + '  Day  ';
            tempErr = 1;
        }
        for(x=0; x < monthArray.length; x++)
        {
            if (defMonth.toUpperCase() == monthArray[x])
                validMonth = true;
        }

        if(defDayInt > daysInMonth[defMonthInt])
        {
            alert('There are only '+daysInMonth[defMonthInt]+' days in '+monthArray[defMonthInt-1]+'.');
            return false;
        }
        if (validMonth == false)
        {
            //alert('Please enter a valid month');
            errMessage = errMessage + '  Month  ';
            err = 1;
            tempErr = 1;
        }

        err = checkYear(defYearInt,defYear);
        if (err == 1)
        {
            errMessage = errMessage + '  Year  ';
            err = 1;
        }
        if (err == 0 && tempErr ==1)
            err = 1;

    }
    //MM/DD/YYYY
    if (value.length == 10)
    {
        tempErr = 0;
        defDay = value.substring(3, 5);
        defDayInt = parseInt(defDay,10);
        defMonth = value.substring(0, 2);
        defMonthInt = parseInt(defMonth,10);
        firstSlash = value.substring(2, 3);
        secondSlash = value.substring(5, 6);
        defYear = value.substring(6,10);
        defYearInt = parseInt(defYear);
        if (firstSlash != '/')
        {
            err = 1;
            errMessage = errMessage + '  Slash in wrong position for this format  ';
            tempErr = 0;
        }
        if (secondSlash != '/')
        {
            err = 1;
            errMessage = errMessage + '  Slash in wrong position for this format  ';
            tempErr = 0;
        }
        err = checkDay(defDayInt,defMonth,defYearInt);
        if (err == 1)
        {
            errMessage = errMessage + '  Day  ';
            tempErr = 1;
        }

        if(defDayInt > daysInMonth[defMonthInt])
        {
            alert('There are only '+daysInMonth[defMonthInt]+' days in '+monthArray[defMonthInt-1]+'.');
            return false;
        }
        if (defMonthInt <1 || defMonthInt >12)
        {
            //alert('Please enter a valid month');
            errMessage = errMessage + '  Month  ';
            err = 1;
            tempErr = 1;
        }
        if (isNaN(defMonthInt))
        {
            //alert('Please enter a valid month');
            errMessage = errMessage + '  Month  ';
            err = 1;
            tempErr = 1;
        }
        err = checkYear(defYearInt,defYear);
        if (err == 1)
        {
            errMessage = errMessage + '  Year  ';
            err = 1;
        }
        if (err == 0 && tempErr ==1)
            err = 1;
    }

    //MON-DD-YYYY
    if (value.length == 11)
    {
        tempErr = 0;
        var validMonth = false;
        defMonth = value.substring(0,3)// month
        defMonthInt = parseInt(defMonth,10);
        firstDash = value.substring(3,4)// '-'
        defDay = value.substring(4,6);// day
        defDayInt = parseInt(defDay,10)
        secondDash = value.substring(6,7);// '-'
        defYear = value.substring(7, 11);// year
        defYearInt = parseInt(defYear);

        if (firstDash != '-')
        {
            err = 1;
            errMessage = errMessage + '  Dash in wrong position for this format  ';
            tempErr = 1;
        }
        if (secondDash != '-')
        {
            err = 1;
            errMessage = errMessage + '  Dash in wrong position for this format  ';
            tempErr = 1;
        }
        err = checkDay(defDayInt,defMonth,defYearInt);
        if (err == 1)
        {
            errMessage = errMessage + '  Day  ';
            tempErr = 1;
        }

        if(defDayInt > daysInMonth[defMonthInt])
        {
            alert('There are only '+daysInMonth[defMonthInt]+' days in '+monthArray[defMonthInt-1]+'.');
            return false;
        }
        for(x=0; x < monthArray.length; x++)
        {
            if (defMonth.toUpperCase() == monthArray[x])
                validMonth = true;
        }
        if (validMonth == false)
        {
            //alert('Please enter a valid month');
            errMessage = errMessage + '  Month  ';
            err = 1;
            tempErr = 1;
        }

        err = checkYear(defYearInt,defYear);
        if (err == 1)
        {
            errMessage = errMessage + '  Year  ';
            err = 1;
        }
        if (err == 0 && tempErr ==1)
            err = 1;
    }

    if (err==1)
    {
        //alert("The following field(s) are incorrect: " + errMessage);
        if (showMsg != false) alert('The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY');
        return false;
    }
    if (err==2)
    {
        if (showMsg != false) alert('There are not that many days in the month selected.');
        return false;
    }
    else
        return true;
}






function displayErrorMsg(message)
{
    if(message != '')
        alert(message);
}


function stripQuotes(field)
{
    var s = field.value;
    var re = /"/gi;

    s= field.value.replace(re,"");

    // s.replace(/"([^"]*)"/g, "``$1''");

    field.value = s;

    return true;
}

function checkValidNum(value)
{

    if(isNaN(value.value))
    {

        var chars = value.value;
        var goodChars = chars.substring(0,chars.length - 1);
        value.value = goodChars;
        alert('Please enter a valid number.');

        return false;
    }
    else
    {
        return true;
    }

}










// checkRequiredFields
// this checks to see if the pr_ fields are filled in
function checkRequiredFields(thisForm,doAlert)
{
    var errorMsg;
    var hasErrors;
    errorMsg = 'The following items are required. \\n \\n';
    hasErrors = false;
    for (i=0;i<thisForm.elements.length;++i)
    {
        if (thisForm.elements[i].name.substring(0,3) == 'pr_')
        {
            if (thisForm.elements[i].value == '')
            {
                if (thisForm.elements[i].style) thisForm.elements[i].style.backgroundColor = '#FFEEEE';
                errorMsg = errorMsg + thisForm.elements[i].name.substring(3,thisForm.elements[i].name.length) + '\\n';
                hasErrors = true;
            }
            else
            if (thisForm.elements[i].style) thisForm.elements[i].style.backgroundColor = '#FFFFFF';
        }
    }
    if (hasErrors == true)
    {
        if (doAlert == true) alert(errorMsg);
        return false;
    }
    return true;
}




function clearFields(thisForm)
{
    for (i=0;i<thisForm.elements.length;++i)
        thisForm.elements[i].style.backgroundColor = '#ffffff';

}


function isVersionSix()
{
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;

    var fullVersion = parseFloat(nVer);
    var majorVersion = parseInt(nVer);

    // In Internet Explorer, the true version is after "MSIE"

    if ((verOffset=nAgt.indexOf("MSIE"))!=-1)
    {
        fullVersion = parseFloat(nAgt.substring(verOffset+5,nAgt.length));
        majorVersion = parseInt(''+fullVersion);
    }

    // In Opera, the true version is after "Opera"

    if ((verOffset=nAgt.indexOf("Opera"))!=-1)
    {
        fullVersion = parseFloat(nAgt.substring(verOffset+6,nAgt.length));
        majorVersion = parseInt(''+fullVersion);
    }

    if(fullVersion == 6)
        return true;
    else if (majorVersion == 6)
        return true;
    else
        return false;
}

timeout_one = setTimeout("endSession();", 1800000);

//var timeout_one = 0;
//resetTimeoutOne(1800000, false);

function setSessionExpired() {
    resetTimeoutOne(0, true);
}

function resetTimeoutOne(time, sessionExpired) {
    if (sessionExpired) {
        clearTimeout(timeout_one);
    }
    else {
        clearTimeout(timeout_one);
        timeout_one = setTimeout("checkTimeout();", time);
    }
}


function checkTimeout()
{
    window.open("TimeoutWarning.jsp","","width=500,height=500,location=no,left=20");
    timeout_one = setTimeout("endSession();", 60000);
}

function endSession()
{
    setAction('TIMEOUT');
    document.MAIN.action="hrmgr";
    document.MAIN.submit();
    //window.open("SessionExpired.jsp","","width=500,height=500,location=no,left=20");
    return true;
}


function convertToMM(inMonth)
{
    convertedMonth = '';
    inMonth = inMonth.toUpperCase();
    if(inMonth == 'JAN')
        convertedMonth = '01';
    else if (inMonth == 'FEB')
        convertedMonth = '02';
    else if (inMonth == 'MAR')
        convertedMonth = '03';
    else if (inMonth == 'APR')
        convertedMonth = '04';
    else if (inMonth == 'MAY')
        convertedMonth = '05';
    else if (inMonth == 'JUN')
        convertedMonth = '06';
    else if (inMonth == 'JUL')
        convertedMonth = '07';
    else if (inMonth == 'AUG')
        convertedMonth = '08';
    else if (inMonth == 'SEP')
        convertedMonth = '09';
    else if (inMonth == 'OCT')
        convertedMonth = '10';
    else if (inMonth == 'NOV')
        convertedMonth = '11';
    else if (inMonth == 'DEC')
        convertedMonth = '12';

    return convertedMonth;
}

function convertDateMM(dateToConvert)
{
    newMonth = '';
    totalNewDate = '';
    if (dateToConvert.length == 8)
    {
        defMonth = dateToConvert.substring(0,2)
        defYear = dateToConvert.substring(4,8);// year
        defDay = dateToConvert.substring(2,4);// day
        totalNewDate = defMonth + '-' + defDay + '-' +defYear;
        return totalNewDate;
    }
    if (dateToConvert.length == 9)
    {
        defMonth = dateToConvert.substring(0,3)
        newMonth = convertToMM(defMonth);
        defYear = dateToConvert.substring(5,9);// year
        defDay = dateToConvert.substring(3, 5);;// day
        totalNewDate = newMonth + '-' + defDay + '-' +defYear;
        return totalNewDate;
    }
    if (dateToConvert.length == 10)
    {
        defMonth = dateToConvert.substring(0,2);
        defYear = dateToConvert.substring(6,10);// year
        defDay = dateToConvert.substring(3,5);// day
        totalNewDate = defMonth + '-' + defDay + '-' +defYear;
        return totalNewDate;
    }
    if (dateToConvert.length == 11)
    {
        defMonth = value.substring(0,3)// month
        newMonth = convertToMM(defMonth);
        defDay = value.substring(4,6);// day
        defYear = value.substring(7, 11);// year
        totalNewDate = newMonth + '-' + defDay + '-' +defYear;
        return totalNewDate;
    }
    if (dateToConvert.length == 0)
    {
        return dateToConvert;
    }
}

//type:1, date can not greater than sysdate
function checkDateMM(inputDate, type)
{
    var tmp = '';
    if(type == 1)
    {
        if(inputDate == '')
            return tmp;
        else if(inputDate.length != 10)
            tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
        else
        {

            if(isNaN(inputDate.substring(0,2)) || isNaN(inputDate.substring(3,5)) || isNaN(inputDate.substring(6,10)))
                tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
            else
            {
                var currentDate = new Date(inputDate.substring(6,10), inputDate.substring(0,2)-1, inputDate.substring(3,5));
                var today = new Date();
                if(currentDate > today)
                    tmp = 'Date can not be greater than current date.';
            }
        }
    }
    else if(type == 2)
    {
        if(inputDate == '')
            return tmp;
        else if(inputDate.length != 10)
            tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
        else
        {
            if(isNaN(inputDate.substring(0,2)) || isNaN(inputDate.substring(3,5)) || isNaN(inputDate.substring(6,10)))
                tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
            else
            {
                var expDate = new Date(inputDate.substring(6,10), inputDate.substring(0,2)-1, inputDate.substring(3,5));
                var tmptoday = new Date();
                var today = new Date(tmptoday.getYear(), tmptoday.getMonth() , tmptoday.getDate());
                var days = 0;
                var difference = 0;
                today = new Date();
                difference = expDate - today;
                days = (difference/(1000*60*60*24));
                if(days <= -1)
                    tmp = 'Date can not be earlier than current date.';
            }
        }
    }

    else if(type == 3)
    {
        if(inputDate == '')
            return tmp;
        else if(inputDate.length != 10)
            tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
        else
        {
            if(isNaN(inputDate.substring(0,2)) || isNaN(inputDate.substring(3,5)) || isNaN(inputDate.substring(6,10)))
                tmp = 'The date must be in one of the following formats: MMDDYYYY,MONDDYYYY,MM/DD/YYYY,MON-DD-YYYY';
            else
            {
                var expDate = new Date(inputDate.substring(6,10), inputDate.substring(0,2)-1, inputDate.substring(3,5));
                var tmptoday = new Date();
                var today = new Date(tmptoday.getYear(), tmptoday.getMonth() , tmptoday.getDate());
                var days = 0;
                var difference = 0;
                today = new Date();
                difference = expDate - today;
                days = (difference/(1000*60*60*24));
                if(days <= -1 || days > 90)
                    tmp = 'Date cannot be earlier than the current date or later than 90 days in the future.';
            }
        }
    }
    return tmp;
}

// convert a field (a-z,A-Z) to upper case
// usage onKeyUp="textToUpperCase(this);"
function textToUpperCase(field)
{
    field.value = field.value.toUpperCase();
    return true;
}

function validateName(element)
{
    if(element.value.length > 0)
    {
        element.style.backgroundColor = '#FFFFFF';
    }
    var originalValue = element.value;
    var finalValue = element.value;
    //finalValue = finalValue.replace(/-/g,'');
    finalValue = finalValue.replace(/,/g,'');

    if(originalValue.length > finalValue.length)
    {
        element.style.backgroundColor = '#99FF00';
        element.value = finalValue;
        alert('Hyphens and commas are not allowed.');
        element.focus();
        return true;
    }
    return true;

}





function setAction(action)
{
    document.MAIN.p_action.value = action;
    return true;
}

function setAndGo(action)
{

    document.MAIN.p_action.value = action;
    document.MAIN.submit();
    return true;
}

function setAndGoTopLevel(menu, action)
{
    document.MAIN.p_action.value = action;
    document.MAIN.topLevelMenu.value	= menu;
    document.MAIN.submit();
    return true;
}

function goMenu(action, menu)
{
    document.MAIN.p_action.value = action;
    document.MAIN.p_menu.value = menu;
    document.MAIN.submit();
    return true;
}


function unlock(user)
{
    document.MAIN.usr_id.value = user;
    setAction('UNLOCK');
    document.MAIN.submit();
    return true;
}

function dateRange100(beginDt, endDt)
{
    beginMonth = beginDt.substring(0,2)// month
    beginMonthInt = parseInt(beginMonth,10);
    beginDay = beginDt.substring(3,5);// day
    beginDayInt = parseInt(beginDay,10)
    beginYear = beginDt.substring(6, 10);// year
    beginYearInt = parseInt(beginYear);
    endMonth = endDt.substring(0,2)// month
    endMonthInt = parseInt(endMonth,10);
    endDay = endDt.substring(3,5);// day
    endDayInt = parseInt(endDay,10)
    endYear = endDt.substring(6, 10);// year
    endYearInt = parseInt(endYear);
    var begDate = new Date();
    var endDate = new Date();
    begDate.setFullYear(beginYearInt);
    begDate.setDate(beginDayInt);
    begDate.setMonth(beginMonthInt-1);
    endDate.setFullYear(endYearInt);
    endDate.setMonth(endMonthInt-1);
    endDate.setDate(endDayInt);
    var days = 0;
    var difference = 0;
    difference = endDate - begDate;
    days = (difference/(1000*60*60*24));

    if(days > 100)
    {
        alert('Search date range cannot be over 100 days.');
        endDt = '';
        return false;
    }else if(days < 0)
    {
        alert('Search begin date must be before end date.');
        endDt = '';
        return false;
    }else
        return true;



}

function getDatePlus100(beginDt)
{

}

function loadPDF(pdfToLoad, height)
{
    height = typeof height !== 'undefined' ? height : "870";
    document.write('<object data="'+pdfToLoad+'" type="application/pdf" id="objPdf" width="660" height="'+height+'">');
    document.write('<param name="SRC" value="'+pdfToLoad+'"></param>');
    document.write('</object>');
}

function showTermDate(value)
{
    showTermDateWithId(value, 'termDt');
}

function showTermDateWithId(value, id)
{
    if(value == 'true')
    {
        document.getElementById(id).style.display = '';
    }
    else
    {
        document.getElementById(id).style.display = 'none';
    }
}



function ConfirmClose(message)
{
    if(document.MAIN.printed.value != 'Y')
    {
        if (event.clientY < 0)
        {
            event.returnValue = message;

            setTimeout('myclose=false',100);
            myclose=true;
        }
    }
}

function ConfirmCloseSpanish(message)
{
    if(document.MAIN.printed.value != 'Y')
    {
        if (event.clientY < 0)
        {
            event.returnValue = message;

            setTimeout('myclose=false',100);
            myclose=true;
        }
    }
}


function updateDocumentFields(value)
{
    document.MAIN.listASelected.value = value;
    document.getElementById('student_question').style.display = 'none';
    document.getElementById('photocopy_question').style.display = 'none';
    if(value == 'FRNPASI551')
    {
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
        document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-551 number:';
        document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-551 expiration date (if applicable):';
        document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
        document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
        document.MAIN.full_doc_1.value = 'Foreign passport';
        document.MAIN.full_doc_2.value = 'I-551';
        document.getElementById('doc_num_2A_row').style.display = '';
        document.getElementById('exp_dt_2A_row').style.display = '';
    }
    else
    if(value == 'I-94')
    {
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
        document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        document.MAIN.full_doc_1.value = 'Foreign passport';
        document.MAIN.full_doc_2.value = 'I-94';
        document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
        document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-94 expiration date (if applicable):';
        document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
        document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
        document.getElementById('doc_num_2A_row').style.display = '';
        document.getElementById('exp_dt_2A_row').style.display = '';
    }
    else
    if(value == 'FSM-PASS')
    {
        document.MAIN.issuingAuthA.value='Federated States of Micronesia'
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>FSM passport number:';
        document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>FSM passport expiration date (if applicable):';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        document.MAIN.full_doc_1.value = 'Micronesia passport';
        document.MAIN.full_doc_2.value = 'I-94';
        document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
        document.getElementById('exp_dt_2A_text').innerHTML = 'I-94 expiration date (if applicable):';
        document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
        document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
        document.getElementById('doc_num_2A_row').style.display = '';
        document.getElementById('exp_dt_2A_row').style.display = '';
    }
    else
    if(value == 'RMI-PASS')
    {
        document.MAIN.issuingAuthA.value='Republic of Marshall Islands'
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>RMI passport number:';
        document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>RMI passport expiration date (if applicable):';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        document.MAIN.full_doc_1.value = 'Republic of Marshall Islands passport';
        document.MAIN.full_doc_2.value = 'I-94';
        document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
        document.getElementById('exp_dt_2A_text').innerHTML = 'I-94 expiration date (if applicable):';
        document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
        document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
        document.getElementById('doc_num_2A_row').style.display = '';
        document.getElementById('exp_dt_2A_row').style.display = '';
    }
    else
    if(value == 'FRNPASSDS2')
    {
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
        document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
        document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>DS-2019 expiration date (if applicable):';
        document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
        document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
        document.getElementById('doc_num_2A_row').style.display = '';
        document.getElementById('exp_dt_2A_row').style.display = '';
        document.MAIN.full_doc_1.value = 'Foreign passport';
        document.MAIN.full_doc_2.value = 'DS-2019';
        document.getElementById('student_question').style.display = '';
    }
    else
    if(value == 'FRNPASSI20')
    {
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
        document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
        document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-20 expiration date (if applicable):';
        document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
        document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
        document.getElementById('doc_num_2A_row').style.display = '';
        document.getElementById('exp_dt_2A_row').style.display = '';
        document.MAIN.full_doc_1.value = 'Foreign passport';
        document.MAIN.full_doc_2.value = 'I-20';
        document.getElementById('student_question').style.display = '';
    }
    else if (value == 'I-551')
    {
        document.MAIN.issuingAuthA.value='DHS';
        document.getElementById('doc_num_2A_row').style.display = 'none';
        document.getElementById('exp_dt_2A_row').style.display = 'none';
        document.getElementById('photocopy_question').style.display = '';
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
        document.getElementById('exp_dt_1A_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
    }
    else if (value == 'I-766')
    {
        document.MAIN.issuingAuthA.value='DHS';
        document.getElementById('doc_num_2A_row').style.display = 'none';
        document.getElementById('exp_dt_2A_row').style.display = 'none';
        document.getElementById('photocopy_question').style.display = '';
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
        document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' expiration date:';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
    }
    else
    {

        if (value == 'USPASSPORT')
        {
            document.MAIN.issuingAuthA.value='US Government';
        }

        document.getElementById('doc_num_2A_row').style.display = 'none';
        document.getElementById('exp_dt_2A_row').style.display = 'none';
        document.getElementById('photocopy_question').style.display = '';
        document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
        document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' expiration date:';
        document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
        document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
    }

}

function splitValues(value, token1, erase)
{
    var tmpArray = new Array();
    tmpArray = value.split(token1);
    var tmpListType = tmpArray[2];
    if(tmpListType == 'A')
    {
//			document.MAIN.issuingAuthA.value='';
        if(erase == 'true')
        {
            document.MAIN.issuingAuthA.value='';
            document.MAIN.docNum1A.value = '';
            document.MAIN.docNum2A.value = '';
            document.MAIN.ExpDt1A.value = '';
            document.MAIN.ExpDt2A.value = '';
            document.MAIN.issuingAuthA.value = tmpArray[3];

        }
        document.MAIN.listASelected.value = value;
        document.MAIN.docTitleA.value = tmpArray[0];
        document.MAIN.full_doc_1.value = tmpArray[1];
        document.MAIN.list_a_help.value = tmpArray[0];
        document.getElementById('student_question').style.display = 'none';
        document.getElementById('photocopy_question').style.display = 'none';
        document.getElementById('doc_num_3A_row').style.display = 'none';
        document.getElementById('exp_dt_3A_row').style.display = 'none';
        if(tmpArray[0] == 'FRNPASI551')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-551 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-551 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-551';
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
        }
        else
        if(tmpArray[0] == 'I-94')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-94';
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-94 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
        }
        else
        if(tmpArray[0] == 'FSM-PASS')
        {
            document.MAIN.issuingAuthA.value='Federated States of Micronesia'
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>FSM passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>FSM passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.MAIN.full_doc_1.value = 'Micronesia passport';
            document.MAIN.full_doc_2.value = 'I-94';
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = 'I-94 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
        }
        else
        if(tmpArray[0] == 'RMI-PASS')
        {
            document.MAIN.issuingAuthA.value='Republic of Marshall Islands'
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>RMI passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>RMI passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.MAIN.full_doc_1.value = 'Republic of Marshall Islands passport';
            document.MAIN.full_doc_2.value = 'I-94';
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = 'I-94 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
        }
        else
        if(tmpArray[0] == 'FRNPASSDS2')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>DS-2019 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'DS-2019';
            document.getElementById('student_question').style.display = '';
            document.getElementById('doc_num_3A_text').innerHTML = '<font color=red>* </font>Student and Exchange Visitor Number from DS-2019:';
            document.getElementById('exp_dt_3A_text').innerHTML = '<font color=red>* </font> DS-2019 expiration date:';
            document.getElementById('doc_num_3A_row').style.display = '';
            document.getElementById('exp_dt_3A_row').style.display = '';

        }
        else
        if(tmpArray[0] == 'FRNPASSI20')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-94 Expiration Date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-20';
            document.getElementById('student_question').style.display = '';
            document.getElementById('doc_num_3A_text').innerHTML = '<font color=red>* </font>Student and Exchange Visitor Number from I-20:';
            document.getElementById('exp_dt_3A_text').innerHTML = '<font color=red>* </font> I-20 expiration date:';
            document.getElementById('doc_num_3A_row').style.display = '';
            document.getElementById('exp_dt_3A_row').style.display = '';
        }
        else if (tmpArray[0] == 'I-551')
        {
            document.MAIN.issuingAuthA.value='DHS';
            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('photocopy_question').style.display = '';
        }
        else if (tmpArray[0] == 'I-766')
        {
            document.MAIN.issuingAuthA.value='DHS';
            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' expiration date:';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('photocopy_question').style.display = '';
        }
        else
        {

            if (tmpArray[0] == 'USPASSPORT')
            {
                document.MAIN.issuingAuthA.value='US Government';
            }

            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' expiration date:';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('photocopy_question').style.display = '';
        }
    }
    if(tmpListType == 'B')
    {
        document.MAIN.issuingAuthBState.style.display='none';
        document.MAIN.issuingAuthB.style.display='';
        document.MAIN.list_b_help.value = tmpArray[0];
        document.MAIN.listBSelected.value = value;
        if(tmpArray[0] == 'DRVRLCNSE')
        {
            if (tmpArray[3] == '')
                tmpArray[3] = 'DMV';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.issuingAuthB.style.display='none';
            document.MAIN.issuingAuthBState.style.display='';
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>US driver\'s license number:';
            document.getElementById('exp_dt_B_text').innerHTML = '<font color=red>* </font>US driver\'s license expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'STISSUDID')
        {
            if (tmpArray[3] == '')
                tmpArray[3] = 'DMV';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.issuingAuthB.style.display='none';
            document.MAIN.issuingAuthBState.style.display='';
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = 'US State ID card number:';
            document.getElementById('exp_dt_B_text').innerHTML = 'US State ID card expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'GOVISSUDID')
        {
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>US ID card number:';
            document.getElementById('exp_dt_B_text').innerHTML = 'US ID card expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'MILITARY')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>US military ID/draft record number:';
            document.getElementById('exp_dt_B_text').innerHTML = 'US military ID/draft record expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'CNDDRVRLIC')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>Canadian driver license number:';
            document.getElementById('exp_dt_B_text').innerHTML = '<font color=red>* </font>Canadian driver license expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = tmpArray[1] +' number:';
            document.getElementById('exp_dt_B_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
    }
    if(tmpListType == 'C')
    {
        document.MAIN.list_c_help.value = tmpArray[0];
        document.MAIN.listCSelected.value = value;
        document.getElementById('student_questionC').style.display = 'none';

        if(tmpArray[0] == 'SSN' || tmpArray[0] == 'SSNRPLCMNT')
        {
            document.MAIN.docNumC.value = document.MAIN.pr_employeeSSN.value;
        }
        else
            document.MAIN.docNumC.value = '';

        document.MAIN.ExpDtC.value = '';
        document.MAIN.issuingAuthC.value = tmpArray[3];
        document.MAIN.full_doc_2.value = tmpArray[1];
        //mmolloy
        //08.10.2009
        document.getElementById("SSN_TR").style.display='none';
        if(tmpArray[0] == 'SSN')
        {
            //mmolloy
            //08.10.2009
            document.getElementById("SSN_TR").style.display='';
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else if(tmpArray[0] == 'BIRTHCC' || tmpArray[0] == 'I-197' || tmpArray[0] == 'I-179' || tmpArray[0] == 'DS-1350' || tmpArray[0] == 'FS-545')
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else if(tmpArray[0] == 'UNEXPEMAU' || tmpArray[0] == 'SSNRPLCMNT')
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else if(tmpArray[0] == 'I20' || tmpArray[0] == 'DS2019')
        {
            document.MAIN.issuingAuthC.value='';
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
            document.getElementById('student_questionC').style.display = '';
        }
        else
        {
            document.MAIN.full_doc_2.value = tmpArray[1];
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
    }
}

function splitValuesOnLoad(value, token1)
{
    var tmpArray = new Array();
    tmpArray = value.split(token1);
    var tmpListType = tmpArray[2];

    if(tmpListType == 'A')
    {
        document.MAIN.full_doc_1.value = tmpArray[1];
        document.MAIN.full_doc_2.value = tmpArray[1];
        document.MAIN.docTitleA.value = tmpArray[0];

        if(tmpArray[3] != '')
        {
            document.MAIN.issuingAuthA.value = tmpArray[3];
        }
        if(tmpArray[0] == 'FRNPASI551')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-551 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-551 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-551';
        }
        else
        if(tmpArray[0] == 'I-94')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-94 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-94';
        }
        else
        if(tmpArray[0] == 'FSM-PASS')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>FSM passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>FSM passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = 'I-94 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Micornesia passport';
            document.MAIN.full_doc_2.value = 'I-94';
        }
        else
        if(tmpArray[0] == 'RMI-PASS')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>RMI passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>RMI passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = 'I-94 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Repulic of Marshall Islands passport';
            document.MAIN.full_doc_2.value = 'I-94';
        }
        else
        if(tmpArray[0] == 'FRNPASSDS2')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>DS-2019 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'DS-2019';
        }
        else
        if(tmpArray[0] == 'FRNPASSI20')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>Foreign passport number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Foreign passport expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>I-94 number:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>I-20 expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-20';
        }
        else if (tmpArray[0] == 'I-551')
        {
            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        }
        else if (tmpArray[0] == 'I-766')
        {
            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' expiration date:';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        }
        else
        {
            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>'+ tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        }
    }
    if(tmpListType == 'B')
    {
        document.MAIN.issuingAuthBState.style.display='none';
        document.MAIN.issuingAuthB.style.display='';

        document.MAIN.full_doc_1.value = tmpArray[1];

        if(tmpArray[3] != '')
        {
            document.MAIN.issuingAuthB.value = tmpArray[3];
        }
        if(tmpArray[0] == 'DRVRLCNSE')
        {
            document.MAIN.issuingAuthB.style.display='none';
            document.MAIN.issuingAuthBState.style.display='';
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>US driver\'s license number:';
            document.getElementById('exp_dt_B_text').innerHTML = '<font color=red>* </font>US driver\'s license expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'STISSUDID')
        {
            document.MAIN.issuingAuthB.style.display='none';
            document.MAIN.issuingAuthBState.style.display='';
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = 'US State ID card number:';
            document.getElementById('exp_dt_B_text').innerHTML = 'US State ID card expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'GOVISSUDID')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>US ID card number:';
            document.getElementById('exp_dt_B_text').innerHTML = 'US ID card expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'MILITARY')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>US military ID/draft record number:';
            document.getElementById('exp_dt_B_text').innerHTML = 'US military ID/draft record expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'CNDDRVRLIC')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>Canadian driver license number:';
            document.getElementById('exp_dt_B_text').innerHTML = '<font color=red>* </font>Canadian driver license expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = tmpArray[1] +' number:';
            document.getElementById('exp_dt_B_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
    }
    if(tmpListType == 'C')
    {
        if(tmpArray[0] == 'SSN' || tmpArray[0] == 'SSNRPLCMNT')
        {
            document.MAIN.docNumC.value = document.MAIN.pr_employeeSSN.value;
        }
        document.MAIN.full_doc_2.value = tmpArray[1];
        if(tmpArray[3] != '')
        {
            document.MAIN.issuingAuthC.value = tmpArray[3];
        }
        //mmolloy
        //08.10.2009
        document.getElementById("SSN_TR").style.display='none';

        if(tmpArray[3] == 'SSN')
        {
            //mmolloy
            //08.10.2009
            document.getElementById("SSN_TR").style.display='';
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else
        if(tmpArray[3] == 'FS-545')
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
    }
}

function processCitRadio()
{

    if(document.MAIN.pr_citizen_flg[0].checked || document.MAIN.pr_citizen_flg[1].checked)
    {
        document.getElementById('lpr').style.display = 'none';
        document.getElementById('aaw').style.display = 'none';
        document.MAIN.alienId1.value = '';
        document.MAIN.alienId2.value = '';
        document.MAIN.employeeI94.value = '';
        document.MAIN.workUntilDt.value = '';
        document.MAIN.visaNumber.value = '';
    }
    if(document.MAIN.pr_citizen_flg[2].checked)
    {
        document.getElementById('lpr').style.display = '';
        document.getElementById('aaw').style.display = 'none';
        document.MAIN.alienId2.value = '';
        document.MAIN.employeeI94.value = '';
        document.MAIN.workUntilDt.value = '';
        document.MAIN.visaNumber.value = '';

    }
    if(document.MAIN.pr_citizen_flg[3].checked)
    {
        document.getElementById('lpr').style.display = 'none';
        document.getElementById('aaw').style.display = '';
        document.MAIN.alienId1.value = '';
        //Added for DHS v24 on 03/08/2013
        loadCOI();
    }
}

function getBarcodePdf(ssn, resellerId)
{
    if(ssn == null || ssn.length == 0)
    {
        alert('You must enter a SSN before creating this document.');
        return false;
    }
    if(resellerId == '29000' || resellerId == '29300')
    {
        document.getElementById('submit1').disabled = false;
    }
    /* document.MAIN.p_doc_id.value = edc_id; */
    var url = 'BarcodeOnlyPdf.jsp?p_ssn='+ssn;
    var winOpts = '';
    var width = 800;
    var height= 600;
    var top = ((document.body.offsetHeight/2)-(height/2));
    var left = ((document.body.offsetWidth/2)-(width/2));
    winOpts = winOpts + 'width='+width+',left='+left+',';
    winOpts = winOpts + 'height='+height+',top='+top+',';
    winOpts = winOpts + 'status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes';
    window.open(url,'hrmgr', winOpts);
}

function getSupplementBarcodePdf(ssn, resellerId)
{
    if(ssn == null || ssn.length == 0)
    {
        alert('You must enter a SSN before creating this document.');
        return false;
    }
    /* document.MAIN.p_doc_id.value = edc_id; */
    var url = 'SupplementBarcodeOnlyPdf.jsp?p_ssn='+ssn;
    var winOpts = '';
    var width = 800;
    var height= 600;
    var top = ((document.body.offsetHeight/2)-(height/2));
    var left = ((document.body.offsetWidth/2)-(width/2));
    winOpts = winOpts + 'width='+width+',left='+left+',';
    winOpts = winOpts + 'height='+height+',top='+top+',';
    winOpts = winOpts + 'status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes';
    window.open(url,'hrmgr', winOpts);
}

// ----------------------------------------------------------------------------------
// |   Get the documents for list A that are relevant to the citizenship selected   |
// | Used in applicant_verify_summary and verify_summary (remote verification page) |
// ----------------------------------------------------------------------------------
function getDocListAFields(usingDhs, dontShowI551I766Box, resellerId, notary)
{
    document.getElementById('submit1').disabled = false;
    var list	= document.MAIN.listASelect.options[document.MAIN.listASelect.selectedIndex].value;

    // REQUIRES usv_ajax.js (included in help.jsp)
    var dStamp = new Date().getMilliseconds();
    var url = "hrmgr";
    var parms = "p_action=USVAJX&ajaxcall=get_list_a_documentation_fields&p_docCd="+list;

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
            removeOldRows();
            var XMLdoc = helpHttp.responseXML;
            if(window.ActiveXObject) // If IE Windows
            {
                XMLdoc = new ActiveXObject("Microsoft.XMLDOM");
                XMLdoc.loadXML(helpHttp.responseText);
            }
            var xmlDoc = helpHttp.responseXML;
            var docEl=XMLdoc.documentElement;
            var rows=docEl.getElementsByTagName("row");
            var counter	= 0;
            var docCd;
            var tab		= 41;
            for(var i=0,l=rows.length,t;i<l;i++)
            {
                var name	= rows[i].getElementsByTagName("name")[0].firstChild.data;
                var type	= rows[i].getElementsByTagName("type")[0].firstChild.data;
                var display	= rows[i].getElementsByTagName("display")[0].firstChild.data;
                var required= rows[i].getElementsByTagName("required")[0].firstChild.data;
                docCd		= rows[i].getElementsByTagName("docCd")[0].firstChild.data;
                var value 	= rows[i].getElementsByTagName("value")[0].firstChild.data;
                addRowToTable(name, type, display, required, docCd, counter++, value, tab++);
            }

            if(docCd == 'FRNPASSI20' || docCd == 'FRNPASSDS2')
            {
                addStudentBox(counter);
            }

            if(docCd == 'I-551' || docCd == 'I-766' || docCd == 'USPASSPORT')
            {
                if(usingDhs)
                {
                    addPhotocopyBox(counter, dontShowI551I766Box, resellerId, notary);
                    if(resellerId == '29000' || resellerId == '29300')
                    {
                        if(!notary)
                        {
                            document.getElementById('submit1').disabled = true;
                        }
                    }
                }
            }
            expirationDateA1();
            expirationDateA2();
        }
        if (helpHttp.readyState == 4 && helpHttp.status != 200)
        {
            document.getElementById('documentation_div').innerHtml = 'An error occurred while updating document list A. If the problem persists, please contact USVerify.';
        }
    }

    // send the request
    helpHttp.send(parms);

} // END getDocListAFields

//Used in applicant_verify_summary and verify_summary (remote verification page)
function removeOldRows()
{
    var tbl = document.getElementById('startInfo');
    var tr	= document.getElementById('docListACreated1');
    if(tr == null)
        return;
    else
    {
        tbl.deleteRow(tr.rowIndex);
        tr	= document.getElementById('docListACreated0');
        if(null != tr)
            tbl.deleteRow(tr.rowIndex);
        tr	= document.getElementById('docListACreated1');
        if(null != tr)
            tbl.deleteRow(tr.rowIndex);
        tr	= document.getElementById('docListACreated2');
        if(null != tr)
            tbl.deleteRow(tr.rowIndex);
        tr	= document.getElementById('docListACreated3');
        if(null != tr)
            tbl.deleteRow(tr.rowIndex);
        tr	= document.getElementById('docListACreated4');
        if(null != tr)
            tbl.deleteRow(tr.rowIndex);
        tr	= document.getElementById('docListACreated5');
        if(null != tr)
            tbl.deleteRow(tr.rowIndex);
        tr	= document.getElementById('docListACreated6');
        if(null != tr)
            tbl.deleteRow(tr.rowIndex);
        tr	= document.getElementById('docListACreated7');
        if(null != tr)
            tbl.deleteRow(tr.rowIndex);
    }
}

//Used in applicant_verify_summary and verify_summary (remote verification page)
function addRowToTable(name, type, display, required, docCd, id, value, tab)
{
    var tbl = document.getElementById('startInfo');
    var lastRow = tbl.rows.length;
    // if there's no header row in the table, then iteration = lastRow + 1
    var row = tbl.insertRow(lastRow);
    row.id='docListACreated' + id;

    // left cell
    var cellLeft = row.insertCell(0);
    cellLeft.className='data_prompt';
    var cell = '';
    if(required == 'Y')
        cell	= '<font color=red>* </font>';
    cellLeft.innerHTML	= cell + display;


    // select cell
    var cellRight = row.insertCell(1);
    cellRight.className='data';
    cell	= '<input type=text name="'+name+'" onchange="setDirtyFlag(true);" ';
    if(type == "DATE")
        cell	= cell + ' onBlur="runValidatePost(this);" id=p_'+name;
    cell	= cell + ' tabindex='+tab + ' ';
    if(value != 'x')
        cell 	= cell + 'value="'+value+'" ';
    cell = cell + '/>';

    cellRight.innerHTML=cell;
}

//Used in applicant_verify_summary and verify_summary (remote verification page)
function addStudentBox(id)
{
    var tbl = document.getElementById('startInfo');
    var lastRow = tbl.rows.length;
    // if there's no header row in the table, then iteration = lastRow + 1
    var row = tbl.insertRow(lastRow);
    row.id='docListACreated' + id;

    // left cell
    var cellLeft = row.insertCell(0);
    cellLeft.colSpan=2;
    cellLeft.innerHTML	= '<tr ID="student_question"><td colspan=2><div style="width: 50%; padding: 10px; background:#eee; border: solid #aaa 1px;"><table width=100% border=0><tr><td valign=top><input type=checkbox name=studentCheckbox value="Y" /></td><td valign=top style="text-align:left">The student is working outside the program on their DS-2019 or I-20. Please click the checkbox to indicate that you have received a letter from the responsible school officer.</td></tr></table></div></td></tr>';

}


//Used in applicant_verify_summary and verify_summary (remote verification page)
function addPhotocopyBox(id, hidden, resellerId, notary)
{
    var tbl = document.getElementById('startInfo');
    var lastRow = tbl.rows.length;
    // if there's no header row in the table, then iteration = lastRow + 1
    var row = tbl.insertRow(lastRow);
    row.id='docListACreated' + id;

    // left cell
    var cellLeft = row.insertCell(0);
    cellLeft.colSpan=2;
    if(!hidden)
    {
        if(resellerId != '29000' && resellerId != '29300')
        {
            cellLeft.innerHTML    = '<tr ID="photocopy_question"><td colspan=2><div style="width: 55%; padding: 10px; background:#eee; border: solid #aaa 1px;"><table width=100% border=0><tr><td valign=top><input type=checkbox name=photocopyCheckbox value="Y" /></td><td valign=top style="text-align:left">I have made a photocopy of this employee\'s US Passport, I-551 or I-766 documentation. Click <a href="#" onclick="getBarcodePdf(\'-1\', \''+resellerId+'\');">HERE</a> to generate a barcoded document to make the photocopy on.</td></tr></table></div></td></tr>';
        }
        else
        {
            if(!notary)
            {
                cellLeft.innerHTML    = '<tr ID="photocopy_question"><td colspan=2><div style="width: 55%; padding: 10px; background:#eee; border: solid #aaa 1px;"><table width=100% border=0><tr><td valign=top><input type=checkbox name=photocopyCheckbox value="Y" /></td><td valign=top style="text-align:left">Click <a href="#" onclick="getBarcodePdf(\'-1\', \''+resellerId+'\');">HERE</a> to generate a barcoded document. Photocopy the employee\'s US Passport, I-551 or I-766 documentation onto  this form and then fax to the fax number provided on the bottom of the form.</td></tr></table></div></td></tr>';
            }
            else
            {
                cellLeft.innerHTML    = '<tr ID="photocopy_question"><td colspan=2><input type=hidden name="photocopyCheckbox" value="Y" /></td></tr>';
            }
        }
    }
    else
    {
        cellLeft.innerHTML    = '<tr ID="photocopy_question"><td colspan=2><input type=hidden name=photocopyCheckbox value="Y" /></td></tr>';
    }
}



function showList(value, usingDhs, dontShowI551I766Text, resellerId, notary)
{
    removeOldRows();
    document.getElementById('documentation_div').style.display = 'none';
    if(value == '')
    {
        document.getElementById('list_a').style.display = 'none';
        document.getElementById('bc_select').style.display='none';
        document.getElementById('bc_header').style.display='none';
    }
    else if(value == 'A')
    {
        document.getElementById('list_a').style.display = '';
        document.getElementById('bc_select').style.display='none';
        document.getElementById('bc_header').style.display='none';
        getDocListAFields(usingDhs, dontShowI551I766Text, resellerId, notary);
    }
    else if(value == 'BC')
    {
        document.MAIN.listASelect.selectedIndex	= 0;
        document.getElementById('list_a').style.display = 'none';
        document.getElementById('bc_select').style.display='';
        document.getElementById('bc_header').style.display='';
        getDocListBCFields();
    }
}

function getDocListBCFields()
{
    document.getElementById('submit1').disabled = false;

    var bValue	= document.MAIN.tmpDocTitleB.options[document.MAIN.tmpDocTitleB.selectedIndex].value;
    var cValue	= document.MAIN.tmpDocTitleC.options[document.MAIN.tmpDocTitleC.selectedIndex].value;
    tmpArray	= bValue.split('|');
    bValue	= tmpArray[0];

    // REQUIRES usv_ajax.js (included in help.jsp)
    var dStamp = new Date().getMilliseconds();
    var url = "hrmgr";
    var parms = "p_action=USVAJX&ajaxcall=get_list_bc_documentation_fields&p_listBDocCd="+bValue;
    parms	= parms + "&p_listCDocCd="+cValue;
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
            document.getElementById('documentation_div').innerHTML = helpHttp.responseText;
            document.getElementById('documentation_div').style.display = '';
            var obj	= document.MAIN.issuingAuthB;
            if(obj.tagName == 'SELECT')
            {
                for(var i = 0; i < document.MAIN.issuingAuthB.options.length; i++)
                {
                    if(document.MAIN.issuingAuthB.options[i].value == '<c:out value="${i9.issuingAuthB}" />')
                    {
                        document.MAIN.issuingAuthB.selectedIndex	= i;
                        break;

                    }
                }
            }
            //Calling these two scripts adds the calendar javascript to the list b and c date fields
            //mmolloy
            //10.06.2009
            expirationDateB();
            expirationDateC();
        }
        if (helpHttp.readyState == 4 && helpHttp.status != 200)
        {
            document.getElementById('documentation_div').innerHtml = 'An error occurred while updating document list A. If the problem persists, please contact USVerify.';
        }
    }

    // send the request
    helpHttp.send(parms);

} // END getDocListBCFields

// Spanish scripts

function sp_splitValues(value, token1, erase)
{
    var tmpArray = new Array();
    tmpArray = value.split(token1);
    var tmpListType = tmpArray[2];

    if(tmpListType == 'A')
    {
        if(erase == 'true')
        {
            document.MAIN.docNum1A.value = '';
            document.MAIN.docNum2A.value = '';
            document.MAIN.ExpDt1A.value = '';
            document.MAIN.ExpDt2A.value = '';
            document.MAIN.issuingAuthA.value = tmpArray[3];
        }
        document.MAIN.listASelected.value = value;
        document.MAIN.docTitleA.value = tmpArray[0];
        document.MAIN.full_doc_1.value = tmpArray[1];
        document.MAIN.list_a_help.value = tmpArray[0];
        document.getElementById('student_question').style.display = 'none';
        document.getElementById('photocopy_question').style.display = 'none';
        if(tmpArray[0] == 'FRNPASI551')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>N�mero de Pasaporte de Extranjero:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de Pasaporte de Extranjero (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>N�mero de I-551:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de I-551 (si aplicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-551';
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
        }
        else
        if(tmpArray[0] == 'I-94')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>N�mero de Pasaporte de Extranjero:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de Pasaporte de Extranjero (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-94';
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>N�mero de I-94:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de I-94 (si aplicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
        }
        else
        if(tmpArray[0] == 'FRNPASSDS2')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>N�mero de Pasaporte de Extranjero:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de Pasaporte de Extranjero (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>N�mero de I-94:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de DS-2019 (si aplicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'DS-2019';
            document.getElementById('student_question').style.display = '';
        }
        else
        if(tmpArray[0] == 'FRNPASSI20')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>N�mero de Pasaporte de Extranjero:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de Pasaporte de Extranjero (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>N�mero de I-94:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de I-20 (si aplicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-20';
            document.getElementById('student_question').style.display = '';
        }
        else if (tmpArray[0] == 'I-551')
        {
            document.MAIN.issuingAuthA.value='DHS';
            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('photocopy_question').style.display = '';
        }
        else
        {
            if(tmpArray[0] == 'I-766')
            {
                document.getElementById('photocopy_question').style.display = '';
                document.MAIN.issuingAuthA.value='DHS';
            }
            if (tmpArray[0] == 'USPASSPORT')
            {
                document.MAIN.issuingAuthA.value='US Government';
            }

            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        }
    }
    if(tmpListType == 'B')
    {
        document.MAIN.list_b_help.value = tmpArray[0];
        document.MAIN.listBSelected.value = value;
        if(tmpArray[0] == 'DRVRLCNSE')
        {
            if (tmpArray[3] == '')
                tmpArray[3] = 'DMV';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>N�mero de permiso de conducir estadounidense:';
            document.getElementById('exp_dt_B_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de permiso de conducir estadounidense (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'STISSUDID')
        {
            if (tmpArray[3] == '')
                tmpArray[3] = 'DMV';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = 'N�mero de permiso de conducir estadounidense:';
            document.getElementById('exp_dt_B_text').innerHTML = 'Fecha de expiraci�n de permiso de conducir estadounidense (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'GOVISSUDID')
        {
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>N�mero de Tarjeta de Identificaci�n de los EEUU:';
            document.getElementById('exp_dt_B_text').innerHTML = 'Fecha de expiraci�n de Tarjeta de Identificaci�n de los EEUU (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'MILITARY')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>Identificaci�n militar de los EEUU/número de reclutamiento:';
            document.getElementById('exp_dt_B_text').innerHTML = 'Fecha de expiraci�n de Identificaci�n militar de los EEUU /N�mero de reclutamiento (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'CNDDRVRLIC')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>N�mero de permiso de conducir canidense:';
            document.getElementById('exp_dt_B_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de permiso de conducir canidense(si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = tmpArray[1] +' number:';
            document.getElementById('exp_dt_B_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
    }
    if(tmpListType == 'C')
    {
        document.MAIN.list_c_help.value = tmpArray[0];
        document.MAIN.listCSelected.value = value;
        document.getElementById('student_questionC').style.display = 'none';

        if(tmpArray[0] == 'SSN' || tmpArray[0] == 'SSNRPLCMNT')
        {
            document.MAIN.docNumC.value = document.MAIN.pr_employeeSSN.value;
        }
        else
            document.MAIN.docNumC.value = '';

        document.MAIN.ExpDtC.value = '';
        document.MAIN.issuingAuthC.value = tmpArray[3];
        document.MAIN.full_doc_2.value = tmpArray[1];

        if(tmpArray[0] == 'SSN')
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else if(tmpArray[0] == 'BIRTHCC' || tmpArray[0] == 'I-197' || tmpArray[0] == 'I-179' || tmpArray[0] == 'DS-1350' || tmpArray[0] == 'FS-545')
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else if(tmpArray[0] == 'UNEXPEMAU' || tmpArray[0] == 'SSNRPLCMNT')
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else if(tmpArray[0] == 'I20' || tmpArray[0] == 'DS2019')
        {
            document.MAIN.issuingAuthC.value='';
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
            document.getElementById('student_questionC').style.display = '';
        }
        else
        {
            document.MAIN.full_doc_2.value = tmpArray[1];
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
    }
}

function sp_splitValuesOnLoad(value, token1)
{
    var tmpArray = new Array();
    tmpArray = value.split(token1);
    var tmpListType = tmpArray[2];

    if(tmpListType == 'A')
    {
        document.MAIN.full_doc_1.value = tmpArray[1];
        document.MAIN.full_doc_2.value = tmpArray[1];
        document.MAIN.docTitleA.value = tmpArray[0];

        if(tmpArray[3] != '')
        {
            document.MAIN.issuingAuthA.value = tmpArray[3];
        }
        if(tmpArray[0] == 'FRNPASI551')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>N�mero de Pasaporte de Extranjero:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de Pasaporte de Extranjero (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>N�mero de I-551:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de I-551(si aplicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-551';
        }
        else
        if(tmpArray[0] == 'I-94')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>N�mero de Pasaporte de Extranjero:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de Pasaporte de Extranjero (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>N�mero de I-94:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de I-94 (si aplicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-94';
        }
        else
        if(tmpArray[0] == 'FRNPASSDS2')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>N�mero de Pasaporte de Extranjero:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de Pasaporte de Extranjero (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>N�mero de I-94:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de DS-2019 (si aplicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'DS-2019';
        }
        else
        if(tmpArray[0] == 'FRNPASSI20')
        {
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>N�mero de Pasaporte de Extranjero:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de Pasaporte de Extranjero (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
            document.getElementById('doc_num_2A_text').innerHTML = '<font color=red>* </font>N�mero de I-94:';
            document.getElementById('exp_dt_2A_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de I-20(si aplicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_2A_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_2A_text').innerHTML;
            document.getElementById('doc_num_2A_row').style.display = '';
            document.getElementById('exp_dt_2A_row').style.display = '';
            document.MAIN.full_doc_1.value = 'Foreign passport';
            document.MAIN.full_doc_2.value = 'I-20';
        }
        else if (tmpArray[0] == 'I-551')
        {
            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        }
        else
        {
            document.getElementById('doc_num_2A_row').style.display = 'none';
            document.getElementById('exp_dt_2A_row').style.display = 'none';
            document.getElementById('doc_num_1A_text').innerHTML = '<font color=red>* </font>'+tmpArray[1] +' number:';
            document.getElementById('exp_dt_1A_text').innerHTML = '<font color=red>* </font>'+ tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_1A_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_1A_text').innerHTML;
        }
    }
    if(tmpListType == 'B')
    {
        document.MAIN.full_doc_1.value = tmpArray[1];

        if(tmpArray[3] != '')
        {
            document.MAIN.issuingAuthB.value = tmpArray[3];
        }
        if(tmpArray[0] == 'DRVRLCNSE')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>N�mero de permiso de conducir estadounidense:';
            document.getElementById('exp_dt_B_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de permiso de conducir estadounidense (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'STISSUDID')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = 'N�mero de permiso de conducir estadounidense:';
            document.getElementById('exp_dt_B_text').innerHTML = 'Fecha de expiraci�n de permiso de conducir estadounidense (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'GOVISSUDID')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>N�mero de Tarjeta de Identificaci�n de los EEUU:';
            document.getElementById('exp_dt_B_text').innerHTML = 'Fecha de expiraci�n de Tarjeta de Identificaci�n de los EEUU (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'MILITARY')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>Identificaci�n militar de los EEUU/N�mero de reclutamiento:';
            document.getElementById('exp_dt_B_text').innerHTML = 'Fecha de expiraci�n de Identificaci�n militar de los EEUU /N�mero de reclutamiento (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        if(tmpArray[0] == 'CNDDRVRLIC')
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = '<font color=red>* </font>N�mero de permiso de conducir canidense:';
            document.getElementById('exp_dt_B_text').innerHTML = '<font color=red>* </font>Fecha de expiraci�n de permiso de conducir canidense (si aplicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
        else
        {
            document.MAIN.docNumB.value = '';
            document.MAIN.ExpDtB.value = '';
            document.MAIN.issuingAuthB.value = tmpArray[3];
            document.MAIN.full_doc_1.value = tmpArray[1];
            document.MAIN.docTitleB.value = tmpArray[0];
            document.getElementById('doc_num_B_text').innerHTML = tmpArray[1] +' number:';
            document.getElementById('exp_dt_B_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum1Text.value = document.getElementById('doc_num_B_text').innerHTML;
            document.MAIN.ExpDt1Text.value = document.getElementById('exp_dt_B_text').innerHTML;
        }
    }
    if(tmpListType == 'C')
    {
        if(tmpArray[0] == 'SSN' || tmpArray[0] == 'SSNRPLCMNT')
        {
            document.MAIN.docNumC.value = document.MAIN.pr_employeeSSN.value;
        }
        document.MAIN.full_doc_2.value = tmpArray[1];
        if(tmpArray[3] != '')
        {
            document.MAIN.issuingAuthC.value = tmpArray[3];
        }
        if(tmpArray[3] == 'SSN')
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else
        if(tmpArray[3] == 'FS-545')
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
        else
        {
            document.MAIN.docTitleC.value = tmpArray[0];
            document.getElementById('doc_num_C_text').innerHTML = '<font color=red>* </font>' + tmpArray[1] +' number:';
            document.getElementById('exp_dt_C_text').innerHTML = tmpArray[1] +' expiration date (if applicable):';
            document.MAIN.docNum2Text.value = document.getElementById('doc_num_C_text').innerHTML;
            document.MAIN.ExpDt2Text.value = document.getElementById('exp_dt_C_text').innerHTML;
        }
    }
}

function sp_processCitRadio()
{

    if(document.MAIN.pr_citizen_flg[0].checked || document.MAIN.pr_citizen_flg[1].checked)
    {
        document.getElementById('lpr').style.display = 'none';
        document.getElementById('aaw').style.display = 'none';
        document.MAIN.alienId1.value = '';
        document.MAIN.alienId2.value = '';
        document.MAIN.employeeI94.value = '';
        document.MAIN.workUntilDt.value = '';
        document.MAIN.visaNumber.value = '';
    }
    if(document.MAIN.pr_citizen_flg[2].checked)
    {
        document.getElementById('lpr').style.display = '';
        document.getElementById('aaw').style.display = 'none';
        document.MAIN.alienId2.value = '';
        document.MAIN.employeeI94.value = '';
        document.MAIN.workUntilDt.value = '';
        document.MAIN.visaNumber.value = '';

    }
    if(document.MAIN.pr_citizen_flg[3].checked)
    {
        document.getElementById('lpr').style.display = 'none';
        document.getElementById('aaw').style.display = '';
        document.MAIN.alienId1.value = '';
    }
}

function sp_getBarcodePdf(ssn)
{
    if(ssn == null || ssn.length == 0)
    {
        alert('Debe indicar un N�mero de Seguridad Social antes de crear este documento.');
        return false;
    }
    /* document.MAIN.p_doc_id.value = edc_id; */
    var url = 'BarcodeOnlyPdf.jsp?p_ssn='+ssn;
    var winOpts = '';
    var width = 800;
    var height= 600;
    var top = ((document.body.offsetHeight/2)-(height/2));
    var left = ((document.body.offsetWidth/2)-(width/2));
    winOpts = winOpts + 'width='+width+',left='+left+',';
    winOpts = winOpts + 'height='+height+',top='+top+',';
    winOpts = winOpts + 'status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes';
    window.open(url,'i9web', winOpts);
}

function emptySelectList(select)
{
    for(i=select.options.length-1;i>=0;i--)
    {
        removeOption(select, i);
    }
}

function showFilteredList(select, result)
{
//      alert(result);
    var obj = eval('(' + result + ')');
    var showPopup = obj.entries[0];
//        alert(showPopup[1100]);
    for(key in showPopup)
    {
        alert(key+"="+showPopup[key]);
    }

}


function removeOptionList(formGroups, additionalFormGroups, selectedFormGroups, page)
{
    for(i=selectedFormGroups.options.length-1;i>=0;i--)
    {
        if(selectedFormGroups[i].selected)
        {
            var input   = "Hire -";
            if(selectedFormGroups[i].text.substr(0, input.length) === input)
                addOption(formGroups, selectedFormGroups[i].text, selectedFormGroups[i].value);
            else
                addOption(additionalFormGroups, selectedFormGroups[i].text, selectedFormGroups[i].value);
            removeOption(selectedFormGroups,i);
        }
    }
    if(page == 'send_email') {

        var formArray = [];
        for(i = selectedFormGroups.options.length-1; i >= 0; i--) {
            formArray.push(selectedFormGroups[i].value);
        }
        checkShowState(formArray);
    }

}

function checkShowState(formGroupIds) {
    $.getJSON("hrmgr?p_action=dispatcher&p_handler=1400&p_dispatcherCode=100&formGroupIds="+formGroupIds, function(data) {
        if(data == 'true'){
            showStateSelect(true);
        }
        else {
            showStateSelect(false);
        }
    });
}


function showStateSelect(show) {
    if(show) {
        if($("#state_select_row").length == 0) {
            $("#target_row").before('<tr id="state_select_row"><td class="data_prompt"><font color="red">* </font>State<br/><select name="pr_state"><option/></option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option> <option value="FL">Florida</option> <option value="GA">Georgia</option> <option value="HI">Hawaii</option> <option value="ID">Idaho</option> <option value="IL">Illinois</option> <option value="IN">Indiana</option> <option value="IA">Iowa</option> <option value="KS">Kansas</option> <option value="KY">Kentucky</option> <option value="LA">Louisiana</option> <option value="ME">Maine</option> <option value="MD">Maryland</option> <option value="MA">Massachusetts</option> <option value="MI">Michigan</option> <option value="MN">Minnesota</option> <option value="MS">Mississippi</option> <option value="MO">Missouri</option> <option value="MT">Montana</option> <option value="NE">Nebraska</option> <option value="NV">Nevada</option> <option value="NH">New Hampshire</option> <option value="NJ">New Jersey</option> <option value="NM">New Mexico</option> <option value="NY">New York</option> <option value="NC">North Carolina</option> <option value="ND">North Dakota</option> <option value="OH">Ohio</option> <option value="OK">Oklahoma</option> <option value="OR">Oregon</option> <option value="PA">Pennsylvania</option> <option value="RI">Rhode Island</option> <option value="SC">South Carolina</option> <option value="SD">South Dakota</option> <option value="TN">Tennessee</option> <option value="TX">Texas</option> <option value="UT">Utah</option> <option value="VT">Vermont</option> <option value="VA">Virginia</option> <option value="WA">Washington</option> <option value="WV">West Virginia</option> <option value="WI">Wisconsin</option> <option value="WY">Wyoming</option></select></td></tr>');
        }
    }
    else {
        $('#state_select_row').remove();
    }
}

function addOptionList(formGroups, selectedFormGroups, page)
{
    for(i=formGroups.options.length-1;i>=0;i--)
    {
        if(formGroups[i].selected)
        {
            addOption(selectedFormGroups, formGroups[i].text, formGroups[i].value);
            removeOption(formGroups,i);
        }
    }


    if(page == 'send_email') {
        var formArray = [];

        for(i = selectedFormGroups.options.length-1; i >= 0; i--) {
            formArray.push(selectedFormGroups[i].value);
        }
        checkShowState(formArray);
    }
}

function addOption(selectbox,text,value )
{
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
}

function removeOption(listbox,i)
{
    listbox.remove(i);
}

// END FORM GROUP FUNCTIONS

function emptySelectList(select)
{
    for(i=select.options.length-1;i>=0;i--)
    {
        removeOption(select, i);
    }
}

function showFilteredList(select, result)
{
    var obj = eval('(' + result + ')');
    for(var i = 0; i < obj.length; i++)
    {
        var v   = obj[i];
        for(key in v)
        {
            select[select.length] = new Option(v[key], key);
        }
    }
}

function filter(searchString, select, packetCode)
{

    var parms = "p_action=USVAJX&ajaxcall=filter_form_groups&searchString="+searchString+"&packetCode="+packetCode;

    var url = "hrmgr";

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
            var result    = secondHttpObject.responseText;
            populateBox(select, result);
        }
        if (secondHttpObject.readyState == 4 && secondHttpObject.status != 200)
        {
            alert( 'An error occurred while assigning a form group to this employee. Please contact USVerify.');
        }
    }

    // send the request
    secondHttpObject.send(parms);

} // END

function populateBox(select, results)
{
    emptySelectList(select);
    showFilteredList(select, results);
}


function openCustomizeablePdf(docRowId)
{
    /* document.MAIN.p_doc_id.value = edc_id; */
    var url = 'CustomizedPdfTemplate.jsp?p_doc_row_id='+docRowId;
    var winOpts = '';
    var width = 800;
    var height= 600;
    var top = ((document.body.offsetHeight/2)-(height/2));
    var left = ((document.body.offsetWidth/2)-(width/2));
    winOpts = winOpts + 'width='+width+',left='+left+',';
    winOpts = winOpts + 'height='+height+',top='+top+',';
    winOpts = winOpts + 'status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes';
    window.open(url,'hrmgr', winOpts);
}

function jQueryCombo(pId)
{
    $("#"+pId).ufd({log:true});
}

// Pass in the id of the select box, what you want it to be labeled, then for mult: true to select multiple values, false to only allow to choose one value.
function multiSelectBox(selectId, defaultText, mult)
{
    $("#"+selectId).multiselect({noneSelectedText: defaultText, selectedText: "# of # selected", selectedList: 8, show: "blind", hide: "blind", multiple: mult}).multiselectfilter();
};


//Added for DHS v24 on 03/08/2013
coiLoaded = false;
function loadCOI() {
    if (!coiLoaded) {
        $.ajax({
            type: "POST",
            url: "hrmgr",
            data: {p_action:'USVAJX', ajaxcall:'get_coi'},
//                                contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                $("#coiSel").get(0).options.length = 0;
                $("#coiSel").get(0).options[0] = new Option("Select Country of Issuance", "-1");

                var html = '';
                var len = data.length;
                for (var i = 0; i< len; i++) {
                    html += '<option value="' + data[i].optionValue + '">' + data[i].optionDisplay + '</option>';
                }
                $("#coiSel").append(html);

                document.getElementById('coiSel').value = (document.getElementById('hid_dhsCoi').value);
//alert(document.getElementById('hid_dhsCoi').value);
            },
            error: function() {
                alert("Failed to load Country of Issuance");
            }
        });

        coiLoaded = true;
    }
}
