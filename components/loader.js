// loader.js
function initLoader() {
    const hatContainer = document.getElementById('hatContainer');
    const loadingScreen = document.getElementById('loadingScreen');

    if (!hatContainer || !loadingScreen) return;

    const hats = [
        "dad hat", 
        "easter sunday hat", 
        "top hat",
        "baseball cap", 
        "beanie", 
        "beret",
        "cowboy hat", 
        "bucket hat", 
        "fedora",
        "snapback", 
        "chef's hat"
    ];

    let currentHatIndex = 0;

    function showNextHat() {
        if (currentHatIndex < hats.length) {
            const hatElement = document.createElement('div');
            hatElement.className = 'hat-name';
            hatElement.textContent = hats[currentHatIndex];
            hatContainer.appendChild(hatElement);

            setTimeout(() => {
                hatContainer.removeChild(hatElement);
            }, 1500);

            currentHatIndex++;
            setTimeout(showNextHat, 1500);
        } else {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
            }, 500);
        }
    }

    requestAnimationFrame(() => loadingScreen.classList.add('fade-in'));
    showNextHat();
}
