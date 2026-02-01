// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const messageSection = document.getElementById('messageSection');
    const activitiesSection = document.getElementById('activitiesSection');
    const yes1Checkbox = document.getElementById('yes1');
    const yes2Checkbox = document.getElementById('yes2');
    const submitBtn = document.getElementById('submitBtn');
    const finalMessage = document.getElementById('finalMessage');

    // Card opening animation
    envelope.addEventListener('click', function() {
        envelope.classList.add('opened');
        
        // Show message section after envelope animation
        setTimeout(() => {
            messageSection.classList.add('visible');
        }, 1000);
    });

    // Handle "Yes" checkbox clicks
    function handleYesClick(clickedCheckbox, otherCheckbox) {
        // If one is checked, uncheck the other
        if (clickedCheckbox.checked) {
            otherCheckbox.checked = false;
            
            // Smooth scroll to activities section
            setTimeout(() => {
                activitiesSection.classList.add('visible');
                
                // Scroll to activities section
                activitiesSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 300);
        } else {
            // If unchecking, hide activities section
            activitiesSection.classList.remove('visible');
            finalMessage.classList.remove('visible');
        }
    }

    yes1Checkbox.addEventListener('change', () => handleYesClick(yes1Checkbox, yes2Checkbox));
    yes2Checkbox.addEventListener('change', () => handleYesClick(yes2Checkbox, yes1Checkbox));

    // Handle submit button
    submitBtn.addEventListener('click', function() {
        const selectedActivities = document.querySelectorAll('input[name="activity"]:checked');
        
        if (selectedActivities.length > 0) {
            // Show final message
            finalMessage.classList.add('visible');
            
            // Scroll to final message
            setTimeout(() => {
                finalMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
            
            // Optional: Log selected activities (for development/debugging)
            const activities = Array.from(selectedActivities).map(cb => cb.value);
            console.log('Selected activities:', activities);
        } else {
            alert('Please select at least one activity!');
        }
    });

    // Activity items use default checkbox behavior
});
