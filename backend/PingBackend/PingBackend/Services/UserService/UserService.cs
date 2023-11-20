using MongoDB.Driver;
using PingBackend.Models.User;
using PingBackend.Services.MongoDBService;

namespace PingBackend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IMongoDBService _dbService;

        public UserService(IMongoDBService dbService)
        {
            _dbService = dbService;
        }
        public User CreateUser(User user)
        {
            user.IsProfileSetup = false;
            user.LastLogin = DateTime.MinValue;

            _dbService.Users.InsertOne(user);

            return user;
        }

        public void DeleteUser(string id)
        {
            var user = _dbService.Users.Find(user => user.Id == id).FirstOrDefault();

            if (user != null)
            {
                _dbService.Users.DeleteOne(u => u.Id == id);
            }
        }

        public User GetUser(string id)
        {
            return _dbService.Users.Find(u => u.Id == id).FirstOrDefault();
        }

        public List<User> GetUsers()
        {
            return _dbService.Users.Find(u => true).ToList();
        }

        public void UpdateUser(string id, User user)
        {
            var existingUser = _dbService.Users.Find(u => u.Id == id).FirstOrDefault();
            existingUser.Name = user.Name;
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.Designation = user.Designation;
            existingUser.DepartmentName = user.DepartmentName;
            existingUser.IsProfileSetup = true;
            
            if (existingUser != null)
            {
                _dbService.Users.ReplaceOne(u => u.Id == id, existingUser);
            }
        }
    }
}
