let currentTab ='all';
const tabActive = ["btn-primary"];
const tabInActive = ["btn-Soft"];


function switchTab(tab) {
    const tabs = ['all', 'open', 'closed'];
    for(const t of tabs) {
        const tabName = document.getElementById('tab-' + t);
        if( t === tab){
            tabName.classList.remove('btn-soft');
            tabName.classList.add('btn-primary');
        }else{
             tabName.classList.add('btn-soft');
            tabName.classList.remove('btn-primary');
        }
    }
}


const loadIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => displayIssues(data.data))
};

const displayIssues = (issues) => {
const issuesCardContainer = document.getElementById('issues-card-container');

    issuesCardContainer.innerHTML = '';

    issues.forEach(issue =>{
        const card = document.createElement('div');

        card.className = "bg-white p-4 rounded shadow cursor-pointer";

        if(issue.status === "open"){
        card.style.borderTop = "5px solid green";
        }
        else{
        card.style.borderTop = "5px solid purple";
}

        card.innerHTML = `

         <div class=" space-y-5">
                <div class="flex justify-between">
                    <img class="w-8 h-8" src="./assets/Open-Status.png" alt="">
                    <p class="btn btn-soft btn-error rounded-full">HIGH</p>
                </div>
                <div class="space-y-3">
                    <h1 class="font-bold text-[#1f2937]">${issue.title}</h1>
                    <p class="text-[#64748b] text-[12px]">${issue.description}</p>

                </div>
                <div class="flex gap-2">
                    <p class="btn btn-soft btn-error rounded-full">BUG</p>
                    <p class="btn btn-soft btn-warning rounded-full shadow-sm border-0">HELP WANTED</p>
                </div>
                <div class=" border border-[#e4e4e7] p-4 space-y-1">
                    <p class="text-[#64748b] text-[12px]">#1 by john_doe</p>
                    <p class="text-[#64748b] text-[12px]">1/15/2024</p>
                </div>
            </div>

        `;
        issuesCardContainer.append(card);
    });
}

loadIssues();
switchTab(currentTab);