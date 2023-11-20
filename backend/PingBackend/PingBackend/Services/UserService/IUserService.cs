using PingBackend.Models.User;

namespace PingBackend.Services.UserService
{
    public interface IUserService
    {
        List<User> GetUsers();
        User GetUser(string id);
        User CreateUser(User user); 
        void UpdateUser(string id, User user);
        void DeleteUser(string id);
    }
}
