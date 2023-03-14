using Microsoft.AspNetCore.Mvc;
using StudyBuddy.DAL;
using StudyBuddy.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyBuddy.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private ApplicationDbContext _db;
    public UserController()
    {
      _db = new ApplicationDbContext();
    }
    [HttpGet]
    public List<User> Get()
    {
      return _db.GetUsers();
    }


    [HttpGet("Login/{userName}/{password}")]
    public User Get(string userName, string password)
    {
      User user = _db.GetUser(userName);
      if(user == null || user.Password != password)
      {
        return null;
      }
      return user;
    }


    [HttpPost("CreateLogin/{userName}/{password}")]
    public User Post(string userName,string password)
    {
      return _db.AddUser(userName, password);
    }



    [HttpPost("AddFavorite/{studyId}/{userId}")]

    public Study PutFavorite(int studyId, int userId)
    {
      return _db.FavoriteStudy(studyId, userId);

    }
    [HttpPost("DeleteFavorite/{studyId}/{userId}")]
    public bool DeleteFavorite(int userId, int studyId)
    {
      return _db.DeleteFromFavoriteById(userId, studyId);
    }


    [HttpPost("DeleteUser/{userId}")]
    public bool DeleteUser(int userId)
    {
      return _db.DeleteUser(userId);
    }

  }
}
