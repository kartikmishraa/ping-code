using Microsoft.AspNetCore.SignalR;
using PingBackend.Models.Announcement;
using PingBackend.Services.AnnouncementService;

namespace PingBackend.Hubs
{
    public class AnnouncementHub : Hub
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementHub(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }
        public async Task MakeAnnouncement(Announcement announcement)
        {
            _announcementService.CreateAnnouncement(announcement);
            Clients.All.SendAsync("announcementMade", announcement);
        }
    }
}
