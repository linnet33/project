
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Pet Shop</title>
    <link rel="stylesheet" href="home.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <!-- navbar  Section -->
    <section id="header">
    <img src="images/logo.jpeg"class="logo">
        <div>
            <ul id="navbar">
                <li><a class="active" href="#homecont">Home</a></li>
                <li><a href="#about-section">About</a></li>
                <li><a href="#shophere">Shop</a></li>
                <li><a href="#contactus">Contact</a></li>
                <li><a href="cart.html"><i class="fa-solid fa-bag-shopping cart-icon"></i></a></li>
                <li><a href="logout.php"><button class="logout">log out</button></a></li>
            </ul>
        </div>
    </section>
    <!-- Content for the home page-->
    <div id="homecont">
        <div class="cont">
        <h4>Welcome to La pet!</h4>
        <h2>Great deals</h2>
        <h1>On all products</h1>
        <p>we have everything you need to keep your furry friend happy and healthy</p>
        <a href="#shophere"><button>Shop Now</button></a>
    </div>
    </div>
     <!-- Content for the features -->
    <div id="feature">
        <div class="fe-box">
         <img src="images/features/del.jpg" alt="">
         <h6>Fast Deliveries</h6>
        </div>
        <div class="fe-box">
            <img src="images/features/ord.jpg" alt="">
            <h6>Online Orders</h6>
           </div>
           <div class="fe-box">
            <img src="images/features/sav.jpg" alt="">
            <h6>Save Cash</h6>
           </div>
           <div class="fe-box">
            <img src="images/features/pro,.jpg" alt="">
            <h6>Promotions</h6>
           </div>
           <div class="fe-box">
            <img src="images/features/sales.jpg" alt="">
            <h6>Happy Sells</h6>
           </div>
           <div class="fe-box">
            <img src="images/features/ser.jpg" alt="">
            <h6>Customer Service</h6>
           </div>
    </div>
    <!-- About Section -->
    <section id="about-section">
        <h3>About Us</h3>
        <div id="about">
            <img src="images/hpme bg.webp" alt="Picture of a dog">
            <div class="aboutcont">
                <p>La Pet is dedicated to providing everything a pet needs to live a happy, healthy life.</p>
                <p>We offer a wide range of high-quality pet products, from nutritious food 
                    and fun toys to cozy bedding and essential accessories.</p>
                <p>La Pet also helps pet owners connect with trusted veterinarians 
                    and professional groomers. Simply fill out a service request form 
                    and La Pet will get in touch with you.</p>
                <button>Service Request</button>
            </div>
        </div>
    </section>
    <!-- Shop Section  which is  a grid -->
    <section id="shophere">
        <h3>Shop By Category</h3>
        <!-- Various categotries of the shop section with images -->
        <div id="shopcont">
            <div class="shop-box">
                <a href="dog.html">
                    <img src="images/shop/dog food.jpeg" alt="Dog Food">
                    <p>Dog Food</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="puppy.html">
                    <img src="images/shop/puppy-food.webp" alt="Puppy Food">
                    <p>Puppy Food</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="cat.html">
                    <img src="images/shop/cat-food.webp" alt="Cat Food">
                    <p>Cat Food</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="kitten-food.html">
                    <img src="images/shop/kitten-food.webp" alt="Kitten Food">
                    <p>Kitten Food</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="beds.html">
                    <img src="images/shop/bed.jpeg" alt="Beds">
                    <p>Beds</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="leashes.html">
                    <img src="images/shop/leashes.webp" alt="Leashes">
                    <p>Leashes</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="collars.html">
                    <img src="images/shop/collars.webp" alt="Collars">
                    <p>Collars</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="harnesses.html">
                    <img src="images/shop/harness.webp" alt="Harness">
                    <p>Harnesses</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="toys.html">
                    <img src="images/shop/toys.webp" alt="Toys">
                    <p>Toys</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="bowls.html">
                    <img src="images/shop/bowl.webp" alt="Bowls">
                    <p>Bowls</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="supplements.html">
                    <img src="images/shop/supplements.webp" alt="Supplements">
                    <p>Supplements</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="grooming.html">
                    <img src="images/shop/grooming-tools.webp" alt="Grooming">
                    <p>Grooming</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="shampoo.html">
                    <img src="images/shop/shampoo.webp" alt="Shampoo">
                    <p>Shampoo</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="treats.html">
                    <img src="images/shop/treats.webp" alt="Treats">
                    <p>Treats</p>
                </a>
            </div>
            <div class="shop-box">
                <a href="training.html">
                    <img src="images/shop/training.webp" alt="Training">
                    <p>Training</p>
                </a>
            </div>
        </div>
    </section>
    <!-- Contact Section -->
    <section id="contactus">
        <h3>Contact Us</h3>
        <div class="contact-us">
            <form action="submit_form.php" method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required>
    
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
    
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" placeholder="Write your message here" required></textarea>
    
                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>
    
    <!-- Footer Section -->
    <footer id="closing">
        <div class="close-data">
    
            <!-- Logo -->
            <div class="close-img">
                <img src="images/logo.jpeg" alt="La Pet Accessories Logo">
            </div>
    
            <!-- Map Section -->
            <div class="close-map">
                <h2>Our Shop Location</h2>
                <a href="map.html">Google Location</a>
            </div>
    
            <!-- Contact Details -->
            <div class="close-social">
                <h2>Get in Touch with Us</h2>
                <p>
                    <i class="fa-solid fa-phone"></i> Call: +254 729 521 528
                </p>
                <p>
                    <i class="fa-solid fa-envelope"></i>
                    Email: <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">
                        linnetgithinji42@gmail.com</a>
                </p>
                
                <!-- Social Media Links -->
                <p>
                    <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                </p>
            </div>
    
        </div>
    
        <!-- Copyright -->
        <div class="rights">
            <p>Copyright &copy; 2025 - La Pet Accessories. All Rights Reserved.</p>
        </div>
    </footer>
    <script src="home.js"></script>
    <script src="cart.js"></script>
</body>
</html>