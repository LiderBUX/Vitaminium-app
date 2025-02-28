document.addEventListener('DOMContentLoaded', () => {
  // Если на странице есть кнопка добавления витамина, запускаем логику для vitamins.html
  const addVitaminBtn = document.getElementById('addVitaminBtn');
  if (addVitaminBtn) {
    const vitaminsList = document.getElementById('vitaminsList');

    addVitaminBtn.addEventListener('click', () => {
      const vitaminNameInput = document.getElementById('vitaminName');
      const vitaminName = vitaminNameInput.value.trim();
      if (vitaminName === '') {
        alert('Введите название витамина');
        return;
      }
      
      // Создаем контейнер для нового витамина
      const vitaminRow = document.createElement('div');
      vitaminRow.classList.add('vitamin-row');
      
      // Заголовок с названием витамина
      const title = document.createElement('h3');
      title.textContent = vitaminName;
      vitaminRow.appendChild(title);
      
      // Контейнер для времени приёма
      const timesContainer = document.createElement('div');
      timesContainer.classList.add('times-container');
      vitaminRow.appendChild(timesContainer);
      
      // Кнопка для добавления времени приёма
      const addTimeBtn = document.createElement('button');
      addTimeBtn.textContent = 'Добавить время приема';
      addTimeBtn.classList.add('button');
      addTimeBtn.addEventListener('click', () => {
        // Создаем обертку для поля времени и кнопок
        const timeWrapper = document.createElement('div');
        timeWrapper.style.marginTop = "5px";
        
        // Поле для выбора времени
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.classList.add('time-input');
        timeWrapper.appendChild(timeInput);
        
        // Кнопка "Напомнить"
        const remindBtn = document.createElement('button');
        remindBtn.textContent = 'Напомнить';
        remindBtn.classList.add('button');
        remindBtn.style.marginLeft = "5px";
        remindBtn.addEventListener('click', () => {
          const timeValue = timeInput.value;
          if (!timeValue) {
            alert('Выберите время');
            return;
          }
          // Здесь можно реализовать интеграцию с Telegram API для уведомлений
          alert(`Напоминание: Примите ${vitaminName} в ${timeValue}`);
        });
        timeWrapper.appendChild(remindBtn);
        
        // Кнопка для удаления этого времени
        const deleteTimeBtn = document.createElement('button');
        deleteTimeBtn.textContent = 'Удалить время';
        deleteTimeBtn.classList.add('button');
        deleteTimeBtn.style.marginLeft = "5px";
        deleteTimeBtn.addEventListener('click', () => {
          timeWrapper.remove();
        });
        timeWrapper.appendChild(deleteTimeBtn);
        
        // Добавляем обертку в контейнер времени
        timesContainer.appendChild(timeWrapper);
      });
      vitaminRow.appendChild(addTimeBtn);
      
      // Кнопка для удаления витамина
      const deleteVitaminBtn = document.createElement('button');
      deleteVitaminBtn.textContent = 'Удалить витамин';
      deleteVitaminBtn.classList.add('button');
      deleteVitaminBtn.style.marginTop = "5px";
      deleteVitaminBtn.addEventListener('click', () => {
        if (confirm(`Удалить ${vitaminName}?`)) {
          vitaminRow.remove();
        }
      });
      vitaminRow.appendChild(deleteVitaminBtn);
      
      // Добавляем созданный ряд в список витаминов
      vitaminsList.appendChild(vitaminRow);
      
      // Очищаем поле ввода
      vitaminNameInput.value = '';
    });
  }
});


