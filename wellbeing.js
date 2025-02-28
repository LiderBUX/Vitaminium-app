document.addEventListener('DOMContentLoaded', () => {
  const wellbeingForm = document.getElementById('wellbeing-form');
  if (wellbeingForm) {
    const wellbeingList = document.getElementById('wellbeingList');
    let wellbeingData = JSON.parse(localStorage.getItem("wellbeingData")) || [];
    
    function saveWellbeingData() {
      localStorage.setItem("wellbeingData", JSON.stringify(wellbeingData));
    }
    
    function renderWellbeing() {
      wellbeingList.innerHTML = "";
      wellbeingData.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add("wellbeing-record");
        
        let entryHTML = `<strong>${entry.date} ${entry.time}</strong><br>`;
        entryHTML += `<p>${entry.description}</p>`;
        entryDiv.innerHTML = entryHTML;
        
        // Кнопка для удаления записи
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Удалить";
        deleteBtn.classList.add("compact-button");
        deleteBtn.addEventListener('click', () => {
          if (confirm("Удалить эту запись?")) {
            wellbeingData.splice(index, 1);
            saveWellbeingData();
            renderWellbeing();
          }
        });
        entryDiv.appendChild(deleteBtn);
        
        wellbeingList.appendChild(entryDiv);
      });
    }
    
    wellbeingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const date = document.getElementById("wb-date").value;
      const time = document.getElementById("wb-time").value;
      const description = document.getElementById("wb-description").value.trim();
      
      if (date === "" || time === "" || description === "") {
        alert("Пожалуйста, заполните все поля");
        return;
      }
      
      const newEntry = {
        date: date,
        time: time,
        description: description
      };
      
      wellbeingData.push(newEntry);
      saveWellbeingData();
      renderWellbeing();
      wellbeingForm.reset();
    });
    
    renderWellbeing();
  }
});
