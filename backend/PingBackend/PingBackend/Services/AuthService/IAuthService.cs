using PingBackend.Models.User;

namespace PingBackend.Services.AuthService
{
    public interface IAuthService
    {
        string RegisterAsync(string email, string password);
        string LoginAsync(string email, string password);


    }
}
