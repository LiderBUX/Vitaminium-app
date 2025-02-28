document.addEventListener('DOMContentLoaded', () => {
  // Логика для страницы витаминов (если элемент addVitaminBtn существует)
  const addVitaminBtn = document.getElementById('addVitaminBtn');
  if (addVitaminBtn) {
    const vitaminsList = document.getElementById('vitaminsList');
    
    // Загружаем сохранённые данные или создаём пустой массив
    let vitaminsData = JSON.parse(localStorage.getItem("vitaminsData")) || [];
    
    // Функция сохранения данных в localStorage
    function saveVitaminsData() {
      localStorage.setItem("vitaminsData", JSON.stringify(vitaminsData));
    }
    
    // Функция отрисовки списка витаминов
    function renderVitamins() {
      vitaminsList.innerHTML = "";
      vitaminsData.forEach((vitamin, index) => {
        const row = createVitaminRow(vitamin, index);
        vitaminsList.appendChild(row);
      });
    }
    
    // Функция создания DOM-элемента для одного витамина
    function createVitaminRow(vitamin, index) {
      const vitaminRow = document.createElement('div');
      vitaminRow.classList.add('vitamin-row');
      
      // Заголовок с названием витамина
      const title = document.createElement('h3');
      title.textContent = vitamin.name;
      vitaminRow.appendChild(title);
      
      // Контейнер для времени приёма
      const timesContainer = document.createElement('div');
      timesContainer.classList.add('times-container');
      vitaminRow.appendChild(timesContainer);
      
      // Отрисовываем уже добавленные времена
      vitamin.times.forEach((timeValue, tIndex) => {
        const timeWrapper = document.createElement('div');
        timeWrapper.style.marginTop = "5px";
        
        // Поле с выбранным временем (только для отображения)
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.value = timeValue;
        timeInput.classList.add('time-input');
        timeInput.disabled = true;
        timeWrapper.appendChild(timeInput);
        
        // Кнопка "Напомнить"
        const remindBtn = document.createElement('button');
        remindBtn.textContent = 'Напомнить';
        remindBtn.classList.add('compact-button');
        remindBtn.addEventListener('click', () => {
          if (!timeValue) {
            alert('Выберите время');
            return;
          }
          // Если приложение запущено в Telegram, отправляем данные через API
          if (typeof Telegram !== 'undefined' && Telegram.WebApp && Telegram.WebApp.sendData) {
            Telegram.WebApp.sendData(JSON.stringify({
              action: 'remind',
              vitamin: vitamin.name,
              time: timeValue
            }));
          } else {
            alert(`Напоминание: Примите ${vitamin.name} в ${timeValue}`);
          }
        });
        timeWrapper.appendChild(remindBtn);
        
        // Кнопка "Удалить" для удаления этого времени
        const deleteTimeBtn = document.createElement('button');
        deleteTimeBtn.textContent = 'Удалить';
        deleteTimeBtn.classList.add('compact-button');
        deleteTimeBtn.addEventListener('click', () => {
          vitamin.times.splice(tIndex, 1);
          saveVitaminsData();
          renderVitamins();
        });
        timeWrapper.appendChild(deleteTimeBtn);
        
        timesContainer.appendChild(timeWrapper);
      });
      
      // Кнопка для добавления нового времени
      const addTimeBtn = document.createElement('button');
      addTimeBtn.textContent = 'Добавить время';
      addTimeBtn.classList.add('compact-button');
      addTimeBtn.addEventListener('click', () => {
        const timeWrapper = document.createElement('div');
        timeWrapper.style.marginTop = "5px";
        
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.classList.add('time-input');
        timeWrapper.appendChild(timeInput);
        
        // При изменении значения времени добавляем его в данные
        timeInput.addEventListener('change', () => {
          if (timeInput.value) {
            vitamin.times.push(timeInput.value);
            saveVitaminsData();
            renderVitamins();
          }
        });
        timesContainer.appendChild(timeWrapper);
      });
      vitaminRow.appendChild(addTimeBtn);
      
      // Кнопка для удаления витамина
      const deleteVitaminBtn = document.createElement('button');
      deleteVitaminBtn.textContent = 'Удалить витамин';
      deleteVitaminBtn.classList.add('compact-button');
      deleteVitaminBtn.addEventListener('click', () => {
        if (confirm(`Удалить ${vitamin.name}?`)) {
          vitaminsData.splice(index, 1);
          saveVitaminsData();
          renderVitamins();
        }
      });
      vitaminRow.appendChild(deleteVitaminBtn);
      
      return vitaminRow;
    }
    
    // Обработчик для добавления нового витамина
    addVitaminBtn.addEventListener('click', () => {
      const vitaminNameInput = document.getElementById('vitaminName');
      const vitaminName = vitaminNameInput.value.trim();
      if (vitaminName === '') {
        alert('Введите название витамина');
        return;
      }
      // Добавляем новый витамин с пустым списком времён
      vitaminsData.push({ name: vitaminName, times: [] });
      saveVitaminsData();
      renderVitamins();
      vitaminNameInput.value = '';
    });
    
    // Отрисовываем список при загрузке страницы
    renderVitamins();
  }
});
