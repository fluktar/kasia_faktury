"use strict";
document.getElementById("save-pdf").addEventListener("click", async () => {
  const response = await fetch("/save-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ htmlContent: document.documentElement.outerHTML }),
  });

  if (response.ok) {
    alert("PDF został zapisany!");
  } else {
    alert("Błąd podczas zapisywania PDF-a.");
  }
});

const savePdf = document.getElementById("save-pdf");
