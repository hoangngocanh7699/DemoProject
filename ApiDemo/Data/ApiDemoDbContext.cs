using Microsoft.EntityFrameworkCore;

namespace ApiDemo.Data
{
    public class ApiDemoDbContext : DbContext
    {
        public ApiDemoDbContext(DbContextOptions options) : base(options) { }

        #region DbSet
        public DbSet<Todo> Todos { get; set; }
        public DbSet<Category> Categories { get; set; }
        #endregion
        public DbSet<Element> Elements { get; set; }
        public DbSet<UserInput> Inputs { get; set; }
    }
}
