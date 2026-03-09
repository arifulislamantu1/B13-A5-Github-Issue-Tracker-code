const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
let currentTab = 'all';


function switchTab(tab) {
  const tabs = ['all', 'open', 'closed'];
  tabs.forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (t === tab) {
      el.classList.remove('btn-soft');
      el.classList.add('btn-primary');
    } else {
      el.classList.add('btn-soft');
      el.classList.remove('btn-primary');
    }
  });
  currentTab = tab;
  fetchAndFilterIssues();
}


async function fetchAndFilterIssues() {
  try {
    const searchText = document.getElementById("searchInput").value.trim();
    let url = "";

    if (searchText) {
      
      url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchText)}`;
    } else {
      url = API;
    }

    const res = await fetch(url);
    const result = await res.json();

    let filtered = result.data;
    if (currentTab !== 'all') {
      filtered = filtered.filter(issue => issue.status === currentTab);
    }

    displayIssues(filtered);

  } catch (err) {
    console.error("Error fetching issues:", err);
  }
}


function displayIssues(issues) {
  const container = document.getElementById('issues-card-container');
  container.innerHTML = '';

  issues.forEach(issue => {
    const card = document.createElement('div');
    card.className = "bg-[#fbfbfb] p-4 space-y-5 rounded-md shadow-lg cursor-pointer";
    card.style.borderTop = issue.status === 'open' ? '5px solid green' : '5px solid purple';

  
    const labelsHtml = issue.labels.map(label =>
      `<p class="btn btn-soft btn-sm rounded-full">${label}</p>`
    ).join(' ');

    
    const priorityColor = issue.priority.toLowerCase() === 'high' ? 'btn-error' :
                          issue.priority.toLowerCase() === 'medium' ? 'btn-warning' : 'btn-info';

    card.innerHTML = `
      <div class="flex justify-between">
        <img class="w-8 h-8" src="./assets/Open-Status.png" alt="">
        <p class="btn btn-soft ${priorityColor} rounded-full">${issue.priority.toUpperCase()}</p>
      </div>

      <div class="space-y-3">
        <h1 class="font-bold text-[#1f2937]">${issue.title}</h1>
        <p class="text-[#64748b] text-[12px]">${issue.description}</p>
      </div>

      <div class="flex gap-2 flex-wrap">${labelsHtml}</div>

      <div class="border border-[#e4e4e7] p-4 space-y-1 text-[#64748b] text-[12px]">
        <p>#${issue.id} by ${issue.author}</p>
        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
      </div>
    `;

    
    card.addEventListener('click', () => openIssueModal(issue.id));

    container.appendChild(card);
  });
}


async function openIssueModal(id) {
  try {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const result = await res.json();
    const issue = result.data;

    alert(`Issue #${issue.id}\nTitle: ${issue.title}\nDescription: ${issue.description}\nStatus: ${issue.status}\nPriority: ${issue.priority}\nAuthor: ${issue.author}\nCreated: ${new Date(issue.createdAt).toLocaleString()}`);
  } catch (err) {
    console.error("Error fetching single issue:", err);
  }
}


document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchAndFilterIssues();
  }
});


fetchAndFilterIssues();