document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const modal = document.getElementById('success-modal');
  const closeBtn = modal.querySelector('.close');

  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    
    if (form.checkValidity()) {
      
      setTimeout(function() {
        modal.style.display = 'block';
        form.reset(); 
      }, 500);
    } else {
      
      form.reportValidity();
    }
  });

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(e) {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });
});
