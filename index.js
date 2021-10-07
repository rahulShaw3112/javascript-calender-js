const currentCalenderBodyEl = document.getElementById('table-body');
const currentCalenderMonthAndYearEl = document.getElementById('curr-month');
const nextBtnEl = document.getElementById('next-month');
const prevBtnEl = document.getElementById('prev-month');
const eventTitleEl = document.getElementById('event-title');
const eventAddButtonEl = document.getElementById('event-add-button');
const currentEventListEl = document.getElementById('current-event-list');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const events = [];

const currentDate = new Date();
let currentSelectedDate = new Date();

showCalender(currentYear, currentMonth);
ShowEventList(currentYear, currentMonth, currentDate.getDate());

function showCalender(year, month) {
    currentCalenderBodyEl.innerHTML = '';
    ShowEventList(year, month, 1);
    currentCalenderMonthAndYearEl.innerHTML = months[month] + ', ' + year;
    const firstDay = new Date(year, month).getDay();
    const numberOfDays = getNumberOfDays(year, month);
    let dayInMonth = 1;
    for(let i=0; i<6;i++) {
        let newWeekEl = document.createElement('tr');
        newWeekEl.classList.add('week')
        for(let j=0; j<7; j++) {
            const newDayInWeekEl = document.createElement('td');
            newDayInWeekEl.classList.add('day')
            if(i === 0 && j < firstDay -1) {
                newDayInWeekEl.textContent = '';
            } else if(dayInMonth > numberOfDays) {
                break;
            } else {
                if (dayInMonth === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                    newDayInWeekEl.classList.add('curr-day');
                }
                newDayInWeekEl.textContent = dayInMonth;
                dayInMonth += 1;
            }
            newWeekEl.append(newDayInWeekEl);
        }
        currentCalenderBodyEl.append(newWeekEl);
    }
    AddEventEventListener();
}

function getNumberOfDays(year, month) {
    return 32 - (new Date(year, month, 32)).getDate();
}

function showNextMonth() {
    debugger;
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    showCalender(currentYear, currentMonth);
}

function showPrevMonth() {
    debugger;
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalender(currentYear, currentMonth);
}

function addEventToCalender() {
    const eventTitle = eventTitleEl.value;
    eventTitleEl.value = '';
    events.push({dt: currentSelectedDate, title: eventTitle});
    ShowEventList(currentYear, currentMonth, currentSelectedDate.getDate());
}

function changeSelectedDate(e) {
    const prevSelection = document.getElementsByClassName('selected');
    if( prevSelection && prevSelection.length > 0 ) {
        prevSelection[0].classList.remove('selected');
    }
    currentSelectedDate = new Date(currentYear, currentMonth, e.target.textContent);
    ShowEventList(currentYear, currentMonth,e.target.textContent);
    e.target.classList.add('selected');

}

function ShowEventList(year, month, day) {
    const eventDate = new Date(year, month, day);
    const eventListToShow = events.filter(event => event.dt.toDateString() == eventDate.toDateString());
    currentEventListEl.innerHTML = '';
    if (eventListToShow && eventListToShow.length > 0) {
        eventListToShow.forEach(event => {
            const newEvEl = document.createElement('li');
            newEvEl.textContent = event.title;
            currentEventListEl.append(newEvEl);
        });
    } else {
        const emptyTextEl = document.createElement('li')
        emptyTextEl.textContent = "No events";
        currentEventListEl.append(emptyTextEl);
    }
}

function AddEventEventListener() {
    const daysShown = document.getElementsByClassName('day');
    Array.prototype.forEach.call(daysShown, function(el) {
        el.addEventListener('click', changeSelectedDate);
    });
}

prevBtnEl.addEventListener('click', showPrevMonth);
nextBtnEl.addEventListener('click', showNextMonth);
eventAddButtonEl.addEventListener('click', addEventToCalender);
