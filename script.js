// Variables globales
const questionsContainer = document.getElementById("questions-container");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const scoreDisplay = document.getElementById("score-display");
const incorrectDisplay = document.getElementById("incorrect-display");
const historyList = document.getElementById("history-list");
const deleteSelectedBtn = document.getElementById("delete-selected-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Generar preguntas
function generateQuestions() {
    for (let i = 1; i <= 100; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionLabel = document.createElement("label");
        questionLabel.textContent = `Pregunta ${i}:`;

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

        ["a", "b", "c", "d", "e"].forEach(option => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `question-${i}`;
            optionInput.value = option;

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsDiv.appendChild(optionInput);
            optionsDiv.appendChild(optionLabel);
        });

        questionDiv.appendChild(questionLabel);
        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    }
}

// Calcular resultados
function calculateResults() {
    const answerKey = document.getElementById("answer-key").value.split(",");
    let score = 0;
    const incorrectQuestions = [];

    for (let i = 1; i <= 100; i++) {
        const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === answerKey[i - 1]) {
                score += 20;
            } else {
                score -= 1.125;
                incorrectQuestions.push(i); // Agregar pregunta incorrecta
            }
        }
    }

    // Mostrar resultados
    scoreDisplay.textContent = `Puntaje Total: ${score}`;
    incorrectDisplay.textContent = `Preguntas Incorrectas: ${incorrectQuestions.join(", ") || "Ninguna"}`;

    // Agregar al historial
    addToHistory(score, incorrectQuestions);
}

// Agregar resultados al historial
function addToHistory(score, incorrectQuestions) {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const historyItem = document.createElement("li");
    historyItem.innerHTML = `
        <input type="checkbox" class="history-checkbox">
        Puntaje: ${score}, Incorrectas: ${incorrectQuestions.length}, Fecha: ${formattedDate}
    `;

    historyList.appendChild(historyItem);
}

// Eliminar seleccionados del historial
function deleteSelectedHistory() {
    const checkboxes = document.querySelectorAll(".history-checkbox:checked");
    checkboxes.forEach(checkbox => {
        const historyItem = checkbox.parentElement;
        historyList.removeChild(historyItem);
    });
}

// Borrar todo el historial
function deleteAllHistory() {
    historyList.innerHTML = "";
}

// Reiniciar evaluación
function resetEvaluation() {
    const inputs = document.querySelectorAll("input[type=radio]");
    inputs.forEach(input => input.checked = false);
    scoreDisplay.textContent = "";
    incorrectDisplay.textContent = "";
}

// Event Listeners
submitBtn.addEventListener("click", calculateResults);
resetBtn.addEventListener("click", resetEvaluation);
deleteSelectedBtn.addEventListener("click", deleteSelectedHistory);
deleteAllBtn.addEventListener("click", deleteAllHistory);

// Generar preguntas al cargar la página
generateQuestions();
