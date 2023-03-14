using System.ComponentModel.DataAnnotations;

namespace StudyBuddy.Models
{
  public class User
  {
    [Key]
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    
  }
}
