// Function to extract the price (ignores shipping)
function extractPrice(item) {
  const priceElement = item.querySelector('.s-item__price');
  if (priceElement) {
    // Remove any non-numeric characters (like commas, dollar signs)
    const priceText = priceElement.innerText.replace(/[^\d.]/g, ''); 
    return parseFloat(priceText); // Convert string to float
  }
  return null; // Return null if no price found
}

// Function to sort the items based on price
function sortItems(byLowest) {
  const items = Array.from(document.querySelectorAll('.s-item')); // Get all items
  const sortedItems = items
    .map(item => ({ item, price: extractPrice(item) })) // Map to an array of objects with item and price
    .filter(entry => entry.price != null) // Remove entries with no valid price
    .sort((a, b) => byLowest ? a.price - b.price : b.price - a.price); // Sort by price

  const parent = document.querySelector('.srp-results'); // Parent container of items
  parent.innerHTML = ''; // Clear existing items
  sortedItems.forEach(entry => parent.appendChild(entry.item)); // Append sorted items
}

// Inject sorting buttons to the page
const buttonContainer = document.createElement('div');
buttonContainer.style.position = 'fixed';
buttonContainer.style.top = '10px';
buttonContainer.style.right = '10px';
buttonContainer.style.zIndex = '9999';
buttonContainer.style.backgroundColor = 'white';
buttonContainer.style.padding = '10px';
buttonContainer.style.border = '1px solid #ccc';
buttonContainer.innerHTML = `
  <button id="sort-low-high">Sort by Price: Low to High</button>
  <button id="sort-high-low">Sort by Price: High to Low</button>
`;

// Inject buttons into the page
document.body.appendChild(buttonContainer);

// Attach event listeners to the buttons
document.getElementById('sort-low-high').addEventListener('click', () => sortItems(true));
document.getElementById('sort-high-low').addEventListener('click', () => sortItems(false));
