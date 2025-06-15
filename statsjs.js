// Relationship type definitions
const relationshipTypes = [
    { id: 0, name: "Former Partners", color: "#91796e" },
    { id: 1, name: "Friends", color: "#7d697e" },
    { id: 2, name: "Family", color: "#4b6052" },
    { id: 3, name: "Romantic Partners", color: "#934343" },
    { id: 4, name: "Frenemies", color: "#786fad" },
    { id: 5, name: "Friends with Benefits", color: "#c57090" },
    { id: 6, name: "One Night Stands *", color: "white" },
    { id: 7, name: "Enemies", color: "#00858b" },
    { id: 8, name: "Colleagues", color: "#80938e" }
];

// Race color mapping from main.js
const raceColors = {
    'hunter': 'race-hunter',
    'werewolf': 'race-werewolf',
    'hybrid': 'race-hybrid',
    'witch': 'race-witch',
    'human': 'race-human',
    'vampire': 'race-vampire',
    'volturi': 'race-volturi',
    'hunterwitch': 'race-hunterwitch',
    'vampirehunter': 'race-vampirehunter',
    'vampirewitch': 'race-vampirewitch',
    'supernaturalhuman': 'race-supernaturalhuman',
    'hybridhunter': 'race-hybridhunter',
    'pet': 'race-pet'
};

// Global variable to store character data
let characterData = {};

// Define extra one night stands in a single place
const extraOneNightStands = {
    'Katrina Deva Bianchi': 9,
    'Hera Melody Harlow': 2,
    'Lennon Therasia Windsor': 29,
    'Valeria Euphemia Greco-Whitmore': 4,
    'Carmen Iscariot Denali': 964,
    'Jonathan Fort Harlow': 101,
    'Nathaniel Dean Harlow': 60,
    'Michael Romeo Harlow': 310,
    'Venetia Irida Dragoumis': 3,
    'Emery Herman Bernhard': 39,
    'Randall Frank Dreschler': 495
};

// Dark mode toggle functionality
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".dark-mode-toggle");
    
    // Check local storage for mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style="width: 1em; height: 1em; vertical-align: top; fill: currentColor; overflow: hidden;" viewBox="0 0 1024 1024" version="1.1"><path d="M529.611373 1023.38565c-146.112965 0-270.826063-51.707812-374.344078-155.225827C51.74928 764.641808 0.041469 639.826318 0.041469 493.815745c0-105.053891 29.693595-202.326012 88.978393-292.22593 59.38719-89.797526 137.000103-155.942569 232.83874-198.63991 6.041111-4.607627 12.184613-3.788493 18.225724 2.252618 7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C322.677735 83.736961 310.493122 142.202626 310.493122 201.589815c0 135.464227 48.328885 251.474031 144.986656 348.131801 96.657771 96.657771 212.667574 144.986656 348.131801 144.986656 74.541162 0 139.252721-11.365479 194.032283-34.19883C1003.684974 655.799424 1009.726084 656.618558 1015.767195 662.659669c7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C983.104241 786.758417 918.802249 869.286132 829.721465 930.925939 740.743072 992.565746 640.706375 1023.38565 529.611373 1023.38565z"/></svg>`;
    }

    toggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style="width: 1em; height: 1em; vertical-align: top; fill: currentColor; overflow: hidden;" viewBox="0 0 1024 1024" version="1.1"><path d="M529.611373 1023.38565c-146.112965 0-270.826063-51.707812-374.344078-155.225827C51.74928 764.641808 0.041469 639.826318 0.041469 493.815745c0-105.053891 29.693595-202.326012 88.978393-292.22593 59.38719-89.797526 137.000103-155.942569 232.83874-198.63991 6.041111-4.607627 12.184613-3.788493 18.225724 2.252618 7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C322.677735 83.736961 310.493122 142.202626 310.493122 201.589815c0 135.464227 48.328885 251.474031 144.986656 348.131801 96.657771 96.657771 212.667574 144.986656 348.131801 144.986656 74.541162 0 139.252721-11.365479 194.032283-34.19883C1003.684974 655.799424 1009.726084 656.618558 1015.767195 662.659669c7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C983.104241 786.758417 918.802249 869.286132 829.721465 930.925939 740.743072 992.565746 640.706375 1023.38565 529.611373 1023.38565z"/></svg>`;
        } else {
            localStorage.removeItem("darkMode");
            toggle.innerText = "☀︎";
        }
    });

    // First load character data, then load and process relationship data
    fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/avatarai.txt')
        .then(response => response.text())
        .then(processRaceData)
        .then(() => fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/Points.txt'))
        .then(response => response.text())
        .then(processData)
        .then(relationships => {
            generateStatistics(relationships); // Regular stats first
            
            // Create container for top lists
            const topListsContainer = document.createElement('div');
            topListsContainer.className = 'top-lists-container';
            document.getElementById('stats-container').appendChild(topListsContainer);
            
            // Create sub-container for controversial stats
            const controversialContainer = document.createElement('div');
            controversialContainer.className = 'top-list-subcontainer';
            topListsContainer.appendChild(controversialContainer);
            generateControversialStats(relationships, controversialContainer);
            
            // Create sub-container for promiscuity stats
            const promiscuityContainer = document.createElement('div');
            promiscuityContainer.className = 'top-list-subcontainer';
            topListsContainer.appendChild(promiscuityContainer);
            generatePromiscuityStats(relationships, promiscuityContainer);
            
            // Add disclaimer box
            const disclaimerBox = document.createElement('div');
            disclaimerBox.className = 'zvaigzdute';
            disclaimerBox.innerHTML = `
                * Skirtingų partnerių skaičius per metus skaičiuojamas <i>assuminant</i>, kad personažas pradėjo užsiimti vientkartiniais nuotykiais būdamas 16-os metų, ir neatsižvelgiant į laikotarpius, kai personažas turėjo ilgalaikių partnerių. Dėl šitų priežasčių skaičiavimas nėra visiškai tikslus. Į statistiką įtraukti ir vienos nakties nuotykiai, kurių nėra networke kaip personažų (aka pridėti randominiai skaičiai apytiksliai paskaičiavus, ant kiek personažas yra pretty little slut).<br><br>** Personažai, turintys daugiausiai priešų ir frenemies.<br><br>*** Išdėstyti mažėjančia tvarka pagal skirtingų partnerių skaičių per <b>vienerius</b> metus.
            `;
            document.getElementById('stats-container').appendChild(disclaimerBox);
            
            // Load and process country data
            return fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/countries.txt');
        })
        .then(response => response.text())
        .then(processCountryData)
        .then(countryStats => {
            // Load and process gender data before generating stats
            return fetch('https://raw.githubusercontent.com/nedoramoteris/forksfc/refs/heads/main/veidai.txt')
                .then(response => response.text())
                .then(text => {
                    const genderStats = processGenderData(text);
                    // Create container for distribution lists
                    const distributionContainer = document.createElement('div');
                    distributionContainer.className = 'distribution-container';
                    document.getElementById('stats-container').appendChild(distributionContainer);
                    
                    // Create sub-container for race stats
                    const raceContainer = document.createElement('div');
                    raceContainer.className = 'distribution-subcontainer';
                    distributionContainer.appendChild(raceContainer);
                    generateRaceStats(raceContainer);
                    
                    // Create sub-container for country stats
                    const countryContainer = document.createElement('div');
                    countryContainer.className = 'distribution-subcontainer';
                    distributionContainer.appendChild(countryContainer);
                    generateCountryStats(countryStats, countryContainer);
                    
                    // Generate species by gender chart
                    generateSpeciesGenderStats(text.split('\n').filter(line => line.trim()));
                    
                    // Generate gender stats at the bottom
                    generateGenderStats(genderStats);
                    
                    // Generate couples by race stats
                    generateCouplesByRaceStats();
                });
        })
        .catch(error => console.error("Error loading data:", error));
});

function processRaceData(raceText) {
    const lines = raceText.split('\n').filter(line => line.trim());
    
    lines.forEach(line => {
        const parts = line.split('\t');
        if (parts.length >= 4) {
            const name = parts[0].trim();
            const race = parts[2].trim().toLowerCase();
            const birthDate = parts[3].trim();
            
            characterData[name] = {
                race: race,
                birthDate: birthDate
            };
        }
    });
}

function processData(pointsText) {
    const lines = pointsText.split('\n').filter(line => line.trim());
    const relationships = [];
    
    // Process each line to extract relationships
    lines.forEach(line => {
        // Skip section headers
        if (line.startsWith('-') || line.startsWith('Natanielis Jaunesnysis') || line.startsWith('AUGINTINIAI') || line.startsWith('THE ORIGINAL ITALAI')) {
            return;
        }
        
        const parts = line.split('\t');
        if (parts.length >= 4) {
            const source = parts[0].trim();
            const target = parts[1].trim();
            const relationship = parseInt(parts[2]);
            const type = parseInt(parts[3]);
            
            // Only add valid relationships (0-8)
            if (!isNaN(relationship) && relationship >= 0 && relationship <= 8) {
                relationships.push({
                    source,
                    target,
                    relationship,
                    type
                });
            }
        }
    });
    
    return relationships;
}

function processCountryData(countryText) {
    const lines = countryText.split('\n').filter(line => line.trim());
    const countryStats = {};
    
    lines.forEach(line => {
        const parts = line.split('\t');
        if (parts.length >= 3) {
            const country = parts[2].trim();
            if (country) {
                countryStats[country] = (countryStats[country] || 0) + 1;
            }
        }
    });
    
    return countryStats;
}

function processGenderData(genderText) {
    const lines = genderText.split('\n').filter(line => line.trim());
    const genderStats = {
        'male': 0,
        'female': 0
    };
    
    lines.forEach(line => {
        const parts = line.split('\t');
        if (parts.length >= 3) {
            const gender = parts[2].trim().toLowerCase();
            if (gender === 'male' || gender === 'female') {
                genderStats[gender]++;
            }
        }
    });
    
    return genderStats;
}

function calculatePerYearStats(count, birthDate) {
    const currentYear = new Date().getFullYear();
    
    if (!birthDate) return "unknown";
    
    // Handle BC dates (format like "300 BC")
    if (birthDate.includes("BC")) {
        const bcYear = parseInt(birthDate.split("BC")[0].trim());
        if (isNaN(bcYear)) return "unknown";
        
        const age = currentYear + bcYear;
        const yearsActive = Math.max(0, age - 16);
        return yearsActive > 0 ? (count / yearsActive).toFixed(2) : "∞";
    } 
    
    // Handle regular dates (format like "1985-05-15" or just "1985")
    const birthYear = parseInt(birthDate.split('-')[0]);
    if (isNaN(birthYear)) return "unknown";
    
    const age = currentYear - birthYear;
    const yearsActive = Math.max(0, age - 16);
    return yearsActive > 0 ? (count / yearsActive).toFixed(2) : "∞";
}

function generateStatistics(relationships) {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = ''; // Clear previous content
    
    // Create a stats box for each relationship type
    relationshipTypes.forEach(relType => {
        // Count relationships for this type
        const relCounts = {};
        const processedPairs = new Set();
        
        relationships.forEach(rel => {
            if (rel.relationship === relType.id) {
                const pairKey = [rel.source, rel.target].sort().join('|');
                
                if (!processedPairs.has(pairKey)) {
                    processedPairs.add(pairKey);
                    relCounts[rel.source] = (relCounts[rel.source] || 0) + 1;
                    relCounts[rel.target] = (relCounts[rel.target] || 0) + 1;
                }
            }
        });
        
        // Special handling for Friends
        if (relType.id === 1) {
            const draugaiPairs = [
                { main: 'Katrina Deva Bianchi', draugai: 'Katrinos Draugai' },
                { main: 'Arya Natalie Davenport', draugai: 'Arijos Draugai' },
                { main: 'Demetria Nadira Harlow', draugai: 'Demetrijos Draugai' },
                { main: 'Florence Elise Winslow', draugai: 'Florencijos draugei' },
                { main: 'Lennon Therasia Windsor', draugai: 'Lenon Draugai' },
                { main: 'Leone Battista Dalmonte', draugai: 'Leono Draugai' },
                { main: 'West Elliot Harlow', draugai: 'Vesto Draugai' }
            ];
            
            draugaiPairs.forEach(pair => {
                if (relCounts[pair.main] || relCounts[pair.draugai]) {
                    const combinedCount = (relCounts[pair.main] || 0) + (relCounts[pair.draugai] || 0);
                    delete relCounts[pair.main];
                    delete relCounts[pair.draugai];
                    if (combinedCount > 0) relCounts[pair.main] = combinedCount;
                }
            });
            
            ['Katrina Deva Bianchi', 'Arya Natalie Davenport', 'West Elliot Harlow', 
             'Leone Battista Dalmonte', 'Lennon Therasia Windsor'].forEach(character => {
                if (relCounts[character]) {
                    relCounts[character] = Math.max(0, relCounts[character] - 2);
                }
            });
        }
        
        // Add extra one night stands
        if (relType.id === 6) {
            for (const [name, count] of Object.entries(extraOneNightStands)) {
                relCounts[name] = (relCounts[name] || 0) + count;
            }
        }
        
        // Prepare data for display
        let displayData = Object.entries(relCounts).map(([name, count]) => {
            const race = characterData[name]?.race || 'other';
            const displayItem = { name, count, race };
            
            if (relType.id === 6) {
                const birthDate = characterData[name]?.birthDate;
                displayItem.perYear = calculatePerYearStats(count, birthDate);
            }
            
            return displayItem;
        }).sort((a, b) => b.count - a.count);
        
        // Create the stats box
        const statBox = document.createElement('div');
        statBox.className = 'stat-box';
        
        const header = document.createElement('div');
        header.className = 'stat-header';
        header.innerHTML = `
            <div class="stat-header-color" style="background:${relType.color}"></div>
            <span>${relType.name}</span>
        `;
        statBox.appendChild(header);
        
        const listContainer = document.createElement('div');
        listContainer.className = 'stat-list';
        
        displayData.forEach(item => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = `stat-name ${raceColors[item.race] || 'race-other'}`;
            nameSpan.textContent = item.name;
            
            const countSpan = document.createElement('span');
            countSpan.className = 'stat-count';
            if (relType.id === 6) {
                countSpan.innerHTML = `<span class="stat-total">${item.count}</span> <span class="stat-per-year">(${item.perYear}/yr)</span>`;
            } else {
                countSpan.textContent = item.count;
            }
            
            statItem.appendChild(nameSpan);
            statItem.appendChild(countSpan);
            listContainer.appendChild(statItem);
        });
        
        statBox.appendChild(listContainer);
        statsContainer.appendChild(statBox);
    });
}

function generateControversialStats(relationships, container) {
    const controversyScores = {};
    
    // Calculate controversy score based only on enemies and frenemies
    relationships.forEach(rel => {
        if (rel.relationship === 4 || rel.relationship === 7) { // Frenemies or Enemies
            // Both participants in the relationship get points
            controversyScores[rel.source] = (controversyScores[rel.source] || 0) + 1;
            controversyScores[rel.target] = (controversyScores[rel.target] || 0) + 1;
        }
    });
    
    // Prepare data for display - top 10 only
    const displayData = Object.entries(controversyScores)
        .map(([name, score]) => {
            const race = characterData[name]?.race || 'other';
            return { name, score, race };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    
    // Create the stats box
    const statBox = document.createElement('div');
    statBox.className = 'stat-box controversial-box';
    statBox.style.width = '550px';
    
    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `
        <span class="toptenname">Top 10 Most Controversial Characters **</span>
    `;
    statBox.appendChild(header);
    
    const description = document.createElement('div');
    description.className = 'stat-description';
    description.textContent = '';
    statBox.appendChild(description);
    
    const listContainer = document.createElement('div');
    listContainer.className = 'stat-list';
    
    displayData.forEach((item, index) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        const rankSpan = document.createElement('span');
        rankSpan.className = 'stat-rank';
        rankSpan.textContent = `${index + 1}.`;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = `stat-name ${raceColors[item.race] || 'race-other'}`;
        nameSpan.textContent = item.name;
        
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'stat-count';
        scoreSpan.textContent = item.score;
        
        statItem.appendChild(rankSpan);
        statItem.appendChild(nameSpan);
        statItem.appendChild(scoreSpan);
        listContainer.appendChild(statItem);
    });
    
    statBox.appendChild(listContainer);
    container.appendChild(statBox);
}

function generatePromiscuityStats(relationships, container) {
    const promiscuityScores = {};
    
    // Calculate promiscuity score based on one night stands and friends with benefits
    relationships.forEach(rel => {
        if (rel.relationship === 5 || rel.relationship === 6) { // FWB or ONS
            // Both participants in the relationship get points
            promiscuityScores[rel.source] = (promiscuityScores[rel.source] || 0) + 1;
            promiscuityScores[rel.target] = (promiscuityScores[rel.target] || 0) + 1;
        }
    });
    
    // Add the extra one night stands from our global constant
    for (const [name, count] of Object.entries(extraOneNightStands)) {
        promiscuityScores[name] = (promiscuityScores[name] || 0) + count;
    }
    
    // Prepare data for display - now with perYear as a number for sorting
    let displayData = Object.entries(promiscuityScores)
        .map(([name, score]) => {
            const race = characterData[name]?.race || 'other';
            const birthDate = characterData[name]?.birthDate;
            const perYearValue = parseFloat(calculatePerYearStats(score, birthDate)) || 0;
            return { 
                name, 
                score, 
                race, 
                perYearValue,
                perYear: isFinite(perYearValue) ? perYearValue.toFixed(2) : "∞"
            };
        })
        .sort((a, b) => {
            // Sort by perYearValue descending, then by total score descending
            if (b.perYearValue !== a.perYearValue) {
                return b.perYearValue - a.perYearValue;
            }
            return b.score - a.score;
        })
        .slice(0, 10);
    
    // Create the stats box
    const statBox = document.createElement('div');
    statBox.className = 'stat-box promiscuity-box';
    statBox.style.width = '550px';
    
    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `
        <span class="toptenname">Top 10 Sluttiest characters ***</span>
    `;
    statBox.appendChild(header);
    
    const description = document.createElement('div');
    description.className = 'stat-description';
    description.textContent = ' ';
    statBox.appendChild(description);
    
    const listContainer = document.createElement('div');
    listContainer.className = 'stat-list';
    
    displayData.forEach((item, index) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        const rankSpan = document.createElement('span');
        rankSpan.className = 'stat-rank';
        rankSpan.textContent = `${index + 1}.`;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = `stat-name ${raceColors[item.race] || 'race-other'}`;
        nameSpan.textContent = item.name;
        
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'stat-count';
        scoreSpan.innerHTML = `<span class="stat-total">${item.perYear}/yr</span> <span class="stat-per-year">(${item.score} total)</span>`;
        
        statItem.appendChild(rankSpan);
        statItem.appendChild(nameSpan);
        statItem.appendChild(scoreSpan);
        listContainer.appendChild(statItem);
    });
    
    statBox.appendChild(listContainer);
    container.appendChild(statBox);
}

function generateRaceStats(container) {
    const raceStats = {};
    
    // Count races from character data
    for (const [name, data] of Object.entries(characterData)) {
        if (data.race) {
            raceStats[data.race] = (raceStats[data.race] || 0) + 1;
        }
    }
    
    // Prepare data for display - sorted by count descending
    const displayData = Object.entries(raceStats)
        .map(([race, count]) => ({ 
            race: race.charAt(0).toUpperCase() + race.slice(1), 
            count 
        }))
        .sort((a, b) => b.count - a.count);
    
    // Create the stats box
    const statBox = document.createElement('div');
    statBox.className = 'stat-box race-box';
    statBox.style.width = '550px';
    
    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `
        <span class="toptenname">Distribution by species</span>
    `;
    statBox.appendChild(header);
    
    const description = document.createElement('div');
    description.className = 'stat-description';
    description.textContent = '';
    statBox.appendChild(description);
    
    const listContainer = document.createElement('div');
    listContainer.className = 'stat-list';
    listContainer.style.maxHeight = '170px';
    
    displayData.forEach((item, index) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        const rankSpan = document.createElement('span');
        rankSpan.className = 'stat-rank';
        rankSpan.textContent = `${index + 1}.`;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = `stat-name ${raceColors[item.race.toLowerCase()] || 'race-other'}`;
        nameSpan.textContent = item.race;
        
        const countSpan = document.createElement('span');
        countSpan.className = 'stat-count';
        countSpan.textContent = item.count;
        
        statItem.appendChild(rankSpan);
        statItem.appendChild(nameSpan);
        statItem.appendChild(countSpan);
        listContainer.appendChild(statItem);
    });
    
    statBox.appendChild(listContainer);
    container.appendChild(statBox);
}

function generateCountryStats(countryStats, container) {
    // Prepare data for display - sorted by count descending
    const displayData = Object.entries(countryStats)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count);
    
    // Create the stats box
    const statBox = document.createElement('div');
    statBox.className = 'stat-box country-box';
    statBox.style.width = '550px';
    
    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `
        <span class="toptenname">Distribution by country *</span>
    `;
    statBox.appendChild(header);
    
    const description = document.createElement('div');
    description.className = 'stat-description';
    description.textContent = '';
    statBox.appendChild(description);
    
    const listContainer = document.createElement('div');
    listContainer.className = 'stat-list';
    listContainer.style.maxHeight = '170px';
    
    displayData.forEach((item, index) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        const rankSpan = document.createElement('span');
        rankSpan.className = 'stat-rank';
        rankSpan.textContent = `${index + 1}.`;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'stat-name';
        nameSpan.textContent = item.country;
        
        const countSpan = document.createElement('span');
        countSpan.className = 'stat-count';
        countSpan.textContent = item.count;
        
        statItem.appendChild(rankSpan);
        statItem.appendChild(nameSpan);
        statItem.appendChild(countSpan);
        listContainer.appendChild(statItem);
    });

    // Add disclaimer box
    const disclaimerBox = document.createElement('div');
    disclaimerBox.className = 'zvaigzdute';
    disclaimerBox.innerHTML = `
        * Pasiskirstymas pagal šalis nebūtinai nurodo pasiskirstymą pagal tautybes. Čia – personažų <i>gimimo</i> šalys.
    `;
    document.getElementById('stats-container').appendChild(disclaimerBox);
        
    statBox.appendChild(listContainer);
    container.appendChild(statBox);
}

function generateGenderStats(genderStats) {
    // Prepare data for display - sorted by count descending
    const displayData = Object.entries(genderStats)
        .map(([gender, count]) => ({ gender, count }))
        .sort((a, b) => b.count - a.count);
    
    // Create the stats box
    const statBox = document.createElement('div');
    statBox.className = 'stat-box gender-box';
    statBox.style.width = '1150px';
    statBox.style.marginTop = '20px';
    
    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `
        <span class="toptenname">Overall distribution by gender</span>
    `;
    statBox.appendChild(header);
    
    const description = document.createElement('div');
    description.className = 'stat-description';
    description.textContent = '';
    statBox.appendChild(description);
    
    const listContainer = document.createElement('div');
    listContainer.className = 'stat-list';
    listContainer.style.maxHeight = '80px';
    
    displayData.forEach((item, index) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        const rankSpan = document.createElement('span');
        rankSpan.className = 'stat-rank';
        rankSpan.textContent = `${index + 1}.`;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'stat-name';
        nameSpan.textContent = item.gender.charAt(0).toUpperCase() + item.gender.slice(1);
  
        const countSpan = document.createElement('span');
        countSpan.className = 'stat-count';
        countSpan.textContent = item.count;
        
        statItem.appendChild(rankSpan);
        statItem.appendChild(nameSpan);
        statItem.appendChild(countSpan);
        listContainer.appendChild(statItem);
    });
    
    statBox.appendChild(listContainer);
    
    // Append to the container
    const container = document.getElementById('stats-container');
    container.appendChild(statBox);
}

function generateSpeciesGenderStats(genderLines) {
    // First build a mapping of character names to their genders
    const genderMap = {};
    genderLines.forEach(line => {
        const parts = line.split('\t');
        if (parts.length >= 3) {
            const name = parts[1].trim();
            const gender = parts[2].trim().toLowerCase();
            if (gender === 'male' || gender === 'female') {
                genderMap[name] = gender;
            }
        }
    });

    // Now build the stats object
    const stats = {};
    
    // Initialize all possible race-gender combinations
    Object.keys(raceColors).forEach(race => {
        stats[`${race}-male`] = 0;
        stats[`${race}-female`] = 0;
    });
    stats['other-male'] = 0;
    stats['other-female'] = 0;

    // Count each character
    Object.entries(characterData).forEach(([name, data]) => {
        const race = data.race || 'other';
        const gender = genderMap[name] || 'unknown';
        
        if (gender === 'male' || gender === 'female') {
            const key = `${race}-${gender}`;
            stats[key] = (stats[key] || 0) + 1;
        }
    });

    // Prepare data for display - group by race, then show male/female counts
    const displayData = {};
    Object.entries(stats).forEach(([key, count]) => {
        if (count > 0) {
            const [race, gender] = key.split('-');
            if (!displayData[race]) {
                displayData[race] = { male: 0, female: 0 };
            }
            displayData[race][gender] = count;
        }
    });

    // Create the stats box
    const statBox = document.createElement('div');
    statBox.className = 'stat-box species-gender-box';
    statBox.style.width = '1150px';
    statBox.style.marginTop = '20px';

    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `
        <span class="toptenname">Species by Gender Distribution</span>
    `;
    statBox.appendChild(header);

    const description = document.createElement('div');
    description.className = 'stat-description';
    description.textContent = '';
    statBox.appendChild(description);

    const listContainer = document.createElement('div');
    listContainer.className = 'stat-list species-gender-list';
    listContainer.style.maxHeight = 'none';
    listContainer.style.display = 'flex';
    listContainer.style.flexWrap = 'wrap';
    listContainer.style.gap = '20px';

    // Sort races by total count (descending)
    const sortedRaces = Object.entries(displayData)
        .map(([race, counts]) => ({
            race,
            total: counts.male + counts.female,
            ...counts
        }))
        .sort((a, b) => b.total - a.total);

    sortedRaces.forEach(item => {
        const raceItem = document.createElement('div');
        raceItem.className = 'species-gender-item';
        raceItem.style.width = '330px';
        raceItem.style.marginBottom = '10px';

        const raceHeader = document.createElement('div');
        raceHeader.className = 'species-gender-header';
        raceHeader.style.display = 'flex';
        raceHeader.style.alignItems = 'center';
        raceHeader.style.marginBottom = '5px';

        const raceColor = document.createElement('div');
        raceColor.className = 'species-gender-color';
        raceColor.style.width = '15px';
        raceColor.style.height = '15px';
        raceColor.style.marginRight = '10px';
        raceColor.style.borderRadius = '3px';
        
        // Get the color for this race (using the first color if gradient)
        const raceClass = raceColors[item.race.toLowerCase()] || 'race-other';
        const raceElement = document.createElement('span');
        raceElement.className = `stat-name ${raceClass}`;
        raceElement.textContent = item.race.charAt(0).toUpperCase() + item.race.slice(1);
        
        raceHeader.appendChild(raceColor);
        raceHeader.appendChild(raceElement);

        const maleBar = createGenderBar('male', item.male, item.total);
        const femaleBar = createGenderBar('female', item.female, item.total);

        raceItem.appendChild(raceHeader);
        raceItem.appendChild(maleBar);
        raceItem.appendChild(femaleBar);
        listContainer.appendChild(raceItem);

        // Set the color after the element is in DOM so we can compute the gradient
        setTimeout(() => {
            const computedColor = window.getComputedStyle(raceElement).color;
            raceColor.style.background = computedColor;
        }, 0);
    });

    statBox.appendChild(listContainer);

    // Append to the container
    const container = document.getElementById('stats-container');
    container.appendChild(statBox);
}

function createGenderBar(gender, count, total) {
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    
    const barContainer = document.createElement('div');
    barContainer.className = 'gender-bar-container';
    barContainer.style.display = 'flex';
    barContainer.style.alignItems = 'center';
    barContainer.style.marginBottom = '3px';

    const genderLabel = document.createElement('span');
    genderLabel.className = 'gender-label';
    genderLabel.textContent = gender.charAt(0).toUpperCase() + gender.slice(1) + ':';
    genderLabel.style.width = '60px';
    genderLabel.style.fontSize = '12px';

    const bar = document.createElement('div');
    bar.className = 'gender-bar';
    bar.style.height = '15px';
    bar.style.borderRadius = '3px';
    bar.style.width = `${percentage}%`;
    bar.style.background = gender === 'male' ? '#4c4957' : '#b58d84';
    bar.style.position = 'relative';
    bar.style.transition = 'width 0.5s ease';

    const countLabel = document.createElement('span');
    countLabel.className = 'gender-count';
    countLabel.textContent = `${count} (${percentage}%)`;
    countLabel.style.marginLeft = '5px';
    countLabel.style.fontSize = '11px';

    barContainer.appendChild(genderLabel);
    barContainer.appendChild(bar);
    barContainer.appendChild(countLabel);

    return barContainer;
}

function generateCouplesByRaceStats() {
    fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/Points.txt')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n').filter(line => line.trim());
            const racePairs = {};
            const processedPairs = new Set();

            lines.forEach(line => {
                if (line.startsWith('-') || line.startsWith('Natanielis Jaunesnysis') || 
                    line.startsWith('AUGINTINIAI') || line.startsWith('THE ORIGINAL ITALAI')) {
                    return;
                }
                
                const parts = line.split('\t');
                if (parts.length >= 4) {
                    const source = parts[0].trim();
                    const target = parts[1].trim();
                    const type = parseInt(parts[3]);
                    
                    if (type === 3) {
                        const pairKey = [source, target].sort().join('|');
                        
                        if (!processedPairs.has(pairKey)) {
                            processedPairs.add(pairKey);
                            const race1 = characterData[source]?.race || 'other';
                            const race2 = characterData[target]?.race || 'other';
                            const racePairKey = [race1, race2].sort().join('+');
                            racePairs[racePairKey] = (racePairs[racePairKey] || 0) + 1;
                        }
                    }
                }
            });

            const displayData = Object.entries(racePairs)
                .map(([pair, count]) => {
                    const [race1, race2] = pair.split('+');
                    return {
                        pair: `${race1.charAt(0).toUpperCase() + race1.slice(1)} + ${race2.charAt(0).toUpperCase() + race2.slice(1)}`,
                        count,
                        race1,
                        race2
                    };
                })
                .sort((a, b) => b.count - a.count);

            const statBox = document.createElement('div');
            statBox.className = 'stat-box couples-box';

            const header = document.createElement('div');
            header.className = 'stat-header';
            header.innerHTML = `<span class="toptenname">Romantic Couples by Species</span>`;
            statBox.appendChild(header);

            const listContainer = document.createElement('div');
            listContainer.className = 'stat-list couples-list';

            displayData.forEach((item, index) => {
                const coupleItem = document.createElement('div');
                coupleItem.className = 'couples-item';

                // Left side - rank and race pair
                const coupleInfo = document.createElement('div');
                coupleInfo.className = 'couples-info';

                const rankSpan = document.createElement('span');
                rankSpan.className = 'couples-rank';
                rankSpan.textContent = `${index + 1}.`;

                const race1Element = document.createElement('span');
                race1Element.className = `stat-name ${raceColors[item.race1] || 'race-other'}`;
                race1Element.textContent = item.race1.charAt(0).toUpperCase() + item.race1.slice(1);

                const plusElement = document.createElement('span');
                plusElement.className = 'couples-plus';
                plusElement.textContent = ' ❤ ';

                const race2Element = document.createElement('span');
                race2Element.className = `stat-name ${raceColors[item.race2] || 'race-other'}`;
                race2Element.textContent = item.race2.charAt(0).toUpperCase() + item.race2.slice(1);

                coupleInfo.appendChild(rankSpan);
                coupleInfo.appendChild(race1Element);
                coupleInfo.appendChild(plusElement);
                coupleInfo.appendChild(race2Element);

                // Right side - bar and count
                const visualContainer = document.createElement('div');
                visualContainer.className = 'couples-visual';

                const barContainer = document.createElement('div');
                barContainer.className = 'couples-bar-container';

                const bar = document.createElement('div');
                bar.className = 'couples-bar';
                bar.style.width = `${Math.min(100, (item.count / displayData[0].count) * 100)}%`;

                barContainer.appendChild(bar);

                const countLabel = document.createElement('span');
                countLabel.className = 'couples-count';
                countLabel.textContent = item.count;

                visualContainer.appendChild(barContainer);
                visualContainer.appendChild(countLabel);

                coupleItem.appendChild(coupleInfo);
                coupleItem.appendChild(visualContainer);
                listContainer.appendChild(coupleItem);
            });

            statBox.appendChild(listContainer);
            document.getElementById('stats-container').appendChild(statBox);
        })
        .catch(error => console.error("Error loading relationship data:", error));
}
