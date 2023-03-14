

using System.ComponentModel.DataAnnotations;

namespace StudyBuddy.Models
{
  public class Favorite
  {
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    
    public virtual User User { get; set; } 
    public int StudyId { get; set; }
    public virtual Study Study { get; set; } 
  }
}
