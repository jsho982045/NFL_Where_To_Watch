const playoffData = {
    wildcard: [
        {
            homeTeam: "Chargers",
            awayTeam: "Texans",
            date: "Saturday January 11",
            time: "4:30 PM",
            tv: "CBS",
            streams: ["Fubo", "Paramount+"]
        },
        {
            homeTeam: "Ravens",
            awayTeam: "Steelers",
            date: "Saturday January 11",
            time: "8:00 PM",
            tv: "Not on TV",
            streams: ["Amazon Prime Video"]
        },
        {
            homeTeam: "Bills",
            awayTeam: "Broncos",
            date: "Sunday January 12",
            time: "1:00 PM",
            tv: "CBS",
            streams: ["Fubo", "Paramount+"]
        },
        {
            homeTeam: "Eagles",
            awayTeam: "Packers",
            date: "Sunday January 12",
            time: "4:30 PM",
            tv: "FOX",
            streams: ["Fubo"]
        },
        {
            homeTeam: "Buccaneers",
            awayTeam: "Commanders",
            date: "Sunday January 12",
            time: "8:15 PM",
            tv: "NBC",
            streams: ["Fubo", "Peacock"]
        },
        {
            homeTeam: "Rams",
            awayTeam: "Vikings",
            date: "Monday January 13",
            time: "8:15 PM",
            tv: "ESPN/ABC",
            streams: ["Fubo", "ESPN+"]
        }
    ],
    
    divisional: [
        {
            homeTeam: "Chiefs",
            awayTeam: "Texans",
            date: "Saturday January 18",
            time: "4:30 PM",
            tv: "ABC/ESPN",
            streams: ["Fubo", "ESPN+"] 
        },

        {
            homeTeam: "Lions",
            awayTeam: "Commanders",
            date: "Saturday January 18",
            time: "8:15 PM",
            tv: "FOX",
            streams: ["Fubo"]
        },

        {
            homeTeam: "Eagles",
            awayTeam: "Rams",
            date: "Sunday January 19",
            time: "3:00 PM",
            tv: "NBC",
            streams: ["Fubo", "Peacock"]
        },

        {
            homeTeam: "Bills",
            awayTeam: "Ravens",
            date: "Sunday January 19",
            time: "6:30 PM",
            tv: "CBS",
            streams: ["Fubo", "Paramount+"]
        }
    ],

    conference: [
        {
            homeTeam: "TBD",
            awayTeam: "TBD",
            date: "Sunday January 26",
            time: "3:00 PM",
            tv: "FOX",
            streams: ["Fubo"]
        },

        {
            // AFC Championship Game
            homeTeam: "TBD",
            awayTeam: "TBD",
            date: "Sunday January 26",
            time: "6:30 PM",
            tv: "CBS",
            streams: ["Fubo", "Paramount+"]
        }
    ],

    superbowl: [
        // SuperBowl 59
        {
            homeTeam: "TBD",
            awayTeam: "TBD",
            date: "Sunday February 9",
            time: "6:30 PM",
            tv: "FOX",
            streams: ["Fubo"]
        }
    ]
};

function renderGames(round) {
    const container = document.getElementById(`${round}-games-container`);
    if(!container || !playoffData[round]) return;

    container.innerHTML = ''; 

    playoffData[round].forEach((game, index) => {
        const gameElement = document.createElement('div');
        gameElement.className = 'grid grid-cols-5 gap-4 p-4 hover:bg-gray-50';
        
        const teamStyle = game.homeTeam === 'TBD' ? 'text-gray-400' : 'font-medium';
        const tvStyle = game.tv === 'TBD' ? 'text-gray-400' : '';

        let matchupDisplay = `${game.awayTeam} @ ${game.homeTeam}`;
        if (round === 'conference') {
            matchupDisplay = index === 0 ? 
                `NFC Championship Game: ${game.awayTeam} @ ${game.homeTeam}` : 
                `AFC Championship Game: ${game.awayTeam} @ ${game.homeTeam}`;
        } else if(round === 'superbowl') {
            matchupDisplay = `Super Bowl LVIX; ${game.awayTeam} @ ${game.homeTeam}`;
        }

        let tvDisplay = game.tv;
        let tvClassName = tvStyle;
        if (game.tv === 'Not on TV') {
            tvClassName += ' text-amber-600 font-medium';
        }

        const dayPart = game.date.split(' ')[0];

        gameElement.innerHTML = `
            <div class="flex flex-col text-sm md:text-base">
                <span class="font-medium text-gray-800">${dayPart}</span>
                <span class="text-gray-600">${game.date.replace(dayPart, '').trim()}</span>
            </div>
            <div class="${teamStyle} text-sm md:text-base">${matchupDisplay}</div>
            <div class="text-sm md:text-base">${game.time}</div>
            <div class="${tvClassName} text-sm md:text-base">${tvDisplay}</div>
            <div>
                ${game.streams.map(stream => 
                    `<span class="streaming-tag ${stream === 'TBD' ? 'bg-gray-100 text-gray-600' : ''}">${stream}</span>`
                ).join('')}
            </div>
        `;
        
        container.appendChild(gameElement);
    });
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');

        renderGames(tabId);
    });
});

renderGames('wildcard');