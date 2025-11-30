let questionCount = 0;

function addQuestion() {
    questionCount++;
    const container = document.getElementById("questions");
    const template = document.getElementById("question-template");
    const newQuestion = template.cloneNode(true);
    newQuestion.style.display = "block";
    newQuestion.id = `question-${questionCount}`;
    newQuestion.querySelector(".question-label").textContent = `Question ${questionCount}`;

    container.appendChild(newQuestion);
}
function showChoices(select) {
    const choiceBox = select.parentElement.querySelector(".choice-container");
    choiceBox.style.display = select.value === "multiple" ? "block" : "none";
}
function addChoice(btn) {
    const box = btn.parentElement;
    const input = document.createElement("input");
    input.className = "choice";
    input.placeholder = "New Choice";
    box.insertBefore(input, btn);
}

function removeQuestion(btn) {
    const questionBox = btn.parentElement;
    questionBox.remove();
}

function saveSurvey() {
    const allQuestions = document.querySelectorAll(".question-box");
    if (allQuestions.length == 0) {
        alert("Please add at least one question.");
        return;
    }

    let surveyData = [];

    allQuestions.forEach((box, index) => {
        if (box.style.display === "none") return;
        const questionText = box.querySelector(".question-text").value;
        const questionType = box.querySelector(".question-type").value;

        if (!questionText.trim()) {
            alert(`Question ${index + 1} is empty.`);
            return;
        }

        let questionObj = {
            text: questionText,
            type: questionType,
            choices: []
        };

        if (questionType === "multiple") {
            const choices = box.querySelectorAll(".choice");
            choices.forEach(choice => {
                if (choice.value.trim()) questionObj.choices.push(choice.value.trim());
            });
        }

        surveyData.push(questionObj);
    });

    fetch("save_survey.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(surveyData)
    })
    .then(response => response.text())
    .then(data => { alert(data); })
    .catch(error => console.error("Error:", error));
}
