var eventData = {
    '2020-5-17': [{
      id: 1,
      name: 'event1',
      detail: 'detail for event 2'
    }],
    '2017-2-20': [{
        id: 2,
        name: 'event2',
        detail: 'detail for event 2'
      },
      {
        id: 3,
        name: 'event3',
        detail: 'detail for event 3'
      }
    ]
  }

function generateYearRange(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
    years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}
today = new Date();
var dateShow = today.getDate();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
createYear = generateYearRange(1970, 2050);
document.getElementById("year").innerHTML = createYear;
var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');
var months = "";
var days = "";
var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
for (m = 0; m <= 11; m++) {
  var optn = document.createElement("OPTION");
  optn.text = monthDefault[m];
  optn.value = (m);
  document.getElementById('month').options.add(optn);
}
var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
months = monthDefault;
days = dayDefault;
var $dataHead = "<tr>";
for (dhead in days) {
  $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";
document.getElementById("theadMonth").innerHTML = $dataHead;
monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function moveDate(para) {
  document.getElementById("events-container").innerHTML = "";
  if (para == "prev") {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  } else if (para == 'next') {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
  }
  showCalendar(currentMonth, currentYear);
}

function changeMonthYear() {
  document.getElementById("events-container").innerHTML = "";
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  if (currentYear == '1970' && currentMonth == '0') {
    document.getElementById("next").style.display = "block";
    document.getElementById("previous").style.display = "none";
  } else if (currentYear == '2050' && currentMonth == '11') {
    document.getElementById("previous").style.display = "block";
    document.getElementById("next").style.display = "none";
  } else {}
  showCalendar(currentMonth, currentYear);
}
var day = today.getDay();
document.getElementById("day").innerHTML = dayDefault[day] + "day";



function showCalendar(month, year) {
  var firstDay = (new Date(year, month)).getDay();
  table = document.getElementById("calendarBody");
  table.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;
  var prevDate = new Date(
    currentYear,
    currentMonth,
    0
  ).getDate();
  var date = new Date(
    currentYear,
    currentMonth
  ).getDate();
  var dateNext = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        var cell = document.createElement("td");
        cell.className = "date-picker";
        cell.innerHTML = "<span class='prevDate' disabled>" + (prevDate - firstDay + j + 1) + "</span>";
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        var cell = document.createElement("td");
        cell.className = "date-picker";
        cell.innerHTML = "<span class='prevDate' disabled>" + dateNext + "</span>";
        row.appendChild(cell);
        dateNext++;
      } else {
        cell = document.createElement("td");
        cell.className = "date-picker";
        cell.innerHTML = date;
        var dateStr = year + '-' + month + '-' + date;
        if (typeof eventData[dateStr] != 'undefined') {
          cell.className = "event selected";
        }
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.className = "date-picker selected";
        }
        row.appendChild(cell);
        date++;
      }
    }
    table.appendChild(row);
  }
  if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function() {
          getval(this);
        };
    }
  }
  var day = today.getDay();
  document.getElementById("day").innerHTML = dayDefault[day] + "day";

  function getval(cel) {
    var k = cel.innerHTML
    document.getElementById("dateCurrent").innerHTML = k;
    var dateStr = year + '-' + month + '-' + k;
    if (typeof eventData[dateStr] != 'undefined') {
      var tempData = eventData[dateStr];
      for (var i = 0; i < tempData.length; i++) {
        document.getElementById("events-container").innerHTML = tempData[i].detail;
      };
    }
    else {
       document.getElementById("events-container").innerHTML = "";
    }
   document.getElementById("day").innerHTML = dayDefault[k] + "day";    
  }
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}