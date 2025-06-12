 // Relationship type definitions
        const relationshipTypes = [
            { id: 0, name: "Former Partners", color: "#91796e" },
            { id: 1, name: "Friends", color: "#7d697e" },
            { id: 2, name: "Family", color: "#4b6052" },
            { id: 3, name: "Romantic Partners", color: "#934343" },
            { id: 4, name: "Frenemies", color: "#786fad" },
            { id: 5, name: "Friends with Benefits", color: "#c57090" },
            { id: 6, name: "One Night Stands", color: "white" },
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

        // Global variable to store character races
        let characterRaces = {};

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

            // First load character races, then load and process relationship data
            fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/avatarai.txt')
                .then(response => response.text())
                .then(processRaceData)
                .then(() => fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/Points.txt'))
                .then(response => response.text())
                .then(processData)
                .then(generateStatistics)
                .catch(error => console.error("Error loading data:", error));
        });

        function processRaceData(raceText) {
            const lines = raceText.split('\n').filter(line => line.trim());
            
            lines.forEach(line => {
                const parts = line.split('\t');
                if (parts.length >= 3) {
                    const name = parts[0].trim();
                    const race = parts[2].trim().toLowerCase();
                    characterRaces[name] = race;
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

        function generateStatistics(relationships) {
            const statsContainer = document.getElementById('stats-container');
            
            // Create a stats box for each relationship type
            relationshipTypes.forEach(relType => {
                // Count relationships for this type
                const relCounts = {};
                const processedPairs = new Set(); // To avoid double-counting romantic relationships
                
                relationships.forEach(rel => {
                    if (rel.relationship === relType.id) {
                        // For romantic relationships, count each pair only once
                        if (relType.id === 3) {
                            const pairKey = [rel.source, rel.target].sort().join('|');
                            if (!processedPairs.has(pairKey)) {
                                processedPairs.add(pairKey);
                                relCounts[rel.source] = (relCounts[rel.source] || 0) + 1;
                                relCounts[rel.target] = (relCounts[rel.target] || 0) + 1;
                            }
                        } else {
                            // For other relationship types, count both directions
                            relCounts[rel.source] = (relCounts[rel.source] || 0) + 1;
                            relCounts[rel.target] = (relCounts[rel.target] || 0) + 1;
                        }
                    }
                });
                
                // Convert to array and sort by count
                const sortedCounts = Object.entries(relCounts)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count);
                
                // Create the stats box
                const statBox = document.createElement('div');
                statBox.className = 'stat-box';
                
                // Create header with colored indicator
                const header = document.createElement('div');
                header.className = 'stat-header';
                
                const colorIndicator = document.createElement('div');
                colorIndicator.className = 'stat-header-color';
                colorIndicator.style.background = relType.color;
                
                const title = document.createElement('span');
                title.textContent = relType.name;
                
                header.appendChild(colorIndicator);
                header.appendChild(title);
                statBox.appendChild(header);
                
                // Create scrollable list container
                const listContainer = document.createElement('div');
                listContainer.className = 'stat-list';
                
                // Add all characters in descending order
                sortedCounts.forEach(item => {
                    const statItem = document.createElement('div');
                    statItem.className = 'stat-item';
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'stat-name';
                    
                    // Determine race class
                    const race = characterRaces[item.name] || 'other';
                    const raceClass = raceColors[race] || 'race-other';
                    nameSpan.classList.add(raceClass);
                    
                    nameSpan.textContent = item.name;
                    
                    const countSpan = document.createElement('span');
                    countSpan.className = 'stat-count';
                    countSpan.textContent = item.count;
                    
                    statItem.appendChild(nameSpan);
                    statItem.appendChild(countSpan);
                    listContainer.appendChild(statItem);
                });
                
                statBox.appendChild(listContainer);
                statsContainer.appendChild(statBox);
            });
        }
