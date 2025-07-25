
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
    'Randall Frank Dreschler': 495,
    'Anastasia Clara Blackwell': 2,
'Arya Natalie Davenport': 248,
'Aurora Vivienne Boucher': 33,
'Camille Lillian Boucher': 392,
'Daniel Apollo Dreschler': 4,
'Deianeira Cecilia Lund': 164,
'Declan Aidan Bernhard': 296,
'Harper Adriana Esposito': 82,
'Juliette Claire Lefèvre': 8,
'Salvatore Edoardo Moretti': 179,
'Theodore Percival Hayes': 3,
'West Elliot Harlow': 222,
'Zachariah Gideon Lund': 15
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
        .then(text => {
            const characterCount = processRaceData(text);
            // Display the character count
            const countElement = document.createElement('div');
countElement.className = 'character-count';
countElement.innerHTML = `“In the state of Washington, under a near constant cover of clouds and rain, there's a small town named Forks. Population: <span class="skaiciukai">${characterCount}</span> people. This is where I'm moving.”`;
document.querySelector('.container').insertBefore(countElement, document.querySelector('.stats-container'));
            document.querySelector('.container').insertBefore(countElement, document.querySelector('.stats-container'));
            
            return text;
        })
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
                    
                    // Generate couples statistics in the new layout
                    generateCouplesStatistics();
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
    
    // Return the count of characters
    return lines.length;
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
                { main: 'Aurora Vivienne Boucher', draugai: 'Auroros Draugai' },
                { main: 'Arya Natalie Davenport', draugai: 'Arijos Draugai' },
                { main: 'Demetria Nadira Harlow', draugai: 'Demetrijos Draugai' },
                { main: 'Florence Elise Winslow', draugai: 'Florencijos Draugai' },
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
            
            ['Katrina Deva Bianchi', 'Aurora Vivienne Boucher', 'Arya Natalie Davenport', 'West Elliot Harlow', 
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

function generateCouplesStatistics() {
    // Create the couples container
    const couplesContainer = document.createElement('div');
    couplesContainer.className = 'couples-container';
    document.getElementById('stats-container').appendChild(couplesContainer);

    // Create left column for species couples
    const leftColumn = document.createElement('div');
    leftColumn.className = 'couples-left-column';
    couplesContainer.appendChild(leftColumn);

    // Create right column for gender couples and total count
    const rightColumn = document.createElement('div');
    rightColumn.className = 'couples-right-column';
    couplesContainer.appendChild(rightColumn);

    // Generate couples by species in the left column
    generateCouplesByRaceStats(leftColumn);

    // Generate couples by gender in the top of right column
    generateCouplesByGenderStats(rightColumn);

    // Generate total couples count in the bottom of right column
    generateTotalCouplesCount(rightColumn);
}

function generateCouplesByRaceStats(container) {
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
                    
                    if (type === 3) { // Romantic partners
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
                plusElement.textContent = ' & ';

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
            container.appendChild(statBox);
        })
        .catch(error => console.error("Error loading relationship data:", error));
}

function generateCouplesByGenderStats(container) {
    fetch('https://raw.githubusercontent.com/nedoramoteris/forksfc/refs/heads/main/veidai.txt')
        .then(response => response.text())
        .then(genderText => {
            // First build a mapping of character names to their genders
            const genderMap = {};
            const genderLines = genderText.split('\n').filter(line => line.trim());
            
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

            // Now fetch the relationships data again to count couples by gender
            return fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/Points.txt')
                .then(response => response.text())
                .then(text => {
                    const lines = text.split('\n').filter(line => line.trim());
                    const genderPairs = {
                        'male+male': 0,
                        'male+female': 0,
                        'female+female': 0
                    };
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
                            
                            if (type === 3) { // Romantic partners
                                const pairKey = [source, target].sort().join('|');
                                
                                if (!processedPairs.has(pairKey)) {
                                    processedPairs.add(pairKey);
                                    const gender1 = genderMap[source] || 'unknown';
                                    const gender2 = genderMap[target] || 'unknown';
                                    
                                    // Only count if both genders are known
                                    if (gender1 !== 'unknown' && gender2 !== 'unknown') {
                                        const genderPairKey = [gender1, gender2].sort().join('+');
                                        if (genderPairKey === 'male+male') {
                                            genderPairs['male+male']++;
                                        } else if (genderPairKey === 'female+female') {
                                            genderPairs['female+female']++;
                                        } else {
                                            genderPairs['male+female']++;
                                        }
                                    }
                                }
                            }
                        }
                    });

                    // Prepare data for display
                    const displayData = [
                        { label: 'Male + Female', count: genderPairs['male+female'], key: 'male+female' },
                        { label: 'Female + Female', count: genderPairs['female+female'], key: 'female+female' },
                        { label: 'Male + Male', count: genderPairs['male+male'], key: 'male+male' }
                    ].sort((a, b) => b.count - a.count);

                    // Create the stats box
                    const statBox = document.createElement('div');
                    statBox.className = 'stat-box couples-gender-box';

                    const header = document.createElement('div');
                    header.className = 'stat-header';
                    header.innerHTML = `<span class="toptenname">Romantic Couples by Gender</span>`;
                    statBox.appendChild(header);

                    const listContainer = document.createElement('div');
                    listContainer.className = 'stat-list couples-gender-list';

                    displayData.forEach((item, index) => {
                        const coupleItem = document.createElement('div');
                        coupleItem.className = 'couples-gender-item';

                        // Left side - label
                        const labelSpan = document.createElement('span');
                        labelSpan.className = 'couples-gender-label';
                        labelSpan.textContent = item.label;

                        // Right side - bar and count
                        const visualContainer = document.createElement('div');
                        visualContainer.className = 'couples-gender-visual';

                        const barContainer = document.createElement('div');
                        barContainer.className = 'couples-gender-bar-container';

                        const bar = document.createElement('div');
                        bar.className = 'couples-gender-bar';
                        bar.style.width = `${Math.min(100, (item.count / Math.max(1, displayData[0].count)) * 100)}%`;
                        
                        // Different colors for different pairings
                        if (item.key === 'male+male') {
                            bar.style.background = '#4c4957'; // Darker color for M+M
                        } else if (item.key === 'female+female') {
                            bar.style.background = '#b58d84'; // Pinkish color for F+F
                        } else {
                            bar.style.background = 'linear-gradient(to right, #4c4957, #b58d84)'; // Gradient for M+F
                        }

                        barContainer.appendChild(bar);

                        const countLabel = document.createElement('span');
                        countLabel.className = 'couples-gender-count';
                        countLabel.textContent = item.count;

                        visualContainer.appendChild(barContainer);
                        visualContainer.appendChild(countLabel);

                        coupleItem.appendChild(labelSpan);
                        coupleItem.appendChild(visualContainer);
                        listContainer.appendChild(coupleItem);
                    });

                    statBox.appendChild(listContainer);
                    container.appendChild(statBox);

                    // Return the total count of all couples
                    return genderPairs['male+male'] + genderPairs['male+female'] + genderPairs['female+female'];
                });
        })
        .then(totalCouples => {
            // Generate the total couples count box
            const totalBox = document.createElement('div');
            totalBox.className = 'stat-box total-couples-box';

            const header = document.createElement('div');
            header.className = 'stat-header';
            header.innerHTML = `<span class="toptenname">Total Romantic Couples</span>`;
            totalBox.appendChild(header);

            const countDisplay = document.createElement('div');
            countDisplay.className = 'total-couples-count';
            countDisplay.textContent = totalCouples;
            totalBox.appendChild(countDisplay);

            container.appendChild(totalBox);
        })
        .catch(error => console.error("Error loading relationship data:", error));
}

function generateTotalCouplesCount(container) {
    // This is now handled within generateCouplesByGenderStats
}
// Add this function to create a tooltip for the couples bars
function createCouplesTooltip(pairs, title) {
    const tooltip = document.createElement('div');
    tooltip.className = 'couples-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '1000';
    tooltip.style.maxWidth = '300px';
    tooltip.style.maxHeight = '400px';
    tooltip.style.overflowY = 'auto';
    tooltip.style.display = 'none';
    
    const tooltipTitle = document.createElement('div');
    tooltipTitle.style.fontWeight = 'bold';
    tooltipTitle.style.marginBottom = '5px';
    tooltipTitle.textContent = title;
    tooltip.appendChild(tooltipTitle);
    
    const list = document.createElement('div');
    list.className = 'couples-tooltip-list';
    pairs.forEach(pair => {
        const pairElement = document.createElement('div');
        pairElement.style.marginBottom = '3px';
        pairElement.textContent = pair;
        list.appendChild(pairElement);
    });
    tooltip.appendChild(list);
    
    document.body.appendChild(tooltip);
    return tooltip;
}

// Modify the generateCouplesByRaceStats function to include the tooltip functionality
function generateCouplesByRaceStats(container) {
    fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/Points.txt')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n').filter(line => line.trim());
            const racePairs = {};
            const racePairDetails = {}; // To store the actual couples for each race pair
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
                    
                    if (type === 3) { // Romantic partners
                        const pairKey = [source, target].sort().join('|');
                        
                        if (!processedPairs.has(pairKey)) {
                            processedPairs.add(pairKey);
                            const race1 = characterData[source]?.race || 'other';
                            const race2 = characterData[target]?.race || 'other';
                            const racePairKey = [race1, race2].sort().join('+');
                            
                            racePairs[racePairKey] = (racePairs[racePairKey] || 0) + 1;
                            
                            // Store the actual couple names
                            if (!racePairDetails[racePairKey]) {
                                racePairDetails[racePairKey] = [];
                            }
                            racePairDetails[racePairKey].push(`${source} & ${target}`);
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
                        race2,
                        pairKey: pair,
                        couples: racePairDetails[pair] || []
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
                plusElement.textContent = ' & ';

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
              
                // Create tooltip for this bar
                const tooltip = createCouplesTooltip(item.couples, item.pair);
                
                bar.addEventListener('mouseenter', (e) => {
                    tooltip.style.display = 'block';
                    // Position the tooltip near the cursor
                    tooltip.style.left = `${e.pageX + 10}px`;
                    tooltip.style.top = `${e.pageY + 10}px`;
                });
                
                bar.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });
                
                bar.addEventListener('mousemove', (e) => {
                    tooltip.style.left = `${e.pageX + 10}px`;
                    tooltip.style.top = `${e.pageY + 10}px`;
                });

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
            container.appendChild(statBox);
        })
        .catch(error => console.error("Error loading relationship data:", error));
}

// Modify the generateCouplesByGenderStats function similarly
function generateCouplesByGenderStats(container) {
    fetch('https://raw.githubusercontent.com/nedoramoteris/forksfc/refs/heads/main/veidai.txt')
        .then(response => response.text())
        .then(genderText => {
            const genderMap = {};
            const genderLines = genderText.split('\n').filter(line => line.trim());
            
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

            return fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/Points.txt')
                .then(response => response.text())
                .then(text => {
                    const lines = text.split('\n').filter(line => line.trim());
                    const genderPairs = {
                        'male+male': { count: 0, couples: [] },
                        'male+female': { count: 0, couples: [] },
                        'female+female': { count: 0, couples: [] }
                    };
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
                            
                            if (type === 3) { // Romantic partners
                                const pairKey = [source, target].sort().join('|');
                                
                                if (!processedPairs.has(pairKey)) {
                                    processedPairs.add(pairKey);
                                    const gender1 = genderMap[source] || 'unknown';
                                    const gender2 = genderMap[target] || 'unknown';
                                    
                                    if (gender1 !== 'unknown' && gender2 !== 'unknown') {
                                        const genderPairKey = [gender1, gender2].sort().join('+');
                                        const displayPair = `${source} & ${target}`;
                                        
                                        if (genderPairKey === 'male+male') {
                                            genderPairs['male+male'].count++;
                                            genderPairs['male+male'].couples.push(displayPair);
                                        } else if (genderPairKey === 'female+female') {
                                            genderPairs['female+female'].count++;
                                            genderPairs['female+female'].couples.push(displayPair);
                                        } else {
                                            genderPairs['male+female'].count++;
                                            genderPairs['male+female'].couples.push(displayPair);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    const displayData = [
                        { 
                            label: 'Male + Female', 
                            count: genderPairs['male+female'].count, 
                            key: 'male+female',
                            couples: genderPairs['male+female'].couples
                        },
                        { 
                            label: 'Female + Female', 
                            count: genderPairs['female+female'].count, 
                            key: 'female+female',
                            couples: genderPairs['female+female'].couples
                        },
                        { 
                            label: 'Male + Male', 
                            count: genderPairs['male+male'].count, 
                            key: 'male+male',
                            couples: genderPairs['male+male'].couples
                        }
                    ].sort((a, b) => b.count - a.count);

                    const statBox = document.createElement('div');
                    statBox.className = 'stat-box couples-gender-box';

                    const header = document.createElement('div');
                    header.className = 'stat-header';
                    header.innerHTML = `<span class="toptenname">Romantic Couples by Gender</span>`;
                    statBox.appendChild(header);

                    const listContainer = document.createElement('div');
                    listContainer.className = 'stat-list couples-gender-list';

                    displayData.forEach((item, index) => {
                        const coupleItem = document.createElement('div');
                        coupleItem.className = 'couples-gender-item';

                        // Left side - label
                        const labelSpan = document.createElement('span');
                        labelSpan.className = 'couples-gender-label';
                        labelSpan.textContent = item.label;

                        // Right side - bar and count
                        const visualContainer = document.createElement('div');
                        visualContainer.className = 'couples-gender-visual';

                        const barContainer = document.createElement('div');
                        barContainer.className = 'couples-gender-bar-container';

                        const bar = document.createElement('div');
                        bar.className = 'couples-gender-bar';
                        bar.style.width = `${Math.min(100, (item.count / Math.max(1, displayData[0].count)) * 100)}%`;
                        
                        // Different colors for different pairings
                        if (item.key === 'male+male') {
                            bar.style.background = '#4c4957';
                        } else if (item.key === 'female+female') {
                            bar.style.background = '#b58d84';
                        } else {
                            bar.style.background = 'linear-gradient(to right, #4c4957, #b58d84)';
                        }

                        // Create tooltip for this bar
                        const tooltip = createCouplesTooltip(item.couples, item.label);
                        
                        bar.addEventListener('mouseenter', (e) => {
                            tooltip.style.display = 'block';
                            tooltip.style.left = `${e.pageX + 10}px`;
                            tooltip.style.top = `${e.pageY + 10}px`;
                        });
                        
                        bar.addEventListener('mouseleave', () => {
                            tooltip.style.display = 'none';
                        });
                        
                        bar.addEventListener('mousemove', (e) => {
                            tooltip.style.left = `${e.pageX + 10}px`;
                            tooltip.style.top = `${e.pageY + 10}px`;
                        });

                        barContainer.appendChild(bar);

                        const countLabel = document.createElement('span');
                        countLabel.className = 'couples-gender-count';
                        countLabel.textContent = item.count;

                        visualContainer.appendChild(barContainer);
                        visualContainer.appendChild(countLabel);

                        coupleItem.appendChild(labelSpan);
                        coupleItem.appendChild(visualContainer);
                        listContainer.appendChild(coupleItem);
                    });

                    statBox.appendChild(listContainer);
                    container.appendChild(statBox);

                    return genderPairs['male+male'].count + genderPairs['male+female'].count + genderPairs['female+female'].count;
                });
        })
        .then(totalCouples => {
            const totalBox = document.createElement('div');
            totalBox.className = 'stat-box total-couples-box';

            const header = document.createElement('div');
            header.className = 'stat-header';
            header.innerHTML = `<span class="toptenname">Total Romantic Couples</span>`;
            totalBox.appendChild(header);

            const countDisplay = document.createElement('div');
            countDisplay.className = 'total-couples-count';
            countDisplay.textContent = totalCouples;
            totalBox.appendChild(countDisplay);

            container.appendChild(totalBox);
        })
        .catch(error => console.error("Error loading relationship data:", error));
}

// Add CSS for the tooltip
const style = document.createElement('style');
style.textContent = `

`;
document.head.appendChild(style);

// ======================
// ACCURATE SPECIES BY COUNTRY STATS (FIXED)
// ======================

function generateSpeciesCountryStats() {
    // Create container
    const container = document.createElement('div');
    container.className = 'species-country-container';
    container.style.width = '1150px';
    container.style.margin = '20px auto';
    document.getElementById('stats-container').appendChild(container);

    // Create the stats box
    const statBox = document.createElement('div');
    statBox.className = 'stat-box species-country-box';
    statBox.style.width = '1150px';
    container.appendChild(statBox);

    // Header
    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `<span class="toptenname">Species Distribution by Country</span>`;
    statBox.appendChild(header);

    // First build a name-to-country map from countries.txt
    const nameToCountry = {};
    const countryCounts = {};
    
    // Process countries data
    fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/countries.txt')
        .then(response => response.text())
        .then(text => {
            text.split('\n').forEach(line => {
                const parts = line.split('\t');
                if (parts.length >= 3) {
                    const name = parts[0].trim();
                    const country = parts[2].trim();
                    if (name && country) {
                        nameToCountry[name] = country;
                        countryCounts[country] = (countryCounts[country] || 0) + 1;
                    }
                }
            });
            
            // Now process species data from characterData (already populated from avatarai.txt)
            const stats = {};
            
            for (const [name, data] of Object.entries(characterData)) {
                const country = nameToCountry[name];
                if (country && data.race) {
                    if (!stats[country]) {
                        stats[country] = {};
                    }
                    stats[country][data.race] = (stats[country][data.race] || 0) + 1;
                }
            }

            // Prepare display data (sorted by total characters - matching country distribution)
            const displayData = Object.entries(stats)
                .map(([country, races]) => ({
                    country,
                    races,
                    total: countryCounts[country] || 0 // Use the exact count from countries.txt
                }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 50);

            // Create the visualization
            const vizContainer = document.createElement('div');
            vizContainer.className = 'species-country-viz';
            vizContainer.style.display = 'flex';
            vizContainer.style.flexWrap = 'wrap';
            vizContainer.style.gap = '15px';
            vizContainer.style.marginTop = '15px';

            displayData.forEach(item => {
                const countryCard = document.createElement('div');
                countryCard.className = 'species-country-card';
                countryCard.style.width = '195px';
                countryCard.style.background = 'rgba(41, 39, 37, 0.7)';
                countryCard.style.borderRadius = '5px';
                countryCard.style.padding = '10px';
                countryCard.style.transition = 'transform 0.3s ease';
                countryCard.style.fontSize = '11px';

                countryCard.innerHTML = `
                    <div class="species-country-header" style="font-weight:bold; margin-bottom:5px; font-size:12px;">
                        ${item.country} <span style="float:right; font-weight:normal;">${item.total}</span>
                    </div>
                `;

                // Sort species by count (descending) and take top 3
                const sortedRaces = Object.entries(item.races)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 50);

                sortedRaces.forEach(([race, count]) => {
                    const raceRow = document.createElement('div');
                    raceRow.style.display = 'flex';
                    raceRow.style.alignItems = 'center';
                    raceRow.style.marginBottom = '3px';
                    raceRow.style.fontSize = '11px';

                    const raceName = document.createElement('span');
                    raceName.className = `stat-name ${raceColors[race] || 'race-other'}`;
                    raceName.textContent = race.charAt(0).toUpperCase() + race.slice(1);
                    raceName.style.width = '70px';
                    raceName.style.overflow = 'hidden';
                    raceName.style.textOverflow = 'ellipsis';
                    raceName.style.whiteSpace = 'nowrap';

                    const barContainer = document.createElement('div');
                    barContainer.style.flexGrow = '1';
                    barContainer.style.margin = '0 5px';
                    barContainer.style.height = '10px';
                    barContainer.style.background = 'rgba(110, 103, 97, 0.1)';
                    barContainer.style.borderRadius = '4px';
                    barContainer.style.overflow = 'hidden';

                    const bar = document.createElement('div');
                    bar.style.height = '100%';
                    bar.style.width = `${(count / item.total) * 100}%`;
                    bar.style.borderRadius = '4px';
                    
                    // Get the color for this race
                    const raceElement = document.createElement('span');
                    raceElement.className = `stat-name ${raceColors[race] || 'race-other'}`;
                    document.body.appendChild(raceElement);
                    const color = window.getComputedStyle(raceElement).color;
                    document.body.removeChild(raceElement);
                    
                    bar.style.background = color;

                    const countLabel = document.createElement('span');
                    countLabel.style.width = '20px';
                    countLabel.style.textAlign = 'right';
                    countLabel.style.fontSize = '10px';
                    countLabel.textContent = count;

                    barContainer.appendChild(bar);
                    raceRow.appendChild(raceName);
                    raceRow.appendChild(barContainer);
                    raceRow.appendChild(countLabel);
                    countryCard.appendChild(raceRow);
                });

                // Show "+X more" if there are additional species
                if (Object.keys(item.races).length > 50) {
                    const moreText = document.createElement('div');
                    moreText.style.fontSize = '10px';
                    moreText.style.color = '#6E6761';
                    moreText.style.textAlign = 'right';
                    moreText.style.marginTop = '3px';
                    moreText.textContent = `+${Object.keys(item.races).length - 3} more`;
                    countryCard.appendChild(moreText);
                }

                vizContainer.appendChild(countryCard);
            });

            statBox.appendChild(vizContainer);

            // Add hover effects
            document.querySelectorAll('.species-country-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-3px)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'none';
                });
            });
        });
}

// Call the function after all other stats are loaded
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(generateSpeciesCountryStats, 1000);
});

// Create Table of Contents
function createTableOfContents() {
    const tocContainer = document.createElement('div');
    tocContainer.className = 'toc-container';
    
    const tocHeader = document.createElement('div');
    tocHeader.className = 'toc-header';
    tocHeader.textContent = 'Table of Contents';
    tocContainer.appendChild(tocHeader);
    
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    // Main sections
    const sections = [
        { 
            title: 'Relationship Stats', 
            selector: '.stats-container', 
            
        },
        { 
            title: 'Top Lists', 
            selector: '.top-lists-container',
            subsections: [
                { title: 'Most Controversial', selector: '.controversial-box' },
                { title: 'Sluttiest Characters', selector: '.promiscuity-box' }
            ]
        },
        { 
            title: 'Distributions', 
            selector: '.distribution-container',
            subsections: [
                { title: 'By Species', selector: '.race-box' },
                { title: 'By Country', selector: '.country-box' },
                { title: 'By Gender', selector: '.gender-box' },
                { title: 'Species by Gender', selector: '.species-gender-box' }
            ]
        },
        { 
            title: 'Couples Stats', 
            selector: '.couples-container',
            subsections: [
                { title: 'By Species', selector: '.couples-box' },
                { title: 'By Gender', selector: '.couples-gender-box' },
                { title: 'Total Count', selector: '.total-couples-box' }
            ]
        },
        { 
            title: 'Species by Country', 
            selector: '.species-country-container'
        }
    ];
    
    sections.forEach(section => {
        const tocItem = document.createElement('li');
        tocItem.className = 'toc-item';
        
        const tocLink = document.createElement('a');
        tocLink.className = 'toc-link';
        tocLink.href = '#';
        tocLink.textContent = section.title;
        tocLink.dataset.target = section.selector;
        
        tocLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(section.selector).scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        tocItem.appendChild(tocLink);
        
        if (section.subsections && section.subsections.length) {
            const subList = document.createElement('ul');
            subList.className = 'toc-sublist';
            
            section.subsections.forEach(subsection => {
                const subItem = document.createElement('li');
                subItem.className = 'toc-item';
                
                const subLink = document.createElement('a');
                subLink.className = 'toc-link';
                subLink.href = '#';
                subLink.textContent = subsection.title;
                subLink.dataset.target = subsection.selector;
                
                subLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelector(subsection.selector).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
                
                subItem.appendChild(subLink);
                subList.appendChild(subItem);
            });
            
            tocItem.appendChild(subList);
        }
        
        tocList.appendChild(tocItem);
    });
    
    tocContainer.appendChild(tocList);
    document.body.appendChild(tocContainer);
    
    // Highlight active section
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.stat-box, .top-lists-container, .distribution-container, .couples-container, .species-country-container');
        let activeSection = null;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                activeSection = section;
            }
        });
        
        document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
            if (activeSection && link.dataset.target && activeSection.matches(link.dataset.target)) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial highlight
}

// Call the function after DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(createTableOfContents, 1500); // Delay to ensure all content is loaded
});
