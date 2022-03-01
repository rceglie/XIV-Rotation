import { skillsWhitelist } from '../modules/skillwhitelist.js'
import { skillsBlacklist } from '../modules/skillblacklist.js'
import { globalSkillsList } from '../modules/globalskillslist.js'
import { gcdOverrides } from '../modules/gcdoverrides.js'
import { ogcdOverrides } from '../modules/ogcdoverrides.js'
import { Ability } from '../modules/Ability.js'
import { allAbilities } from '../modules/allAbilities.js'
import { allBuffs } from '../modules/allBuffs.js'

let jobList = [];
let jobSkills = {};
let roleSkills = {};
let MoxSetting = false;
let currentJobId = 0;

let rotation = [];
let rotationBuffs = [];

const xivapi_request = "https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation";

document.addEventListener("DOMContentLoaded", () => { // Go into job icon stuff
    fetch(xivapi_request)
    .then(response => response.json())
        .then(function (json) {
            json.Results.forEach(job => {
                // Ignores classes
                if (job.ItemSoulCrystalTargetID === 0) {return;}

                // Ignores limited jobs
                if (job.IsLimitedJob === 1) { return;}

                // This block is filtering Crafter/Gatherer roles
                let classJobCategoryIds = [30, 31];
                // ClassJobCategory.ID 30 & 31 = Disciple of War/Magic
                // ClassJobCategory.ID 32 & 33 = Disciple of Land/Hand
                if (!classJobCategoryIds.includes(job.ClassJobCategory.ID)) { return; } // IF it does NOT include 30/31, skip it

                // Gives casters their own role (5)
                if (job.Role === 3 && job.ClassJobCategory.ID === 31)
                    job.Role = 5;

                // Adds to jobList
                jobList.push(job);
            });

            let roleSortOrder = [1, 4, 2, 3, 5]; // 1 Tank, 4 Healer, 2 Melee, 3 Ranged, 5 Caster

            // Sorts jobList
            jobList.sort(function (a, b) {
                if (a.Role == b.Role)
                    return a.Role - b.Role;
                return roleSortOrder.indexOf(a.Role) - roleSortOrder.indexOf(b.Role);
            });

            // // Creates a job selection button for every job
            // jobList.forEach(job => {
            //     let JobSelectBtn = document.createElement("input");
            //     JobSelectBtn.type = "radio";
            //     JobSelectBtn.name = "JobSelect";
            //     JobSelectBtn.classList = `job-icon role-${job.Role}`;
            //     JobSelectBtn.onclick = function() { getJobSkills(job.ID) };
            //     JobSelectBtn.style.backgroundImage = `url('https://xivapi.com${job.Icon}')`;
            //     JobSelectBtn.style.backgroundColor = jobSelectBackgroundColor(job.Role);
            //     document.getElementById("Job-Select").appendChild(JobSelectBtn);
            // });
        })
        .catch(function (ex) {
            console.log("parsing failed", ex);
        });
        
    // Make the rotation div sortable (calls sortableJS that is imported index.html)
    // may break for older browsers ???
    // will need to switch to something better at some point.
    //new Sortable(document.getElementById("Rotation-Skills"));
    //new Sortable(document.getElementById("Rotation-Buffs"));
    
});

function jobSelectBackgroundColor(role) {
    switch (role) {
        case 1:
            return "#425ABD";
        case 4:
            return "#397B18";
        case 2: case 3: case 5: case 6:
            return "#843131";
        default:
            return "#FFFFFF";
    }
}

function getJobSkills(jobID) {

    // Loads in all skills from url and puts them in either allJobSkills or allRoleSkills
    
    let JOB = jobList.find(x => x.ID === jobID).Abbreviation;
    let url = `https://xivapi.com/search?indexes=Action&filters=ClassJobCategory.${JOB}=1,IsPvP=0,ActionCategory.ID%3E=2,ActionCategory.ID%3C=4&columns=ID,Icon,Name,Url,ActionCombo.ID,Description,Cast100ms,Recast100ms,Range,EffectRange,PrimaryCostType,PrimaryCostValue,SecondaryCostType,SecondaryCostValue,CastType,ActionCategory,ClassJobCategoryTargetID,IsRoleAction,IsPlayerAction&Limit=250&page=`;

    fetch(url)
        .then((response) => response.json())
        .then(function (json) {
            jobSkills[jobID] = json.Results.filter(action => action.IsRoleAction === 0);
            roleSkills[jobID] = json.Results.filter(action => action.IsRoleAction === 1);
            clearDivs();
            sortJobSkills(jobID);
            currentJobId = jobID;
        })
        .catch(function (ex) {
            console.log('parsing failed', ex)
        })

    return 0
}

function sortJobSkills(jobID) {
    // Runs through jobSkills, roleSkills, and globalSkillsList
    // Calls addImageToList on relevant skills (not blacklisted + whitelisted + PlayerAction)
    
        jobSkills[jobID].forEach((skill) => {
            //document.getElementById("description").innerHTML = skill.Name;
            // If skill is in blacklist, skip it
            if (skillsBlacklist.includes(skill.ID)) { return; }
            
            // If it's a player action or it's in the whitelist
            if (skill.IsPlayerAction == "1" || skillsWhitelist.includes(skill.ID)) {

                // If it's a spell or weaponskill (assumed GCD)
                if (skill.ActionCategory.Name === "Spell" || skill.ActionCategory.Name === "Weaponskill") {

                    // If it's in the OGCD override => OGCD
                    if (ogcdOverrides.includes(skill.ID)) {
                        addImageToList("ogcd-list", skill, false, false);
                    }
    
                    // Else its a GCD
                    else {
                        addImageToList("gcd-list", skill, false, true);
                    }
                }
    
                // If it's an ability (assumed OGCD)
                else if (skill.ActionCategory.Name === "Ability") {
    
                    // If it in the GCD override => GCD
                    if (gcdOverrides.includes(skill.ID)) {
                        addImageToList("gcd-list", skill, false, true);
                    }
    
                    // Else its an OGCD
                    else {
                        addImageToList("ogcd-list", skill, false, false);
                    }
                }
            }
        });
    
        roleSkills[jobID].forEach((skill) => {
    
            // If ability => OGCD
            if (skill.ActionCategory.Name === "Ability") {
                addImageToList("role-list", skill, false, false);
            }
    
            // If spell or weaponskill => GCD
            else if (skill.ActionCategory.Name === "Spell" || skill.ActionCategory.Name === "Weaponskill") {
                addImageToList("role-list", skill, false, true);
            }
        });
    
        /*globalSkillsList.forEach((skill) => {
            // If it's Pull (Placeholder)
            if (skill.ID == 0) {
                addImageToList("other-list", skill, true, true);
            }
            // If it's GCD placeholder
            else if (skill.ID == 1) {
                addImageToList("other-list", skill, true, true);
            }
            // If it's OGCD placeholder
            else if (skill.ID == 2) {
                addImageToList("other-list", skill, true, false);
            }
            // If it's Sprint or Tincture: OGCD
            else if (skill.ID == 3 || skill.ID == 27786) {
                addImageToList("other-list", skill, true, false);
            }
        });*/
}

function showTooltip(skill) {
    return (event) => {
        document.getElementById("description-title").textContent = `${skill.Name}`;
        document.getElementById("description-img").src = (event.target.dataset.id <= 2) ? `${skill.Icon}` : `https://xivapi.com${skill.Icon}`;
        document.getElementById("description-text").innerHTML = skill.Description;
        // If the description is too long, reduce font size
        if (skill.Description.length > 1000){
            document.getElementById("description-text").style.fontSize = "13.5px";
            document.getElementById("description-recast").style.fontSize = "13.5px";
        } else {
            document.getElementById("description-text").style.fontSize = "16px";
            document.getElementById("description-recast").style.fontSize = "16px";
        }
        document.getElementById("description-recast").innerHTML = `Cast:\n${parseInt(skill.Cast100ms) / 10}s`;
        
        document.getElementById("description-title").innerHTML = skill.ID + " " + skill.Name;
    };
}
    
function addImageToList(dest, skill, isLocalImg, isGCD) {
    
    // Creates icon for the skill
    let image = document.createElement("img");
    image.src = isLocalImg ? `${skill.Icon}` : `https://xivapi.com${skill.Icon}`;
    image.className = "Skill-Icon";
    image.dataset.id = `${skill.ID}`;
    image.setAttribute("data-gcd", isGCD ? "GCD" : "OGCD");

    image.addEventListener("mouseover", showTooltip(skill));

    image.addEventListener("click", () => {
        addToRotationA(image, skill);
    });

    document.getElementById(dest).appendChild(image);

}

function clearDivs() {
    if (!MoxSetting) {
        clearRotation();
    }
    let el = document.getElementsByClassName("Skill-Icon");
    while (el.length > 0)
        el[0].parentNode.removeChild(el[0]);
}

function clearRotation() {
    let rotationSkills = document.getElementsByClassName("Skill-Rotation");
    //let rotationBuffs = document.getElementById("Rotation-Buffs");
    //let buffList = document.getElementById("RotationBuffList");

    // Delete Icons in rotation
    while (rotationSkills.length > 0)
        rotationSkills[0].parentNode.removeChild(rotationSkills[0]);
    // Delete Buffs in rotation
    //while (rotationBuffs.firstChild)
    //    rotationBuffs.removeChild(rotationBuffs.lastChild);
    // Delete Buffs in dropdown
    //while (buffList.firstChild) {
    //    buffList.removeChild(buffList.lastChild);
    //}
}

function addToRotationA(image, skill){
    
    // Clones the list icon to put on rotation-list
    let imageCopy = image.cloneNode();
    imageCopy.className = "rotation-icon";

    // When hovered over, show tooltip
    imageCopy.addEventListener("mouseover", showTooltip(skill));

    // When clicked, remove from the rotation-skills div
    imageCopy.addEventListener("click", (event) => {
        document.getElementById("rotation-skills").removeChild(event.target);
    });

    // Make PULL placeholder not look too small or too big
    if (imageCopy.dataset.id == "0") {
        imageCopy.style.height = "60px";
        imageCopy.style.width = "20px";
    }
    
    // Add a bottom padding if OGCD
    if (imageCopy.dataset.gcd == "OGCD") {
        imageCopy.className = "rotation-icon ogcd-offset";
    }
    
    // Add rotation icon to rotation-skills div
    document.getElementById("rotation-skills").appendChild(imageCopy);

    // Find the custom made skill that matches the skill


    // Calls function to add the skill to the rotation
    addToRotationB(skill);
    
}

// Responsible for the backend addition of a skill to the rotation
function addToRotationB(skill){
    
    let ad;

    // Get the object from allAbilities list that matches skill
    allAbilities.forEach((element) => {
        if (element.ID == skill.ID){
            ad = element;
        }
    })
    
    // From the object, get the data to use as parameters for initialization
    let params = [(ad.ID != null ? ad.ID : null)
            ,(ad.Name != null ? ad.Name : null)
            ,(ad.comboAction != null ? ad.comboAction : null)
            ,(ad.potency != null ? ad.potency : null)
            ,(ad.comboPotency != null ? ad.comboPotency : 0)
            ,(ad.mpCost != null ? ad.mpCost : 0)
            ,(ad.gauge != null ? ad.gauge : 0)
            ,(ad.gaugeCost != null ? ad.gaugeCost : 0)
            ,(ad.gcd != null ? ad.gcd : null)
            ,(ad.buff != null ? ad.buff : null)];

    // Create new actual Ability object
    var addition = new Ability(params);
    
    // Add to rotation[]
    rotation.push(addition);

    // Call calculate to do the math
    calculate();
}

// Calculates dps output based on current rotation array
function calculate(){

    // Variables
    var total_potency = 0;
    var last_gcd = null;
    var current_gauge = 0;

    // Run through every ability in the rotation
    rotation.forEach((ability) => {

        // Combo'd
        if ((last_gcd != null) && (ability.comboAction != null) && (last_gcd.Name == ability.comboAction)){
            total_potency += ability.comboPotency;
            current_gauge += ability.gauge;
        // Uncombo'd
        } else {
            // If has a gauge cost and has gauge to use it
            if (ability.gaugeCost != null && ability.gaugeCost <= current_gauge) {
                current_gauge -= ability.gaugeCost;
                total_potency += ability.potency
            // If no gauge cost
            } else {
                total_potency += ability.potency;
            }
        }
        // Set current gcd as last gcd
        if (ability.gcd) {
            last_gcd = ability;
        }

    })

    var print_content = "Potency: " + total_potency + "\nCurrent gauge: " + current_gauge;
    document.getElementById("data-text").textContent = print_content;
}

/*

Source:     370

*/