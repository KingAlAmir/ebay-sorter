document.getElementById('sort-low-high').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        // Sort by Low to High function
        function extractPrice(item) {
          const priceElement = item.querySelector('.s-item__price');
          if (priceElement) {
            const priceText = priceElement.innerText.replace(/[^\d.]/g, '');
            return parseFloat(priceText);
          }
          return null;
        }
        
        function sortItems(byLowest) {
          const items = Array.from(document.querySelectorAll('.s-item'));
          const sortedItems = items
            .map(item => ({ item, price: extractPrice(item) }))
            .filter(entry => entry.price != null)
            .sort((a, b) => byLowest ? a.price - b.price : b.price - a.price);
          
          const parent = document.querySelector('.srp-results');
          parent.innerHTML = '';
          sortedItems.forEach(entry => parent.appendChild(entry.item));
        }

        sortItems(true); // Call sort by low to high
      }
    });
  });
});

document.getElementById('sort-high-low').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        // Sort by High to Low function
        function extractPrice(item) {
          const priceElement = item.querySelector('.s-item__price');
          if (priceElement) {
            const priceText = priceElement.innerText.replace(/[^\d.]/g, '');
            return parseFloat(priceText);
          }
          return null;
        }
        
        function sortItems(byLowest) {
          const items = Array.from(document.querySelectorAll('.s-item'));
          const sortedItems = items
            .map(item => ({ item, price: extractPrice(item) }))
            .filter(entry => entry.price != null)
            .sort((a, b) => byLowest ? a.price - b.price : b.price - a.price);
          
          const parent = document.querySelector('.srp-results');
          parent.innerHTML = '';
          sortedItems.forEach(entry => parent.appendChild(entry.item));
        }

        sortItems(false); // Call sort by high to low
      }
    });
  });
});
