function submitApplication(e) {
  e.preventDefault(); // You can ignore this; prevents the default form submission!

  for (let job of document.getElementsByName("job")) {
    if (job.checked) {
      alert(`Thank you for applying to be a ${job.value}`)
      return
    }
  }

  alert("Please select a job!")
}