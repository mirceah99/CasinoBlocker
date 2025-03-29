fetch(chrome.runtime.getURL('bannedSites.json'))
		.then(response => response.json())
		.then(bannedSites => {
			if (bannedSites.some(site => window.location.hostname.includes(site))) {
				const doc = document.documentElement;
				const oldHead = document.head;
				const oldBody = document.body;

                oldHead && doc.removeChild(oldHead);
                oldBody && doc.removeChild(oldBody);

                const head = document.createElement('head');
				const body = document.createElement('div');
                body.id = 'custom-body'

                fetch(chrome.runtime.getURL('replace.html'))
						.then(response => response.text())
						.then(htmlContent => {
							body.insertAdjacentHTML('beforeend', htmlContent);

							doc.appendChild(head);
							doc.appendChild(body);
						})
						.catch(error => console.error('Error loading replace.html:', error));

                setInterval(removeAllScripts, 1000);
			}
		})
		.catch(error => console.error('Error loading bannedSites.json:', error));


function removeAllScripts() {
    const scripts = document.getElementsByTagName('script');
    Array.from(scripts).reverse().forEach(script => {
        script.parentNode.removeChild(script);
    });
}