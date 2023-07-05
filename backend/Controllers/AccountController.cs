using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly MyDbContext _context;

    public AccountController(UserManager<User> userManager, TokenService tokenService, MyDbContext context)
    {
        _context = context;
        _userManager = userManager;
        _tokenService = tokenService;
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.UserName);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized();

        return new UserDto 
        {  
            UserName = user.UserName,
            Id = user.Id,
            Email = user.Email,
            Token = await _tokenService.GenerateToken(user),
            Balance = user.Balance,
        };
    }
    
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        if (registerDto.Password != registerDto.ConfirmPassword)
        {
            ModelState.AddModelError("ConfirmPassword", "Password and confirmation password do not match.");
            return ValidationProblem();
        }

        var user = new User
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email,
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }
 
        await _userManager.AddToRoleAsync(user, "Member");

        return StatusCode(201);
    }
    
    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        if(user==null){
            return Unauthorized();
        }

        return new UserDto 
        { 
            UserName = user.UserName,
            Id = user.Id,
            Email = user.Email,
            Token = await _tokenService.GenerateToken(user),
            Balance = user.Balance,
        };
    }
  
    [HttpGet("getUserById/{id}")]
    public async Task<ActionResult<UserDto>> GetUserById(string id)
    {
        var user = await _userManager.Users
            .Where(user=>user.Id == id)
            .Select(user=> new UserDto {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Balance = user.Balance,
            })
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpGet("getAllUsers")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
    {
        var users = await _userManager.Users.ToListAsync();
        var usersDto = new List<UserDto>();

        foreach(var user in users)
        {
            usersDto.Add(new UserDto{
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Balance = user.Balance
            });
        }
        if(!usersDto.Any()){
        return NotFound();
        }

        return Ok(usersDto);
    }

    }
}