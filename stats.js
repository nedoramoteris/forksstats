<!DOCTYPE html> 
<html>
<head>
    <title>Forksoverse - Relationship Statistics</title>
    <link rel="icon" href="https://i.servimg.com/u/f57/13/40/85/94/untitl13.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.cdnfonts.com/css/lemonmilk" rel="stylesheet">
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #21211F;
            font-family: 'Montserrat', sans-serif;
            color: #6E6761;
        }

        .dark-mode {
            background: white;
            color: #333;
        }

        .container {
            display: flex;
            flex-direction: column;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        h1 {
            font-family: 'Lemon/Milk light', sans-serif;
            letter-spacing: 1px;
            background-image: linear-gradient(to right, #A8B9BF, #BFA980, #b58d84);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
            text-align: center;
        }

        .stats-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }

        .stat-box {
            background: #292725;
            border-radius: 7px;
            padding: 15px;
            width: 350px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .dark-mode .stat-box {
            background: #f5f5f5;
        }

        .stat-header {
            font-family: 'Lemon/Milk light', sans-serif;
            letter-spacing: 1px;
            font-size: 14px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #444;
            color: #f0f0f0;
            display: flex;
            align-items: center;
        }

        .dark-mode .stat-header {
            color: #333;
            border-bottom-color: #e0e0e0;
        }

        .stat-header-color {
            width: 30px;
            height: 4px;
            margin-right: 10px;
            border-radius: 2px;
        }

        .stat-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 12px;
            padding: 5px;
            border-radius: 4px;
            transition: background-color 0.2s;
        }

        .stat-item:hover {
            background-color: #33312e;
        }

        .dark-mode .stat-item:hover {
            background-color: #f0f0f0;
        }

        .stat-name {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .stat-count {
            font-weight: 600;
            margin-left: 10px;
        }

        .dark-mode-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px;
            border-radius: 7px;
            cursor: pointer;
            z-index: 999;
            font-family: 'archivo', sans-serif;
            font-size: 20px;
            color: #6E6761;
            background-color: rgba(82, 76, 70, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
        }

        .dark-mode-toggle:hover {
            color: #aba19e;
        }

        .back-button {
            position: fixed;
            bottom: 20px;
            left: 20px;
            padding: 10px 15px;
            border-radius: 7px;
            cursor: pointer;
            z-index: 999;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            color: #6E6761;
            background-color: rgba(82, 76, 70, 0.3);
            text-decoration: none;
            text-transform: uppercase;
            font-weight: 600;
        }

        .dark-mode .back-button {
            background-color: #f5f5f5;
        }

        .back-button:hover {
            background-color: rgba(82, 76, 70, 0.5);
        }

        .dark-mode .back-button:hover {
            background-color: #e0e0e0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>RELATIONSHIP STATISTICS</h1>
        
        <div class="stats-container" id="stats-container">
            <!-- Statistics will be populated here by JavaScript -->
        </div>
    </div>

    <a href="index.html" class="back-button">Back to Network</a>
    
    <div class="dark-mode-toggle">☀︎</div>

    <script>
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

        // Dark mode toggle functionality
        document.addEventListener("DOMContentLoaded", function () {
            const toggle = document.querySelector(".dark-mode-toggle");
            
            // Check local storage for mode preference
            if (localStorage.getItem("darkMode") === "enabled") {
                document.body.classList.add("dark-mode");
                toggle.innerHTML = <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style="width: 1em; height: 1em; vertical-align: top; fill: currentColor; overflow: hidden;" viewBox="0 0 1024 1024" version="1.1"><path d="M529.611373 1023.38565c-146.112965 0-270.826063-51.707812-374.344078-155.225827C51.74928 764.641808 0.041469 639.826318 0.041469 493.815745c0-105.053891 29.693595-202.326012 88.978393-292.22593 59.38719-89.797526 137.000103-155.942569 232.83874-198.63991 6.041111-4.607627 12.184613-3.788493 18.225724 2.252618 7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C322.677735 83.736961 310.493122 142.202626 310.493122 201.589815c0 135.464227 48.328885 251.474031 144.986656 348.131801 96.657771 96.657771 212.667574 144.986656 348.131801 144.986656 74.541162 0 139.252721-11.365479 194.032283-34.19883C1003.684974 655.799424 1009.726084 656.618558 1015.767195 662.659669c7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C983.104241 786.758417 918.802249 869.286132 829.721465 930.925939 740.743072 992.565746 640.706375 1023.38565 529.611373 1023.38565z"/></svg>;
            }

            toggle.addEventListener("click", function () {
                document.body.classList.toggle("dark-mode");

                if (document.body.classList.contains("dark-mode")) {
                    localStorage.setItem("darkMode", "enabled");
                    toggle.innerHTML = <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style="width: 1em; height: 1em; vertical-align: top; fill: currentColor; overflow: hidden;" viewBox="0 0 1024 1024" version="1.1"><path d="M529.611373 1023.38565c-146.112965 0-270.826063-51.707812-374.344078-155.225827C51.74928 764.641808 0.041469 639.826318 0.041469 493.815745c0-105.053891 29.693595-202.326012 88.978393-292.22593 59.38719-89.797526 137.000103-155.942569 232.83874-198.63991 6.041111-4.607627 12.184613-3.788493 18.225724 2.252618 7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C322.677735 83.736961 310.493122 142.202626 310.493122 201.589815c0 135.464227 48.328885 251.474031 144.986656 348.131801 96.657771 96.657771 212.667574 144.986656 348.131801 144.986656 74.541162 0 139.252721-11.365479 194.032283-34.19883C1003.684974 655.799424 1009.726084 656.618558 1015.767195 662.659669c7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C983.104241 786.758417 918.802249 869.286132 829.721465 930.925939 740.743072 992.565746 640.706375 1023.38565 529.611373 1023.38565z"/></svg>;
                } else {
                    localStorage.removeItem("darkMode");
                    toggle.innerText = "☀︎";
                }
            });

            // Load and process data
            fetch('https://raw.githubusercontent.com/nedoramoteris/voratinklis/refs/heads/main/Points.txt')
                .then(response => response.text())
                .then(processData)
                .then(generateStatistics)
                .catch(error => console.error("Error loading data:", error));
        });

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
                
                relationships.forEach(rel => {
                    if (rel.relationship === relType.id) {
                        // Count both directions (source->target and target->source)
                        relCounts[rel.source] = (relCounts[rel.source] || 0) + 1;
                        relCounts[rel.target] = (relCounts[rel.target] || 0) + 1;
                    }
                });
                
                // Convert to array and sort by count
                const sortedCounts = Object.entries(relCounts)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 10); // Top 10 only
                
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
                
                // Add each top character
                sortedCounts.forEach(item => {
                    const statItem = document.createElement('div');
                    statItem.className = 'stat-item';
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'stat-name';
                    nameSpan.textContent = item.name;
                    
                    const countSpan = document.createElement('span');
                    countSpan.className = 'stat-count';
                    countSpan.textContent = item.count;
                    
                    statItem.appendChild(nameSpan);
                    statItem.appendChild(countSpan);
                    statBox.appendChild(statItem);
                });
                
                // Add to container
                statsContainer.appendChild(statBox);
            });
        }
    </script>
</body>
</html>