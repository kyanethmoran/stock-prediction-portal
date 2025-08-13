const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-auto">
      <div className="container">
        <div className="row">
          {/* About / Logo */}
          <div className="col-md-4 mb-3">
            <h5 className="text-info">Stock+</h5>
            <p className="text-muted">
              Your gateway to smarter investing. Analyze trends, track stocks,
              and stay ahead of the market.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-3">
            <h6 className="text-info">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h6 className="text-info">Contact Us</h6>
            <p className="mb-1">Email: support@stockplus.com</p>
            <p className="mb-1">Phone: (123) 456-7890</p>
            <p>© {new Date().getFullYear()} Stock+. All rights reserved.</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center text-muted small">
          Built with ❤️ using <strong>React</strong>,
          <strong> Bootstrap 5</strong>, <strong>Django</strong>, and
          <strong> TensorFlow</strong>.
        </p>
        {/* Disclaimer */}
        <p className="text-center text-warning small mt-2 px-3">
          <strong>Disclaimer:</strong> This website is a portfolio project
          created for demonstration purposes only. It is not a real product and
          should <u>not</u> be used to make actual trading or investment
          decisions. No data, predictions, or insights provided here are
          financial advice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
