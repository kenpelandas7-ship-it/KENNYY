document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("createBtn").addEventListener("click", () => {
        window.location.href = "create_survey.html";
    });

    document.getElementById("manageBtn").addEventListener("click", () => {
        window.location.href = "manage_survey.html";
    });

    document.getElementById("resultsBtn").addEventListener("click", () => {
        window.location.href = "survey_results.html";
    });

});