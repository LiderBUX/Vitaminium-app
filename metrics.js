document.addEventListener('DOMContentLoaded', () => {
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
      
      // Заменяем запятые на точки в значении сахара, чтобы принимать дробные числа
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
