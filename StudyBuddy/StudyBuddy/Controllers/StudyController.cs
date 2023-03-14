using Microsoft.AspNetCore.Mvc;
using StudyBuddy.DAL;
using StudyBuddy.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyBuddy.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StudyController : ControllerBase
  {
    private ApplicationDbContext _db;
    public StudyController()
    {
      _db = new ApplicationDbContext();
    }
    [HttpGet]
    public IEnumerable<Study> Get()
    {
      return _db.GetStudies();
    }


    [HttpGet("GetById/{id}")]
    public Study Get(int id)
    {
      return _db.GetStudy(id);
    }


    [HttpPost("AddQuestion/{question}/{answer}")]
    public Study Post(string question, string answer)
    {
      return _db.AddStudy(question, answer);
    }

    [HttpPost("DeleteStudy/{studyId}")]
    public Study DeleteStudy(int studyId)
    {
      return _db.RemoveStudy(studyId);
    }

    [HttpPost("RemoveFavorite/{studyId}/{userId}")]
    public void Delete(int studyId, int userId)
    {
       _db.DeleteFromFavoriteById(userId, studyId);
    }
    [HttpGet("GetAllUserFavorites/{userId}")]
    public IEnumerable<Study> GetAllUserFavorites(int userId)
    {

      return _db.GetAllFavorites(userId);

    }
    
  }
}
