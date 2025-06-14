// Relationship type definitions
const relationshipTypes = [
    { id: 0, name: "Former Partners", color: "#91796e" },
    { id: 1, name: "Friends", color: "#7d697e" },
    { id: 2, name: "Family", color: "#4b6052" },
    { id: 3, name: "Romantic Partners", color: "#934343" },
    { id: 4, name: "Frenemies", color: "#786fad" },
    { id: 5, name: "Friends with Benefits", color: "#c57090" },
    { id: 6, name: "One Night Stands*", color: "white" },
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
                 const disclaimerBox = document.createElement('div');
            disclaimerBox.className = 'zvaigzdute';
            disclaimerBox.innerHTML = `
                * Skirtingų partnerių skaičius per metus skaičiuojamas <i>assuminant</i>, kad personažas pradėjo užsiimti vientkartiniais nuotykiais būdamas 16-os metų (pasaulio vidurkis), ir neatsižvelgiant į laikotarpius, kai personažas turėjo ilgalaikių partnerių. Dėl šitų priežasčių skaičiavimas nėra visiškai tikslus.
            `;
            document.getElementById('stats-container').appendChild(disclaimerBox);
      
            // Create a container for special stats
            const specialStatsContainer = document.createElement('div');
            specialStatsContainer.className = 'special-stats-container';
            document.getElementById('stats-container').appendChild(specialStatsContainer);
            
            // Add controversial and promiscuous stats to the special container
            generateControversialStats(relationships, specialStatsContainer);
            generatePromiscuityStats(relationships, specialStatsContainer);
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
    statBox.style.width = '1150px';
    
    // Add section heading
    
    
    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `
        
        <span class="toptenname">Top 10 Most Controversial Characters</span>
    `;
    statBox.appendChild(header);
    
    const description = document.createElement('div');
    description.className = 'stat-description';
    description.textContent = 'Characters with the most enemies and frenemies';
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
    statBox.style.width = '1150px';
    
    const header = document.createElement('div');
    header.className = 'stat-header';
    header.innerHTML = `
    
        <span class="toptenname">Top 10 Sluttiest characters</span>
    `;
    statBox.appendChild(header);
    
    const description = document.createElement('div');
    description.className = 'stat-description';
    description.textContent = 'Characters with the most friends with benefits and one night stands**';
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
