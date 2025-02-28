document.addEventListener('DOMContentLoaded', () => {
  // === Код для страницы витаминов ===
  const addVitaminBtn = document.getElementById('addVitaminBtn');
  if (addVitaminBtn) {
    const vitaminsList = document.getElementById('vitaminsList');
    let vitaminsData = JSON.parse(localStorage.getItem("vitaminsData")) || [];
    
    function saveVitaminsData() {
      localStorage.setItem("vitaminsData", JSON.stringify(vitaminsData));
    }
    
    function renderVitamins() {
      vitaminsList.innerHTML = "";
      vitaminsData.forEach((vitamin, index) => {
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
        
        // Отрисовываем добавленные времена
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
          
          // Кнопка "Удалить" время
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
          
          // Добавляем время, когда пользователь выбирает его
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
        
        vitaminsList.appendChild(vitaminRow);
      });
    }
    
    addVitaminBtn.addEventListener('click', () => {
      const vitaminNameInput = document.getElementById('vitaminName');
      const vitaminName = vitaminNameInput.value.trim();
      if (vitaminName === '') {
        alert('Введите название витамина');
        return;
      }
      vitaminsData.push({ name: vitaminName, times: [] });
      saveVitaminsData();
      renderVitamins();
      vitaminNameInput.value = '';
    });
    
    renderVitamins();
  }
  
  // === Код для страницы метрик (АД, сахар, температура) ===
  const metricsForm = document.getElementById('metrics-form');
  if (metricsForm) {
    const metricsList = document.getElementById('metricsList');
    let metricsData = JSON.parse(localStorage.getItem("metricsData")) || [];
    
    function saveMetricsData() {
      localStorage.setItem("metricsData", JSON.stringify(metricsData));
    }
    
    function renderMetrics() {
      metricsList.innerHTML = "";
      metricsData.forEach((record, index) => {
        const recordDiv = document.createElement("div");
        recordDiv.classList.add("metric-record");
        
        let recordHTML = `<strong>${record.date} ${record.time}</strong><br>`;
        if (record.bloodPressure !== "") {
          recordHTML += `АД: ${record.bloodPressure}<br>`;
        }
        if (record.sugarLevel !== "") {
          recordHTML += `Сахар: ${record.sugarLevel}<br>`;
        }
        if (record.temperature !== "") {
          recordHTML += `Температура: ${record.temperature}<br>`;
        }
        recordDiv.innerHTML = recordHTML;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.classList.add("center-button");
        deleteBtn.addEventListener('click', () => {
          if (confirm("Удалить эти показатели?")) {
            metricsData.splice(index, 1);
            saveMetricsData();
            renderMetrics();
          }
        });
        recordDiv.appendChild(deleteBtn);
        metricsList.appendChild(recordDiv);
      });
    }
    
    metricsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const date = document.getElementById("metrics-date").value;
      const time = document.getElementById("metrics-time").value;
      const bloodPressure = document.getElementById("blood-pressure").value;
      let sugarLevel = document.getElementById("sugar-level").value;
      const temperature = document.getElementById("temperature").value;
      
      // Замена запятых на точки для корректного формата числа
      sugarLevel = sugarLevel.replace(/,/g, '.');
      
      // Проверяем, что заполнены дата, время и хотя бы один показатель
      if (date === "" || time === "" || (bloodPressure === "" && sugarLevel === "" && temperature === "")) {
        alert("Заполните дату, время и хотя бы один показатель: АД, уровень сахара или температуру");
        return;
      }
      
      const newRecord = {
        date: date,
        time: time,
        bloodPressure: bloodPressure || "",
        sugarLevel: sugarLevel || "",
        temperature: temperature || ""
      };
      
      metricsData.push(newRecord);
      saveMetricsData();
      renderMetrics();
      metricsForm.reset();
    });
    
    renderMetrics();
  }
});
