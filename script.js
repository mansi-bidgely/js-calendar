function generateYearRange(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
    years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

today = new Date();
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
  if (para == "prev") {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  }
  else if (para == 'next') {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
  }
  showCalendar(currentMonth, currentYear);
}


function changeMonthYear() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  document.getElementById("dateCurrent").innerHTML = "";
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
    today.getFullYear(),
    today.getMonth(),
    0
  ).getDate();
  var date = 1;
  var dateNext = 1;

  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        var cell = document.createElement("td");
        cell.innerHTML = "<span class='prevDate' disabled>" + (prevDate - firstDay + j + 1) + "</span>";
        row.appendChild(cell);
      }
      else if (date > daysInMonth(month, year)) {
        var cell = document.createElement("td");

        cell.innerHTML = "<span class='prevDate' disabled>" + dateNext + "</span>";
        row.appendChild(cell);
        dateNext++;

      }
      else {
        cell = document.createElement("td");
        cell.innerHTML = "<span>" + date + "</span>";
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
        table.rows[i].cells[j].onclick = function () {
          getval(this);
        };
    }
  }
  var day = today.getDay();

  document.getElementById("day").innerHTML = dayDefault[day] + "day";

  function getval(cel) {
    var k = cel.innerHTML

    document.getElementById("dateCurrent").innerHTML = k;
    document.getElementById("day").innerHTML = dayDefault[k] + "day";


  }

}


function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}