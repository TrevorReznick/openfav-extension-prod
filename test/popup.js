// popup.js
const environments = {
  "name": "Environment Selector",
  "environments": [
    {
      "name": "Production",
      "icon": "Briefcase",
      "resourceTypes": [
          {
              "resource_id": 1,
              "name": "infrastructure",
              "description": "Risorse infrastrutturali"
            },
            {
              "resource_id": 2,
              "name": "framework",
              "description": "Framework e librerie"
            },
            {
              "resource_id": 3,
              "name": "platform",
              "description": "Piattaforme"
            },
            {
              "resource_id": 4,
              "name": "database",
              "description": "Database"
            },
            {
              "resource_id": 5,
              "name": "hosting",
              "description": "Servizi Hosting"
            },
            {
              "resource_id": 6,
              "name": "platform",
              "description": "Applicazione"
            }
      ],
      "functionsTypes": [
          {
              "function_id": 1,
              "name": "service",
              "description": "Servizi web"
          },
          {
              "function_id": 2,
              "name": "tool",
              "description": "Strumenti"
          },
          {
              "function_id": 3,
              "name": "api",
              "description": "Interfacce di programmazione"
          },
          {
              "function_id": 4,
              "name": "provider",
              "description": "Fornitori di servizi"
          }
      ]
    },
    {
      "name": "Development",
      "icon": "Code2",
      "resourceTypes": [
          {
              "resource_id": 1,
              "name": "infrastructure",
              "description": "Risorse infrastrutturali"
            },
            {
              "resource_id": 2,
              "name": "framework",
              "description": "Framework e librerie"
            },
            {
              "resource_id": 3,
              "name": "platform",
              "description": "Piattaforme"
            },
            {
              "resource_id": 4,
              "name": "database",
              "description": "Database"
            },
            {
              "resource_id": 5,
              "name": "hosting",
              "description": "Servizi Hosting"
            },
            {
              "resource_id": 6,
              "name": "platform",
              "description": "Applicazione"
            }
      ],
      "functionsTypes": [
          {
              "function_id": 1,
              "name": "service",
              "description": "Servizi web"
          },
          {
              "function_id": 2,
              "name": "tool",
              "description": "Strumenti"
          },
          {
              "function_id": 3,
              "name": "api",
              "description": "Interfacce di programmazione"
          },
          {
              "function_id": 4,
              "name": "provider",
              "description": "Fornitori di servizi"
          }
      ]
    },
    {
      "name": "Personal",
      "icon": "User",
      "resourceTypes": [
          {
              "resource_id": 7,
              "name": "favorite",
              "label": "Favoriti"
          },
          {
              "resource_id": 8,
              "name": "todo",
              "label": "Todo"
          },
          {
              "resource_id": 9,
              "name": "readlater",
              "label": "Read Later"
          },
          {
              "resource_id": 10,
              "name": "generic",
              "label": "Generic"
          }
      ]
    },
    {
      "name": "Portfolio",
      "icon": "FolderKanban",
      "resourceTypes": []
    }
  ]
};

document.addEventListener('DOMContentLoaded', function() {
  const environmentSelect = document.getElementById('environmentSelect');
  const resourceTypeSelect = document.getElementById('resourceTypeSelect');
  const saveButton = document.getElementById('saveButton');

  // Popola il selettore degli ambienti
  environments.environments.forEach(env => {
    const option = document.createElement('option');
    option.value = env.name;
    option.textContent = env.name;
    environmentSelect.appendChild(option);
  });

  // Aggiorna i tipi di risorsa quando cambia l'ambiente
  environmentSelect.addEventListener('change', function() {
    const selectedEnv = environments.environments.find(env => env.name === this.value);
    resourceTypeSelect.innerHTML = '';
    
    if (selectedEnv.resourceTypes) {
      selectedEnv.resourceTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.description || type.label || type.name;
        resourceTypeSelect.appendChild(option);
      });
    }
  });

  // Trigger del primo caricamento dei tipi di risorsa
  environmentSelect.dispatchEvent(new Event('change'));

  // Gestione del salvataggio
  saveButton.addEventListener('click', async function() {
    const environment = environmentSelect.value;
    const resourceType = resourceTypeSelect.value;

    // Ottieni la tab corrente
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const resource = {
      url: tab.url,
      title: tab.title,
      environment: environment,
      resourceType: resourceType,
      timestamp: new Date().toISOString()
    };

    // Salva nei dati di storage di Chrome
    chrome.storage.sync.get('savedResources', function(data) {
      const savedResources = data.savedResources || [];
      savedResources.push(resource);
      chrome.storage.sync.set({ savedResources: savedResources }, function() {
        alert('Risorsa salvata con successo!');
        window.close();
      });
    });
  });
});