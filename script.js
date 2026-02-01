// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const messageSection = document.getElementById('messageSection');
    const activitiesSection = document.getElementById('activitiesSection');
    const yes1Checkbox = document.getElementById('yes1');
    const yes2Checkbox = document.getElementById('yes2');
    const submitBtn = document.getElementById('submitBtn');
    const finalMessage = document.getElementById('finalMessage');
    const othersCheckbox = document.getElementById('othersCheckbox');
    const othersText = document.getElementById('othersText');

    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');

    // Card opening animation
    envelope.addEventListener('click', function() {
        envelope.classList.add('opened');
        
        // Show message section after envelope animation
        setTimeout(() => {
            messageSection.classList.add('visible');
        }, 1200);
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

    // Handle Others checkbox to enable/disable textbox
    othersCheckbox.addEventListener('change', function() {
        othersText.disabled = !othersCheckbox.checked;
        if (othersCheckbox.checked) {
            othersText.focus();
        } else {
            othersText.value = '';
        }
    });

    // Handle submit button
    submitBtn.addEventListener('click', function() {
        const selectedActivities = document.querySelectorAll('input[name="activity"]:checked');
        
        if (selectedActivities.length > 0) {
            // Show loading state
            const finalTitle = document.getElementById('finalTitle');
            const finalSubtext = document.getElementById('finalSubtext');
            const closingText = document.getElementById('closingText');
            
            finalTitle.textContent = 'Sending your choices...';
            finalSubtext.style.display = 'none';
            
            // Get activity labels
            const activities = Array.from(selectedActivities).map(cb => {
                if (cb.value === 'others') {
                    const othersValue = othersText.value.trim();
                    return othersValue ? `Others: ${othersValue}` : 'Others (no details provided)';
                }
                return cb.parentElement.querySelector('.activity-name').textContent;
            });
            
            // Update the selected list in final message
            const selectedList = document.getElementById('selectedList');
            selectedList.innerHTML = activities.map(activity => 
                `<li>${activity}</li>`
            ).join('');
            
            // Prepare email parameters
            const emailParams = {
                to_email: 'YOUR_EMAIL@gmail.com', // Replace with your email
                activities_list: activities.join(', '),
                activities_html: activities.map(a => `• ${a}`).join('\n'),
                date: new Date().toLocaleString()
            };
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    finalTitle.textContent = 'Perfect! Can\'t wait!';
                    finalSubtext.style.display = 'block';
                    finalSubtext.textContent = 'You selected:';
                    closingText.textContent = 'This is going to be the best Valentine\'s Day ever!';
                    
                    // Show final message
                    finalMessage.classList.add('visible');
                    
                    // Scroll to final message
                    setTimeout(() => {
                        finalMessage.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 100);
                    
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error but still display selections
                    finalTitle.textContent = 'Got it!';
                    finalSubtext.style.display = 'block';
                    finalSubtext.textContent = 'You selected:';
                    closingText.textContent = 'This is going to be the best Valentine\'s Day ever!';
                    
                    finalMessage.classList.add('visible');
                    
                    setTimeout(() => {
                        finalMessage.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 100);
                });
        } else {
            alert('Please select at least one activity!');
        }
    });

    // Activity items use default checkbox behavior
});
