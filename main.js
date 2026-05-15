document.addEventListener('DOMContentLoaded', () => {
    const travelForm = document.getElementById('travel-form');

    travelForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // --- Gather The Form Data ---
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
        itineraryContainer.classList.remove('hidden');
        
        // Clear previous content
        itineraryContent.innerHTML = '';

        // Parse duration to get a number of days
        let days = parseInt(data.duration) || 5;
        if (data.duration.toLowerCase().includes('week')) {
            const weeks = parseInt(data.duration) || 1;
            days = weeks * 7;
        }

        const budgetLevel = data.budget < 0.3 ? 'Budget' : (data.budget < 0.7 ? 'Standard' : 'Luxury');
        const tripType = data.intention.charAt(0).toUpperCase() + data.intention.slice(1);
        
        let html = `
            <div class="mb-12">
                <h2 class="font-display-lg text-[40px] text-primary mb-2">Your Proposed Itinerary</h2>
                <p class="font-body-lg text-on-surface-variant">${days} Days of ${budgetLevel} ${tripType} Travel from ${data.from}</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                <!-- Left Column: Itinerary -->
                <div class="lg:col-span-7 space-y-gutter">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-headline-lg text-primary">Daily Schedule</h3>
                    </div>
                    
                    <div class="space-y-4">
        `;

        // Generate daily activities
        for (let i = 1; i <= Math.min(days, 7); i++) {
            const dailyActivities = [
                {
                    time: '09:00 AM',
                    title: i === 1 ? 'Arrival & Hotel Check-in' : 'Morning Excursion',
                    cost: budgetLevel === 'Luxury' ? 150 : (budgetLevel === 'Standard' ? 50 : 20),
                    tag: i === 1 ? 'HOTEL' : 'ACTIVITY',
                    tagClass: i === 1 ? 'bg-primary-fixed text-primary' : 'bg-tertiary-fixed text-tertiary',
                    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAhsnGPpsuI6jwYAw0QaLeK2cpbV6eiW6v8M9d8YIgCyT2Uip5j9_pp34fyEDj6_f7fkh0ePDitXoLdEiWSAfwJm8jmj7iHQY8NuqlfGkM1GXWHUuvEcvF1jKg5B27a2PDMtf60oZF6oa67_JEym6G5c-q1Vy8OWPzKayR6hKObS_BTOO3hg4jNHVt_uNk0b0bu7t6bXRUMJ5vczoKXXZ7GgpvPBXHV8ReflS--2jE-TUsUYrwmZ1CyuWSEFkuPkSr55x7oQN7jaM'
                },
                {
                    time: '01:00 PM',
                    title: 'Local Culinary Experience',
                    cost: budgetLevel === 'Luxury' ? 200 : (budgetLevel === 'Standard' ? 80 : 30),
                    tag: 'FOOD',
                    tagClass: 'bg-secondary-fixed text-secondary',
                    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGgXIshgUfzaHR3EGqbaXH-C7oLGSs5bF5b2jyuv6BT67Zov-exVcFMPafmMVAplI8PVYLazwxSchAjV3_1qfVfQMKgk0t6IXVve1YgkH5AnzpI66jA1ugVwZ-XTTvwgEWQ4N9dTytyxGNaI4M-pprVeOnn7bl-J9kkHq91ioaELDqEHNg8VFrkiYL1cOSlnoNUuKZ1xHfTp8JuD8hqbfAaI-6ygKVEDBa5wvOahMdGYUr4ZLHdqdfSj0DmzAraJvCVQFlwKHtGMg'
                },
                {
                    time: '04:00 PM',
                    title: tripType === 'Business' ? 'Networking Event' : 'Sightseeing Tour',
                    cost: budgetLevel === 'Luxury' ? 250 : (budgetLevel === 'Standard' ? 100 : 40),
                    tag: 'ACTIVITY',
                    tagClass: 'bg-tertiary-fixed text-tertiary',
                    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANkknXPvgshWfpviGHzx4So6qLU2jF5t4e5fzayr7OLBwc5x05NYBwfkQoylNk0Kjt-wP3m9DwgkXNuL91RFG2otRIpckGEMHt1FO3emrdKB21qe7BQLO3ZkbJQ2c9sBorKkXPX5XUXv_0yLhA0KFH93ST5u-WJf5PCVn3F1BXlXHXl2H6Yyn5_cJG1HVCTzN5bmVuxjfBtFrI34BD7J86T5usyJIm_AeyPDBlelu5T3VeJ2O2ECB8eWMP3ww5zeTvmYwtz2Ha_No'
                }
            ];

            html += `<h4 class="font-label-md text-secondary uppercase tracking-widest mt-6 mb-2">Day ${i}</h4>`;

            dailyActivities.forEach(activity => {
                html += `
                            <div class="group flex items-center gap-4 bg-white p-4 rounded-xl shadow-[0px_10px_30px_rgba(0,51,102,0.05)] border border-outline-variant/10 hover:border-primary-fixed transition-all mb-3">
                                <span class="material-symbols-outlined text-outline cursor-grab" data-icon="drag_indicator">drag_indicator</span>
                                <div class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                    <img alt="Activity Image" class="w-full h-full object-cover" src="${activity.imgUrl}"/>
                                </div>
                                <div class="flex-grow">
                                    <p class="font-label-sm text-secondary uppercase tracking-widest mb-1">${activity.time}</p>
                                    <h4 class="font-headline-md text-on-surface text-[18px]">${activity.title}</h4>
                                </div>
                                <div class="text-right">
                                    <p class="font-label-md text-primary font-bold">$${activity.cost}</p>
                                    <span class="text-[10px] px-2 py-0.5 rounded-full ${activity.tagClass} font-bold">${activity.tag}</span>
                                </div>
                            </div>
                `;
            });
        }

        if (days > 7) {
            html += `<p class="text-center font-label-md text-outline mt-6 italic">... plus ${days - 7} more amazing days!</p>`;
        }

        html += `
                    </div>
                </div>
                
                <!-- Right Column: Budget & Collaborators -->
                <div class="lg:col-span-5 space-y-gutter mt-8 lg:mt-0">
                    <div class="bg-white p-gutter rounded-2xl shadow-[0px_10px_30px_rgba(0,51,102,0.08)] border border-outline-variant/10">
                        <h3 class="font-headline-md text-primary mb-6">Estimated Cost Overview</h3>
                        <div class="flex flex-col items-center">
                            <!-- Simulated Donut Chart -->
                            <div class="relative w-48 h-48 mb-8">
                                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#f4f3f8" stroke-width="3.5"></circle>
                                    <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#003366" stroke-dasharray="40 100" stroke-dashoffset="0" stroke-width="3.8"></circle>
                                    <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#9b4500" stroke-dasharray="25 100" stroke-dashoffset="-40" stroke-width="3.8"></circle>
                                    <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#cec6ad" stroke-dasharray="15 100" stroke-dashoffset="-65" stroke-width="3.8"></circle>
                                    <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#fc8a40" stroke-dasharray="20 100" stroke-dashoffset="-80" stroke-width="3.8"></circle>
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <p class="font-label-sm text-outline uppercase tracking-tighter">Est. Total</p>
                                    <p class="font-headline-lg text-primary text-[28px]">$${days * (budgetLevel === 'Luxury' ? 600 : (budgetLevel === 'Standard' ? 230 : 90))}</p>
                                </div>
                            </div>
                            <!-- Legend -->
                            <div class="w-full grid grid-cols-2 gap-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full bg-primary-container"></div>
                                    <span class="font-label-md text-on-surface-variant">Flights</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full bg-secondary"></div>
                                    <span class="font-label-md text-on-surface-variant">Lodging</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></div>
                                    <span class="font-label-md text-on-surface-variant">Activities</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full bg-secondary-container"></div>
                                    <span class="font-label-md text-on-surface-variant">Food</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        itineraryContent.innerHTML = html;

        // Scroll to the itinerary with a slight delay to allow rendering
        setTimeout(() => {
            itineraryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
});