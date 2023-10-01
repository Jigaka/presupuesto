    const form = document.getElementById("calculador-form");
    const steps = form.querySelectorAll("section");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    let currentStep = 0;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    })
  
    function showStep(stepIndex) {
      steps.forEach((step, index) => {
        if (index === stepIndex) {
          step.classList.remove("hidden");
        } else {
          step.classList.add("hidden");
        }
      });
  
      prevButton.classList.toggle("hidden", stepIndex === 0);
      nextButton.classList.toggle("hidden", stepIndex === steps.length - 1);
    }
  
    function calculateBudget() {
      // Aquí puedes agregar la lógica para calcular el presupuesto
      // y actualizar el resultado en el último paso.
    }
  
    showStep(currentStep);
  
    prevButton.addEventListener("click", function () {
      currentStep = Math.max(currentStep - 1, 0);
      showStep(currentStep);
    });
  
    nextButton.addEventListener("click", function () {
      if (currentStep === steps.length - 1) {
        calculateBudget();
      } else {
        currentStep = Math.min(currentStep + 1, steps.length - 1);
        showStep(currentStep);
      }
    });
  