using MongoDB.Driver;
using PingBackend.Models.Announcement;
using PingBackend.Services.MongoDBService;

namespace PingBackend.Services.AnnouncementService
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IMongoDBService _dbService;

        public AnnouncementService(IMongoDBService dBService)
        {
            _dbService = dBService;
        }

        public Announcement CreateAnnouncement(Announcement announcement)
        {
            _dbService.Announcements.InsertOne(announcement);

            return announcement;
        }

        public List<Announcement> GetAnnouncements()
        {
            return _dbService.Announcements.Find(a => true).ToList();
        }
    }
}
