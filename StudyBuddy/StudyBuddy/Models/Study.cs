using System.ComponentModel.DataAnnotations;

namespace StudyBuddy.Models
{
  public class Study
  {
    [Key]
    public int Id { get; set; }
    public string Question { get; set; }
    public string Answer { get; set; }
    

  }
}
