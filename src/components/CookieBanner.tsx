import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "cookie_notice_dismissed";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — show the notice anyway
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // silently ignore
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="note"
          aria-label="Cookie usage notice"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-t border-border/60 shadow-lg"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
              We use necessary cookies to keep this site running smoothly and securely. By continuing to browse, you acknowledge their use. If you prefer not to accept cookies, please discontinue use of this website.
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss cookie notice"
              className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
