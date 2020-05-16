function generate_year_range(start, end) {
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
createYear = generate_year_range(1970, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */
document.getElementById("year").innerHTML = createYear;
var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');
var months = "";
var days = "";
var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
months = monthDefault;
days = dayDefault;
var $dataHead = "<tr>";
for (dhead in days) {
  $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";
//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;
monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  var firstDay = (new Date(year, month)).getDay();
  tbl = document.getElementById("calendar-body");
  tbl.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;
  // creating all cells
  var date = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
       
        cell.innerHTML = "<span>" + date + "</span>";
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.className = "date-picker selected";
        }
        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row);
  }
  var allTableCells = document.getElementsByTagName("td");
  for (var i = 0, max = allTableCells.length; i < max; i++) {
    var node = allTableCells[i];
    var currentText = node.childNodes[0].nodeValue;
    if (currentText === "")
      node.style.backgroundColor = "#D3D3D3";
  }
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}