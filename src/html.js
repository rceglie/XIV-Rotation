export const rawHTML = `
<head>
    <meta charset="UTF-8"/>
    <title>FFXIV Opener Tool</title>
    <meta name="description" content="A tool for more advanced FFXIV opener creation."/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
    <header>
        <h1 id="page-title">FFXIV Rotation Tool</h1>
        <button id="discord-btn" onclick="discord_btn_click()">Discord</button>
    </header>
    <main>
        <div id="Job-Select" class="hide-scrollbar border-job-select"></div>
        <div id="content">
            <div id="rotation-display" class="border-div">
                <div id="rotation-skills" class="isEmpty"></div>
                <div id="rotation-buffs" class="isEmpty"></div>
            </div>
            <div id="ability-select">
                <div id="description" class="border-div">
                    <div id="description-header">
                        <h1 id="description-title"></h1>
                        <img id="description-img" class="isEmpty" src="" alt>
                    </div>
                    <p id="description-text"></p>
                    <p id="description-recast"></p>
                </div>
                <div id="gcd-select" class="border-div">
                    <h2>GCD</h2>
                    <div id="gcd-list" class="skill-icon-list hide-scrollbar"></div>
                </div>
                <div id="ogcd-select" class="border-div">
                    <h2>oGCD</h2>
                    <div id="ogcd-list" class="skill-icon-list hide-scrollbar"></div>
                </div>
                <div id="role-other-container">
                    <div id="role-select" class="border-div">
                        <h2>Role Actions</h2>
                        <div id="role-list" class="skill-icon-list hide-scrollbar"></div>
                    </div>
                    <div id="other-select" class="border-div">
                        <h2>Other</h2>
                        <div id="other-list" class="skill-icon-list hide-scrollbar"></div>
                    </div>
                </div>
                <div id="data-display" class="border-div">
                    <h1 id="results-header">Results</h1>
                    <p id="data-text"></p>
                    <p id="data-text2"></p>
                    <p id="test"></p>
                </div>
            </div>
        </div>
    </main>
</body>
`;