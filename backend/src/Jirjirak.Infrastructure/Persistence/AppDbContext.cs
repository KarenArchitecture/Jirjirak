using Microsoft.EntityFrameworkCore;

namespace Jirjirak.Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // DbSets and entity configurations will be added with the first domain feature.
}
