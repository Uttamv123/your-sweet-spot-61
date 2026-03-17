import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CalendlyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CALENDLY_URL = "https://calendly.com/uttam-thecodereflections/30min"; // Replace with your actual Calendly URL

const CalendlyModal = ({ open, onOpenChange }: CalendlyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-display text-xl">Book a Free Consultation</DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full min-h-0 px-6 pb-6">
          <iframe
            src={CALENDLY_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a meeting"
            className="rounded-lg border border-border min-h-[500px]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyModal;
