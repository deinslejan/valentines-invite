// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const openButton = document.getElementById('openButton');
    const messageSection = document.getElementById('messageSection');
    const activitiesSection = document.getElementById('activitiesSection');
    const yes1Checkbox = document.getElementById('yes1');
    const yes2Checkbox = document.getElementById('yes2');
    const submitBtn = document.getElementById('submitBtn');
    const finalMessage = document.getElementById('finalMessage');
    const othersCheckbox = document.getElementById('othersCheckbox');
    const othersText = document.getElementById('othersText');
    const downloadBtn = document.getElementById('downloadBtn');

    // Button click animation
    openButton.addEventListener('click', function() {
        console.log('Button clicked!');
        openButton.classList.add('clicked');
        
        // Show message section after button animation
        setTimeout(() => {
            console.log('Showing message section');
            messageSection.classList.add('visible');
        }, 800);
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
            
            // Set receipt date
            const receiptDate = document.getElementById('receiptDate');
            const now = new Date();
            receiptDate.textContent = `Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            
            // Show final message
            finalMessage.classList.add('visible');
            
            // Scroll to final message
            setTimeout(() => {
                finalMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        } else {
            alert('Please select at least one activity!');
        }
    });

    // Handle download button
    downloadBtn.addEventListener('click', function() {
        const receiptContainer = document.getElementById('receiptContainer');
        const downloadButton = document.getElementById('downloadBtn');
        
        // Hide download button before capturing
        downloadButton.style.display = 'none';
        
        // Use html2canvas to convert the receipt to an image
        html2canvas(receiptContainer, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            // Show download button again
            downloadButton.style.display = 'block';
            
            // Convert canvas to blob
            canvas.toBlob(function(blob) {
                // Create download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                const timestamp = new Date().getTime();
                link.download = `valentines-date-receipt-${timestamp}.png`;
                link.href = url;
                link.click();
                
                // Clean up
                URL.revokeObjectURL(url);
            }, 'image/png');
        }).catch(error => {
            downloadButton.style.display = 'block';
            console.error('Error generating image:', error);
            alert('Could not save image. Please take a screenshot instead!');
        });
    });

    // Activity items use default checkbox behavior
});
