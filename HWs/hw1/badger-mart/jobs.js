function submitApplication(e) {
  e.preventDefault(); // You can ignore this; prevents the default form submission!

  for (let job of document.getElementsByName("job")) {
    if (job.checked) {
      alert(`Thank you for applying to be a ${job.value}! We will review your application and contact you soon.`)
      // Reset the form after submission
      document.querySelector('form').reset();
      return
    }
  }

  alert("Please select a job to apply for!")
}