import Layout from './Layout';
import '../styles/contact.css';

function Contact() {
    return (
        <Layout>
          <div className="contact-container">
            <h1>Contact Us</h1>
            <p>Email: contact@example.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Main St, Anytown, USA</p>
          </div>
        </Layout>
    );
}

export default Contact;