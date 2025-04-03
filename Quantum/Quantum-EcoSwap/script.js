// Sample data for items
const sampleItems = [
    {
        id: 1,
        title: "Winter Jacket",
        description: "Warm winter jacket, barely used, size L. Perfect for cold weather.",
        category: "clothing",
        condition: "good",
        image: "jacket.jpg",
        location: "downtown",
        user: "user123",
        userName: "John Doe",
        type: "donation",
        createdAt: "2025-03-15T12:00:00Z"
    },
    {
        id: 2,
        title: "Harry Potter Book Set",
        description: "Complete set of 7 Harry Potter books, good condition with minimal wear.",
        category: "books",
        condition: "excellent",
        image: "books.jpg",
        location: "north",
        user: "bookworm",
        userName: "Emma Smith",
        type: "exchange",
        createdAt: "2025-03-20T10:30:00Z"
    },
    {
        id: 3,
        title: "Bluetooth Speaker",
        description: "JBL Bluetooth speaker, works perfectly. Great sound quality.",
        category: "electronics",
        condition: "like-new",
        image: "speaker.jpg",
        location: "east",
        user: "techguy",
        userName: "Mike Johnson",
        type: "donation",
        createdAt: "2025-03-25T15:45:00Z"
    },
    {
        id: 4,
        title: "furniture",
        description: "Wooden coffee table, some scratches but sturdy and functional.",
        category: "furniture",
        condition: "fair",
        image: "table.jpg",
        location: "south",
        user: "homestyle",
        userName: "Sarah Wilson",
        type: "exchange",
        createdAt: "2025-03-18T09:15:00Z"
    },
    {
        id: 5,
        title: "Stand Mixer",
        description: "Kitchen stand mixer, works great. Moving and can't take it with me.",
        category: "kitchen",
        condition: "good",
        image: "kitchen.jpg",
        location: "west",
        user: "baker101",
        userName: "Alex Baker",
        type: "donation",
        createdAt: "2025-03-22T14:00:00Z"
    },
    {
        id: 6,
        title: "Board Games Collection",
        description: "Set of 5 board games including Monopoly, Catan, and Risk.",
        category: "toys",
        condition: "good",
        image: "game.jpg",
        location: "downtown",
        user: "gamer",
        userName: "Chris Taylor",
        type: "exchange",
        createdAt: "2025-03-19T11:20:00Z"
    }
];

// DOM Elements
const itemsContainer = document.getElementById('items-container');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const typeFilter = document.getElementById('type-filter');
const locationFilter = document.getElementById('location-filter');
const searchBtn = document.getElementById('search-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const donateBtn = document.getElementById('donate-btn');
const browseBtn = document.getElementById('browse-btn');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');


// Modals
const itemModal = document.getElementById('item-modal');
const addItemModal = document.getElementById('add-item-modal');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const modalItemDetails = document.getElementById('modal-item-details');

// Modal toggle functions
const openModal = (modal) => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

const closeModal = (modal) => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

// Close modals when clicking close button
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            closeModal(modal);
        });
    });
});

// Close modals when clicking outside the modal content
window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Modal toggle event listeners
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));
donateBtn.addEventListener('click', () => openModal(addItemModal));
browseBtn.addEventListener('click', () => {
    window.scrollTo({
        top: document.querySelector('.items-section').offsetTop - 100,
        behavior: 'smooth'
    });
});

// Switch between login and signup modals
document.getElementById('switch-to-signup').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
});

document.getElementById('switch-to-login').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
});

// Create item card function
const createItemCard = (item) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = item.id;
    
    const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="item-image">
            <img src="${item.image}" alt="${item.title}">
            <span class="item-type ${item.type}">${item.type === 'donation' ? 'Donation' : 'Exchange'}</span>
        </div>
        <div class="item-info">
            <h3>${item.title}</h3>
            <div class="item-tags">
                <span class="item-tag">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                <span class="item-tag">${item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}</span>
            </div>
            <p class="item-description">${item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description}</p>
            <div class="item-details">
                <span>${item.location.charAt(0).toUpperCase() + item.location.slice(1)}</span>
                <span>${formattedDate}</span>
            </div>
        </div>
    `;
    
    // Add click event listener to show item details
    card.addEventListener('click', () => {
        showItemDetails(item);
    });
    
    return card;
};

// Function to display item details in modal
const showItemDetails = (item) => {
    const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    modalItemDetails.innerHTML = `
        <div class="item-detail-container">
            <div class="item-detail-header">
                <div class="item-detail-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="item-detail-info">
                    <h3>${item.title}</h3>
                    <div class="item-tags">
                        <span class="item-tag">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                        <span class="item-tag">${item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}</span>
                        <span class="item-tag ${item.type}">${item.type === 'donation' ? 'Donation' : 'Exchange'}</span>
                    </div>
                    <div class="item-detail-meta">
                        <p><strong>Location:</strong> ${item.location.charAt(0).toUpperCase() + item.location.slice(1)}</p>
                        <p><strong>Posted:</strong> ${formattedDate}</p>
                        <p><strong>Posted by:</strong> ${item.userName}</p>
                    </div>
                </div>
            </div>
            <div class="item-description">
                <h4>Description</h4>
                <p>${item.description}</p>
            </div>
            <button class="btn btn-primary contact-btn">Contact ${item.userName}</button>
        </div>
    `;
    
    openModal(itemModal);
};

// Function to render items
const renderItems = (items = sampleItems) => {
    // Clear existing items
    itemsContainer.innerHTML = '';
    
    // Check if there are any items to display
    if (items.length === 0) {
        // Show "No items available" message
        const noItemsMessage = document.createElement('div');
        noItemsMessage.className = 'no-items-message';
        noItemsMessage.textContent = 'No items available';
        itemsContainer.appendChild(noItemsMessage);
        
        // Hide the "Load More" button
        loadMoreBtn.style.display = 'none';
    } else {
        // Add items to container
        items.forEach(item => {
            const card = createItemCard(item);
            itemsContainer.appendChild(card);
        });
        
        // Show the "Load More" button
        loadMoreBtn.style.display = 'block';
    }
};

// Filter items based on search criteria
const filterItems = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const type = typeFilter.value;
    const location = locationFilter.value;
    
    const filteredItems = sampleItems.filter(item => {
        // Check search term
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                             item.description.toLowerCase().includes(searchTerm);
        
        // Check category
        const matchesCategory = category === 'all' || item.category === category;
        
        // Check type
        const matchesType = type === 'all' || item.type === type;
        
        // Check location
        const matchesLocation = location === 'all' || item.location === location;
        
        return matchesSearch && matchesCategory && matchesType && matchesLocation;
    });
    
    // Clear existing items
    itemsContainer.innerHTML = '';
    
    // Check if there are any items to display
    if (filteredItems.length === 0) {
        // Show "No items available" message
        const noItemsMessage = document.createElement('div');
        noItemsMessage.className = 'no-items-message';
        noItemsMessage.textContent = 'No items available matching your search.';
        itemsContainer.appendChild(noItemsMessage);
        
        // Hide the "Load More" button
        loadMoreBtn.style.display = 'none';
    } else {
        // Add items to container
        filteredItems.forEach(item => {
            const card = createItemCard(item);
            itemsContainer.appendChild(card);
        });
        
        // Show the "Load More" button
        loadMoreBtn.style.display = 'block';
    }
};

// Search button click event
searchBtn.addEventListener('click', filterItems);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderItems();
  // Add this to your script.js file
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');

// Toggle mobile menu visibility
hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Get references to mobile menu links
const mobileLoginLink = document.querySelector('.mobile-menu a:first-child');
const mobileSignupLink = document.querySelector('.mobile-menu a:last-child');

// Add event listeners to mobile menu links
mobileLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.remove('active'); // Hide the mobile menu
    openModal(loginModal); // Open the login modal
});

mobileSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.remove('active'); // Hide the mobile menu
    openModal(signupModal); // Open the signup modal
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});
    // Add form submission handlers
    document.getElementById('add-item-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, we would handle the form submission here
        closeModal(addItemModal);
        alert('Item submitted successfully!');
    });
    
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, we would handle authentication here
        closeModal(loginModal);
        alert('Logged in successfully!');
    });
    
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, we would handle user registration here
        closeModal(signupModal);
        alert('Account created successfully!');
    });
    
    // Load more button click event (in a real app, this would load more items from server)
    loadMoreBtn.addEventListener('click', () => {
        alert('In a real app, this would load more items!');
    });
    
});