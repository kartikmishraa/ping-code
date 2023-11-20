using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using PingBackend.Models.User;
using PingBackend.Services.UserService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PingBackend.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public AuthService(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _config = configuration;
        }

        public string RegisterAsync(string email, string password)
        {
            var existingUser = _userService.GetUsers().FirstOrDefault(u => u.Email == email);
            if (existingUser != null)
            {
                return null;
            }

            string role;
            if (email == "admin@admin.com")
            {
                role = "Admin";
            } else
            {
                role = "User";
            }

            var newUser = new User 
            { 
                Email = email, Password = BCrypt.Net.BCrypt.HashPassword(password), Role = role 
            };

            _userService.CreateUser(newUser);

            // Return a JWT Token
            return GenerateJwtToken(newUser);
        }

        public string LoginAsync(string email, string password)
        {
            // Find user by email
            var user = _userService.GetUsers().FirstOrDefault(u => u.Email == email);

            // Verify password
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null;
            }

            // Return JWT Token
            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
