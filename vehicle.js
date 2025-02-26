// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-buttons button');
    const vehicles = document.querySelectorAll('.vehicle');
  
    // Filter functionality
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        const filter = button.getAttribute('data-filter');
        vehicles.forEach(vehicle => {
          const category = vehicle.getAttribute('data-category');
          // Show all vehicles if 'all' is selected, otherwise filter by category
          if (filter === 'all' || category === filter) {
            vehicle.style.display = 'block';
            setTimeout(() => (vehicle.style.opacity = 1), 10);
          } else {
            vehicle.style.opacity = 0;
            setTimeout(() => (vehicle.style.display = 'none'), 500);
          }
        });
      });
    });
  });
  