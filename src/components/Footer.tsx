const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="font-display text-lg font-bold gradient-text">
            Boldify
          </a>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Boldify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
