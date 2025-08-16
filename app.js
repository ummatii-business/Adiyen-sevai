// Simple form handling (console log only now)
// Later connect Firebase / API

document.addEventListener("DOMContentLoaded", () => {
  const needForm = document.getElementById("needForm");
  const shareForm = document.getElementById("shareForm");

  if (needForm) {
    needForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(needForm).entries());
      console.log("Need Food Request:", data);
      alert("Your food request is submitted ✅");
      needForm.reset();
    });
  }

  if (shareForm) {
    shareForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(shareForm).entries());
      console.log("Food Donor:", data);
      alert("Your food offer is submitted ✅");
      shareForm.reset();
    });
  }
});
