
import { useState } from "react";
import { CalendarDays, BriefcaseBusiness, Info } from "lucide-react";
import { Announcement as announcementData } from "./AnnouncementData";

function Announcement() {
  const [isVisible, setIsVisible] = useState(true);


  const icons = {
    holiday: CalendarDays,
    job: BriefcaseBusiness,
    info: Info,
  };

  const AnnouncementIcon = icons[announcementData.type] || Info;


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(announcementData.startDate + "T00:00:00");
  const endDate = new Date(announcementData.endDate + "T23:59:59");

  const isWithinDateRange =
    today >= startDate && today <= endDate;

  if (!announcementData.active || !isWithinDateRange || !isVisible) {
    return null;
  }

  return (

    <aside
      className={`announcement announcement-${announcementData.type}`}
      role="status"
    >

      <div className="announcement-icon">
        <AnnouncementIcon size={24} strokeWidth={2} />
      </div>
      
      <div className="announcement-content">
        <strong>{announcementData.title}</strong>
        <p>{announcementData.message}</p>
      </div>

      <button
        className="announcement-close"
        onClick={() => setIsVisible(false)}
        aria-label="Zatvori obavijest"
        type="button"
      >
        ×
      </button>
    </aside>
  );
}

export default Announcement;
