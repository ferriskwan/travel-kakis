document.addEventListener('DOMContentLoaded', () => {
    const travelForm = document.getElementById('travel-form');

    travelForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // --- गैदर The Form Data ---
        const budget = document.getElementById('budget').value;
        const intention = document.querySelector('input[name="intention"]:checked')?.value || 'leisure';
        const duration = document.getElementById('duration').value || '5 days';
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        const elderly = document.getElementById('elderly').value;
        const specialNeeds = document.getElementById('special-needs').value;
        const from = document.getElementById('from').value;
        const lodging = document.getElementById('lodging').value;
        const poi = document.getElementById('poi').value;
        const other = document.getElementById('other').value;
        const changeRequest = document.getElementById('change-request').value;

        const formData = {
            budget,
            intention,
            duration,
            numberOfTravelers: {
                adults,
                children,
                elderly,
            },
            specialNeeds,
            from,
            lodging,
            poi,
            other,
            changeRequest
        };

        console.log("Form Data Submitted:", formData);

        // --- Generate Mock Itinerary ---
        generateMockItinerary(formData);
    });

    function generateMockItinerary(data) {
        const itineraryContainer = document.getElementById('itinerary-container');
        const itineraryContent = document.getElementById('itinerary-content');
        
        // Show the container
        itineraryContainer.style.display = 'block';
        
        // Clear previous content
        itineraryContent.innerHTML = '';

        // Parse duration to get a number of days
        let days = parseInt(data.duration) || 5; // Default to 5 days if parsing fails
        if (data.duration.toLowerCase().includes('week')) {
            const weeks = parseInt(data.duration) || 1;
            days = weeks * 7;
        }

        const budgetLevel = data.budget < 0.3 ? 'Budget' : (data.budget < 0.7 ? 'Standard' : 'Luxury');
        
        let html = `
            <div class="itinerary-summary">
                <p><strong>Package Type:</strong> ${budgetLevel} ${data.intention.charAt(0).toUpperCase() + data.intention.slice(1)} Trip</p>
                <p><strong>Duration:</strong> ${days} Days</p>
                <p><strong>From:</strong> ${data.from}</p>
            </div>
            
            <div class="itinerary-section">
                <h3><span class="icon">✈️</span> Flights & Transport</h3>
                <div class="card">
                    <p><strong>Outbound:</strong> ${data.from} to your destination (Mock Flight SG123)</p>
                    <p><strong>Inbound:</strong> Back to ${data.from} (Mock Flight SG456)</p>
                    <p><strong>Local Transport:</strong> ${budgetLevel === 'Luxury' ? 'Private Chauffeur' : (budgetLevel === 'Standard' ? 'Rental Car' : 'Public Transport Pass')}</p>
                </div>
            </div>

            <div class="itinerary-section">
                <h3><span class="icon">🏨</span> Accommodation</h3>
                <div class="card">
                    <p><strong>Stay:</strong> ${data.lodging || 'Selected ' + budgetLevel + ' Hotel'}</p>
                    <p><strong>Duration:</strong> ${days - 1} Nights</p>
                </div>
            </div>

            <div class="itinerary-section">
                <h3><span class="icon">🗓️</span> Daily Schedule</h3>
        `;

        // Generate daily activities
        for (let i = 1; i <= Math.min(days, 7); i++) { // Limit mock days to 7 for brevity
            html += `
                <div class="day-card">
                    <h4>Day ${i}</h4>
                    <ul>
                        <li>Morning: ${i === 1 ? 'Arrival and Check-in' : 'Breakfast at hotel, visit ' + (data.poi || 'Local Landmarks')}</li>
                        <li>Afternoon: ${data.intention === 'business' ? 'Meetings & Networking' : 'Guided tour of cultural sites'}</li>
                        <li>Evening: Dinner at a ${budgetLevel === 'Luxury' ? 'Michelin-starred' : 'locally famous'} restaurant</li>
                    </ul>
                </div>
            `;
        }

        if (days > 7) {
            html += `<p class="more-days">... and ${days - 7} more days of adventure!</p>`;
        }

        html += `</div>`;
        
        itineraryContent.innerHTML = html;

        // Scroll to the itinerary
        itineraryContainer.scrollIntoView({ behavior: 'smooth' });
    }
});
