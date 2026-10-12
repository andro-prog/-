const calendarTitle = document.getElementById('calendar-title')
const calendarGrid = document.getElementById('calendar-grid')
const prevBtn = document.getElementById('prev-month')
const nextBtn = document.getElementById('next-month')

const themeToggle = document.getElementById('theme-toggle')
const descTextarea = document.getElementById('task-desc')
const charCountSpan = document.getElementById('char-count')
const tagButtons = document.querySelectorAll('.tag-btn')

// Новые элементы управления формой и списком сегодня
const taskTitleInput = document.getElementById('task-title')
const taskTimeInput = document.getElementById('task-time')
const taskReminderSelect = document.getElementById('task-reminder-time')
const saveTaskBtn = document.getElementById('save-task-btn')
const todayList = document.getElementById('today-list')
const todayCountSpan = document.getElementById('today-count')

// Элементы плашки даты справа
const badgeDateNum = document.getElementById('badge-date-num')
const badgeDayName = document.getElementById('badge-day-name')
const badgeFullDate = document.getElementById('badge-full-date')

const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const monthsGenitive = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
]

const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

// База данных напоминаний (берём из LocalStorage или создаём пустой массив)
let reminders = JSON.parse(localStorage.getItem('savedReminders')) || []

const currentDate = new Date()
let currentMonth = currentDate.getMonth() 
let currentYear = currentDate.getFullYear() 

// По умолчанию выбран сегодняшний день
let selectedDay = currentDate.getDate()

// Функция обновления плашки даты справа
function updateDateBadge(day, month, year) {
    const targetDate = new Date(year, month, day)
    
    if (badgeDateNum) badgeDateNum.innerText = day
    if (badgeDayName) badgeDayName.innerText = weekdays[targetDate.getDay()]
    if (badgeFullDate) badgeFullDate.innerText = day + ' ' + monthsGenitive[month] + ' ' + year
}

// Функция рендеринга сегодняшних напоминаний в сайдбар
function renderTodayReminders() {
    if (!todayList) return

    todayList.innerHTML = ''
    
    // Фильтруем задачи, которые подходят под выбранную дату
    const activeTasks = reminders.filter(function(item) {
        return item.day === selectedDay && item.month === currentMonth && item.year === currentYear
    })

    if (todayCountSpan) {
        todayCountSpan.innerText = activeTasks.length + ' событий'
    }

    activeTasks.forEach(function(task) {
        const item = document.createElement('div')
        item.classList.add('reminder-item', task.category)
        
        // Эффект плавного появления через CSS
        item.style.opacity = '0'
        item.style.transform = 'translateX(-10px)'
        item.style.transition = 'all 0.3s ease'

        item.innerHTML = `
            <div class="time">' + task.time + '</div>
            <div class="title">' + task.title + '</div>
        `
        
        todayList.appendChild(item)
        
        // Триггерим анимку в следующем кадре
        setTimeout(function() {
            item.style.opacity = '1'
            item.style.transform = 'translateX(0)'
        }, 50)
    })
}

function renderCalendar() {
    if (calendarTitle) {
        calendarTitle.innerText = months[currentMonth] + ' ' + currentYear
    }

    if (calendarGrid) {
        calendarGrid.innerHTML = ''
    }

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement('div')
        cell.classList.add('day-cell')
        cell.innerText = i

        // Если этот день выбран — подсвечиваем
        if (i === selectedDay) {
            cell.classList.add('selected')
        }

        cell.addEventListener('click', function() {
            const previousSelected = document.querySelector('.day-cell.selected')
            if (previousSelected) {
                previousSelected.classList.remove('selected')
            }

            cell.classList.add('selected')
            selectedDay = i
            
            // Обновляем плашку и список задач под новый кликнутый день!
            updateDateBadge(selectedDay, currentMonth, currentYear)
            renderTodayReminders()
        })

        if (calendarGrid) {
            calendarGrid.appendChild(cell)
        }
    }
}

// Кнопка СОХРАНИТЬ напоминание
if (saveTaskBtn) {
    saveTaskBtn.addEventListener('click', function() {
        if (!taskTitleInput.value.trim()) return alert('Введите название!')

        // Ищем, какой тег категории сейчас активен
        const activeTag = document.querySelector('.tag-btn.active')
        let categoryClass = 'personal'
        if (activeTag) {
            if (activeTag.classList.contains('work')) categoryClass = 'internet' // оранжевая
            if (activeTag.classList.contains('important')) categoryClass = 'sport' // зелёная
            if (activeTag.classList.contains('personal')) categoryClass = 'plan' // синяя
        }

        // Собираем объект задачи
        const newReminder = {
            id: Date.now(),
            title: taskTitleInput.value,
            time: taskTimeInput.value || '00:00',
            desc: descTextarea ? descTextarea.value : '',
            category: categoryClass,
            reminderTime: taskReminderSelect ? taskReminderSelect.value : 'none',
            day: selectedDay,
            month: currentMonth,
            year: currentYear
        }

        // Закидываем в массив и LocalStorage
        reminders.push(newReminder)
        localStorage.setItem('savedReminders', JSON.stringify(reminders))

        // Очищаем форму
        taskTitleInput.value = ''
        if (taskTimeInput) taskTimeInput.value = '19:00'
        if (descTextarea) descTextarea.value = ''
        if (charCountSpan) charCountSpan.innerText = '0'

        // Мгновенно перерисовываем список «СЕГОДНЯ» с новой задачей!
        renderTodayReminders()
    })
}

// Переключение активного тега в форме
tagButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        tagButtons.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
    })
})

// Счётчик букв
if (descTextarea && charCountSpan) {
    descTextarea.addEventListener('input', function() {
        let currentLength = descTextarea.value.length
        charCountSpan.innerText = currentLength
        if (currentLength > 280) {
            descTextarea.value = descTextarea.value.substring(0, 280)
            charCountSpan.innerText = 280
        }
    })
}

// Стрелочки месяцев
if (prevBtn) {
    prevBtn.addEventListener('click', function() {
        currentMonth--
        if (currentMonth < 0) {
            currentMonth = 11
            currentYear--
        }
        renderCalendar()
    })
}

if (nextBtn) {
    nextBtn.addEventListener('click', function() {
        currentMonth++
        if (currentMonth > 11) {
            currentMonth = 0
            currentYear++
        }
        renderCalendar()
    })
}

// Тёмная тема
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode')
        themeToggle.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙'
    })
}

// Запуск приложения
updateDateBadge(selectedDay, currentMonth, currentYear)
renderCalendar()
renderTodayReminders()
