// Cart functionality
let cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const continueShopping = document.getElementById('continue-shopping');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');
const confirmationModal = document.getElementById('confirmation-modal');
const closeConfirmation = document.getElementById('close-confirmation');
const checkoutTotal = document.getElementById('checkout-total');
const cartCount = document.getElementById('cart-count');

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }
        
        updateCart();
        showToast(`${name} added to cart`);
    });
});

// Update cart UI
function updateCart() {
    // Update cart count
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
    
    // Update cart modal
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartItems.innerHTML = '';
        checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        emptyCartMessage.classList.add('hidden');
        
        let itemsHTML = '';
        let subtotalValue = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotalValue += itemTotal;
            
            itemsHTML += `
                <div class="cart-item flex justify-between items-center py-4 border-b border-gray-200">
                    <div>
                        <h5 class="font-medium">${item.name}</h5>
                        <p class="text-gray-500 text-sm">₦${item.price.toLocaleString()}</p>
                    </div>
                    <div class="flex items-center">
                        <button class="decrease-quantity quantity-btn text-gray-500 px-2 py-1 rounded" data-id="${item.id}">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="increase-quantity quantity-btn text-gray-500 px-2 py-1 rounded" data-id="${item.id}">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                        <button class="remove-item ml-4 text-red-500 hover:text-red-700" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = itemsHTML;
        checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        
        // Add event listeners to new buttons
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = button.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                
                updateCart();
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = button.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                item.quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = button.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }
    
    // Update totals
    const deliveryFee = 1000;
    subtotal.textContent = `₦${subtotalValue.toLocaleString()}`;
    total.textContent = `₦${(subtotalValue + deliveryFee).toLocaleString()}`;
    checkoutTotal.textContent = `₦${(subtotalValue + deliveryFee).toLocaleString()}`;
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center';
    toast.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Cart modal toggle
cartBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

continueShopping.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Checkout modal
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    cartModal.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
});

closeCheckout.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Form submission (simulated)
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real implementation, you would process the payment here
    // For this demo, we'll just show a confirmation
    
    checkoutModal.classList.add('hidden');
    confirmationModal.classList.remove('hidden');
    
    // Clear cart
    cart = [];
    updateCart();
});

closeConfirmation.addEventListener('click', () => {
    confirmationModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    if (e.target === checkoutModal) {
        checkoutModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    if (e.target === confirmationModal) {
        confirmationModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// hero section

// Additional animation effects
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to primary button
    const primaryBtn = document.querySelector('.pulse');
    
    primaryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 600ms linear';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        ripple.style.pointerEvents = 'none';
        
        // Position the ripple
        this.appendChild(ripple);
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
            // Navigate after animation (simulated)
            window.location.href = "#";
        }, 600);
    });
    
    // Add to cart animation for food icons
    const foodIcons = document.querySelectorAll('.fa-coffee, .fa-hamburger, .fa-bread-slice');
    foodIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.classList.add('animate-ping');
            setTimeout(() => {
                this.classList.remove('animate-ping');
            }, 500);
        });
    });
});


// <!-- JS: Mobile Toggle Script -->
// <!-- JS: Mobile Toggle Script -->
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    // Toggle no-scroll on body when menu opens/closes
    if (!mobileMenu.classList.contains('hidden')) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden'); // Close the mobile menu
        document.body.classList.remove('no-scroll'); // Re-enable scrolling

        // No preventDefault here to allow instant jump
    });
});

// TESTINONY
  const reviews = [
    {
      text: "The Suya Pasta was an absolute delight! Spicy, creamy, and full of flavor. I wasn’t expecting pasta to taste this good!",
      author: "Tolu Akande"
    },
    {
      text: "Best burger I’ve had in a long time! The BBQ Beef Burger was juicy and smoky — literally perfect.",
      author: "Chinedu Okwara"
    },
    {
      text: "I came for the Classic Hotdog and stayed for the Choplife Fries. Everything was fresh and well seasoned. 10/10!",
      author: "Anita George"
    },
    {
      text: "The Suya Wrap hit different! Bold flavors, soft wrap, and spicy goodness in every bite. Highly recommend.",
      author: "Daniel Effiong"
    },
    {
      text: "Tried the Double Cheeseburger and the Slider Box. I left FULL and happy. Great portion and great taste.",
      author: "Fatima Sule"
    },
    {
      text: "Their Vanilla Milkshake is heavenly. Creamy and thick — just the way I like it. Perfect combo with any meal.",
      author: "Kelvin Obasi"
    },
    {
      text: "BBQ Glazed Roasted Chicken was crispy on the outside and tender inside. My taste buds were dancing!",
      author: "Adaora Madu"
    }
  ];

  let index = 0;

  function updateReview() {
    document.getElementById("review-text").innerText = reviews[index].text;
    document.getElementById("review-author").innerText = reviews[index].author;
  }

  function prevReview() {
    index = (index - 1 + reviews.length) % reviews.length;
    updateReview();
  }

  function nextReview() {
    index = (index + 1) % reviews.length;
    updateReview();
  }

  // Auto-slide every 3 seconds
  setInterval(nextReview, 3000);

  // Initial load
  updateReview();