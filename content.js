fetch(chrome.runtime.getURL('bannedSites.json'))
		.then(response => response.json())
		.then(bannedSites => {
			if (bannedSites.some(site => window.location.hostname.includes(site))) {
				const doc = document.documentElement;
				const oldHead = document.head;
				const oldBody = document.body;

				doc.removeChild(oldHead)
				doc.removeChild(oldBody);

				const head = document.createElement('head');
				const body = document.createElement('body');

				body.insertAdjacentHTML('beforeend', '<h1>Hello</h1>');

				doc.appendChild(head);
				doc.appendChild(body);
			}
		})
		.catch(error => console.error('Error loading bannedSites.json:', error));
