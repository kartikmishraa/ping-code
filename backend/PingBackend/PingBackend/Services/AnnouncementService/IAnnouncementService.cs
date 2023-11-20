using PingBackend.Models.Announcement;

namespace PingBackend.Services.AnnouncementService
{
    public interface IAnnouncementService
    {
        List<Announcement> GetAnnouncements();

        Announcement CreateAnnouncement(Announcement announcement);
    }
}
