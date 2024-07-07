import '../styles/footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>Email: chemuB@hotmail.com</li>
            <li>Phone: +254703251256</li>
            <li>Address: Tom Mboya Rd, ALX Hub, Nairobi</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/privacy-policy.html">Privacy Policy</a></li>
            <li><a href="/terms-of-service.html">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Stay Connected</h4>
          <p>Sign up for our newsletter to get the latest updates.</p>
          <form action="#" method="POST">
            <input type="email" name="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 My Recipe App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

