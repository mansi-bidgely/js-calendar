function generate_year_range(start, end)
{
  var years = "";
  for (var year = start; year <= end; year++)
  {
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

var monthArray = new Array();
monthArray[0] = "January";
monthArray[1] = "February";
monthArray[2] = "March";
monthArray[3] = "April";
monthArray[4] = "May";
monthArray[5] = "June";
monthArray[6] = "July";
monthArray[7] = "August";
monthArray[8] = "September";
monthArray[9] = "October";
monthArray[10] = "November";
monthArray[11] = "December";
for (m = 0; m <= 11; m++)
{
  var optn = document.createElement("OPTION");
  optn.text = monthArray[m];  
  optn.value = (m);

  document.getElementById('month').options.add(optn);
}

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
for (dhead in days)
{
  $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";
document.getElementById("thead-month").innerHTML = $dataHead;
monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function moveDate(para)
{
  if (para == "prev")
  {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  }
  else if (para == 'next')
  {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
  }
  showCalendar(currentMonth, currentYear);
}

function change_month_year()
{
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  document.getElementById("date-current").innerHTML = "";

  showCalendar(currentMonth, currentYear);
}


function showCalendar(month, year)
{
  var firstDay = (new Date(year, month)).getDay();
  table = document.getElementById("calendar-body");
  table.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;
  var prevDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    0
  ).getDate();
  // creating all cells
  var date = 1;
  for (var i = 0; i < 6; i++)
  {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++)
    {
      if (i === 0 && j < firstDay)
      {


        var cell = document.createElement("td");


        cell.innerHTML = "<span class='prev-date' disabled>" + (prevDate - firstDay + j + 1) + "</span>";
        row.appendChild(cell);


      }
      else if (date > daysInMonth(month, year))
      {
        break;
      }
      else
      {
        cell = document.createElement("td");

        cell.innerHTML = "<span>" + date + "</span>";
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth())
        {
          cell.className = "date-picker selected";
        }
        row.appendChild(cell);
        date++;
      }
    }
    table.appendChild(row);
  }
  var allTableCells = document.getElementsByTagName("td");

  for (var i = 0, max = allTableCells.length; i < max; i++)
  {
    var node = allTableCells[i];
    var currentText = node.childNodes[0].nodeValue;
    if (currentText === "")
      node.style.backgroundColor = "#D3D3D3";
  }
  if (table != null)
  {
    for (var i = 0; i < table.rows.length; i++)
    {
      for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function ()
        {
          getval(this);
        };
    }
  }

  function getval(cel)
  {
    var k = cel.innerHTML
    document.getElementById("date-current").innerHTML = k + " " + months[month] + " " + year;

  }

}

function daysInMonth(iMonth, iYear)
{
  return 32 - new Date(iYear, iMonth, 32).getDate();
}