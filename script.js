var date = new Date();

function sundaysInMonth(m, y) {

  var days = new Date(y, m, 0).getDate();
  var sundays = [8 - (new Date(m + '/01/' + y).getDay())];
  for (var i = sundays[0] + 7; i < days; i += 7) {
    sundays.push(i);
  }
  return sundays;
}

function selectYear() {
  
  let year = document.querySelector('#year').value;
  if (year == '') year = date.getFullYear();
  let month = document.querySelector('#month').value;
  if (month == '') month = date.getMonth();
  switch (month) {
      case 'Styczeń': 
          month = 1;
          break;

      case 'Luty': 
          month = 2;
          break;

      case 'Marzec': 
          month = 3;
          break;

      case 'Kwiecień': 
          month = 4;
          break;

      case 'Maj': 
          month = 5;
          break;

      case 'Czerwiec': 
          month = 6;
          break;

      case 'Lipiec': 
          month = 7;
          break;

      case 'Sierpień': 
          month = 8;
          break;

      case 'Wrzesień': 
          month = 9;
          break;

      case 'Październik': 
          month = 10;
          break;

      case 'Listopad': 
          month = 11;
          break;

      case 'Grudzień': 
          month = 12;
          break;

      default:
          alert('Błędnie wprowadzone dane:\n Proszę wybrać miesiąć z listy' )
          break;
  }

  date = new Date(year, month - 1, 1);
  renderCalendar();

}

function save() {
  document.getElementById("saveBtn").addEventListener("click", () => {
    const cal = this.document.querySelector(".calendar");

    html2pdf().from(cal).save();
  })
}

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()] + " " + date.getFullYear();
  document.querySelector(".date p").innerHTML = new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: '2-digit' }); 
  document.querySelector("#year").value = date.getFullYear();
  document.querySelector("#month").value = months[date.getMonth()];

  let days = "";

  var s = 0;
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`;
    }
    else {

      if (i === sundaysInMonth((date.getMonth() + 1), date.getFullYear())[s]) {
        days += `<div class="sunday">${i}</div>`;
        s++;
      }
      else {
        days += `<div>${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;

  }
  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();


